import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Helper para extrair apenas o texto novo da resposta, removendo histórico acoplado de e-mail
function extractReplyText(text: string): string {
    if (!text) return '';
    const splitters = [
        /\r?\nOn\s.*wrote:/i,
        /\r?\nEm\s.*escreveu:/i,
        /\r?\nDe:\s/i,
        /\r?\nFrom:\s/i,
        /\r?\n---\s*Original Message\s*---/i,
        /\r?\n_+\r?\n/ // Linha horizontal do Outlook/Gmail
    ];
    
    let cleanText = text;
    for (const splitter of splitters) {
        const parts = cleanText.split(splitter);
        if (parts.length > 0) {
            cleanText = parts[0];
        }
    }
    return cleanText.trim();
}

export async function POST(req: NextRequest) {
    try {
        // 1. Validar Token de Segurança (Webhook Secret) via query string
        const { searchParams } = new URL(req.url);
        const secret = searchParams.get('secret');
        const expectedSecret = process.env.RESEND_WEBHOOK_SECRET;

        if (!expectedSecret || secret !== expectedSecret) {
            console.warn('Tentativa de acesso ao Webhook Inbound sem token válido');
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        const body = await req.json();
        console.log('WEBHOOK BODY BRUTO:', JSON.stringify(body));

        // Garantir que é um evento de recebimento de e-mail
        if (body.type !== 'email.received') {
            return NextResponse.json({ success: true, message: 'Evento ignorado' });
        }

        const emailData = body.data;
        const emailId = emailData.email_id;

        if (!emailId) {
            console.warn('Webhook Inbound: email_id ausente no payload do webhook');
            return NextResponse.json({ success: true, message: 'Ignorado por falta de ID de e-mail' });
        }

        // 2. Buscar dados completos do e-mail no Resend (incluindo o corpo de texto/HTML)
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data: emailContent, error: fetchEmailError } = await resend.emails.receiving.get(emailId);

        if (fetchEmailError || !emailContent) {
            console.error('Erro ao obter detalhes do e-mail do Resend:', fetchEmailError);
            return NextResponse.json({ error: 'Erro ao buscar e-mail no Resend' }, { status: 500 });
        }

        // 3. Fazer o parsing do remetente (from)
        let fromEmail = '';
        let fromName = 'Usuário';

        const rawFrom = emailContent.from;
        if (typeof rawFrom === 'string') {
            const emailMatch = rawFrom.match(/<([^>]+)>/);
            if (emailMatch) {
                fromEmail = emailMatch[1].toLowerCase().trim();
                fromName = rawFrom.split('<')[0].trim() || 'Usuário';
            } else {
                fromEmail = rawFrom.toLowerCase().trim();
                fromName = rawFrom.split('@')[0].trim() || 'Usuário';
            }
        } else if (rawFrom && typeof rawFrom === 'object') {
            // Compatibilidade com possíveis objetos de dados
            const rawFromObj = rawFrom as any;
            fromEmail = (rawFromObj.email || '').toLowerCase().trim();
            fromName = rawFromObj.name || 'Usuário';
        }

        const subject = emailContent.subject || '';
        let rawText = emailContent.text || '';

        // Se o cliente de e-mail enviou apenas em HTML (sem texto plano), extraímos o texto do HTML
        if (!rawText && emailContent.html) {
            rawText = emailContent.html
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<\/p>/gi, '\n')
                .replace(/<[^>]*>/g, '')
                .replace(/&nbsp;/gi, ' ')
                .trim();
        }

        console.log('WEBHOOK INBOUND PARSED DETAILS:', {
            fromEmail,
            fromName,
            subject,
            hasText: !!emailContent.text,
            hasHtml: !!emailContent.html,
            parsedTextLength: rawText.length
        });
        
        if (!fromEmail || !rawText) {
            console.warn('Webhook Inbound: Remetente ou conteúdo vazios após busca no Resend. Retornando 200 OK para evitar loops.', { fromEmail, hasText: !!rawText });
            return NextResponse.json({ success: true, message: 'Ignorado por falta de conteúdo' });
        }

        const newReply = extractReplyText(rawText);
        const supabase = createAdminClient();

        // 4. Buscar a última mensagem de contato desse remetente
        const { data: latestMessage, error: fetchError } = await (supabase
            .from('contact_messages') as any)
            .select('*')
            .eq('email', fromEmail)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (fetchError) {
            console.error('Erro ao buscar mensagem original no banco:', fetchError);
            return NextResponse.json({ error: 'Erro de banco de dados' }, { status: 500 });
        }

        const dateFormatted = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

        if (latestMessage) {
            // 5. Se encontrou, concatenamos no corpo da mensagem original e voltamos o status para 'pending'
            const originalText = latestMessage.message || '';
            const updatedHistory = `${originalText}\n\n--- Resposta de ${fromName} em ${dateFormatted} ---\n${newReply}`;

            const { error: updateError } = await (supabase
                .from('contact_messages') as any)
                .update({
                    message: updatedHistory,
                    status: 'pending', // Volta a ficar pendente para chamar a atenção do Admin
                    replied_at: null, // Limpa o horário de resposta antiga para não confundir
                    reply_message: null // Limpa para permitir uma nova resposta
                })
                .eq('id', latestMessage.id);

            if (updateError) {
                console.error('Erro ao atualizar histórico de mensagens no banco:', updateError);
                return NextResponse.json({ error: 'Erro ao salvar histórico' }, { status: 500 });
            }

            console.log(`Mensagem de contato ID ${latestMessage.id} atualizada com nova resposta de ${fromEmail}`);
        } else {
            // 6. Se NÃO encontrou nenhuma mensagem anterior desse e-mail, registramos como um novo contato
            const { error: insertError } = await (supabase
                .from('contact_messages') as any)
                .insert({
                    name: fromName,
                    email: fromEmail,
                    subject: subject || 'Resposta recebida via e-mail',
                    message: newReply,
                    status: 'pending'
                });

            if (insertError) {
                console.error('Erro ao criar novo contato vindo de e-mail:', insertError);
                return NextResponse.json({ error: 'Erro ao salvar novo contato' }, { status: 500 });
            }

            console.log(`Nova mensagem de contato criada vinda de e-mail de ${fromEmail}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Erro inesperado no Webhook Inbound:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
