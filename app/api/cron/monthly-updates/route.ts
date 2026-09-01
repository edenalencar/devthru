import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getAllPosts } from '@/lib/content/blog';
import { MonthlyUpdatesEmailTemplate } from '@/components/emails/MonthlyUpdatesEmailTemplate';
import { formatEmailSender } from '@/lib/email';
import React from 'react';

// Forçamos a execução como dinâmica para evitar cache de build da página da cron
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        // 1. Validar Token de Segurança da Cron da Vercel
        const authHeader = req.headers.get('authorization');
        const isProd = process.env.NODE_ENV === 'production';
        const expectedToken = `Bearer ${process.env.CRON_SECRET}`;

        if (isProd && authHeader !== expectedToken) {
            console.warn('Tentativa de execução de Cron Job não autorizada');
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        const supabase = createAdminClient();

        // 2. Buscar todos os usuários inscritos na newsletter
        const { data: users, error: fetchErr } = await (supabase
            .from('profiles') as any)
            .select('email')
            .eq('newsletter_subscribed', true);

        if (fetchErr) {
            console.error('Erro ao buscar usuários para newsletter:', fetchErr);
            return NextResponse.json({ error: 'Erro de banco de dados' }, { status: 500 });
        }

        if (!users || users.length === 0) {
            return NextResponse.json({ success: true, message: 'Nenhum usuário inscrito na newsletter.' });
        }

        // 3. Montar as informações dinâmicas do e-mail
        const now = new Date();
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        const currentMonthYear = `${monthNames[now.getMonth()]}/${now.getFullYear()}`;

        // Pegar os 3 posts de blog mais recentes
        const recentPosts = getAllPosts().slice(0, 3).map(post => ({
            title: post.title,
            description: post.description,
            url: `https://www.devthru.com/blog/${post.slug}`
        }));

        // Ferramentas em destaque do mês (Curadoria: Fiscal, Integração & Utilitários de Alta Produtividade)
        const newTools = [
            {
                title: "Decodificador de Chave SEFAZ",
                description: "Desmembre chaves de 44 dígitos de NF-e, NFC-e, CT-e e MDF-e com validação matemática de Módulo 11 e exportação JSON.",
                url: "https://www.devthru.com/tools/business/nfe-decoder"
            },
            {
                title: "Gerador de Link WhatsApp (wa.me)",
                description: "Crie links diretos personalizados com mensagem pronta, preview em tempo real e QR Code dinâmico para smartphones.",
                url: "https://www.devthru.com/tools/utilities/whatsapp-link-generator"
            },
            {
                title: "Conversor de cURL para Código",
                description: "Converta comandos cURL para JavaScript (Fetch e Axios), Python Requests, Go e PHP de forma instantânea.",
                url: "https://www.devthru.com/tools/development/curl-converter"
            },
            {
                title: "Leitor e Decodificador de CNAB",
                description: "Inspecione e valide arquivos de remessa e retorno CNAB 240 e CNAB 400 da FEBRABAN com visualização de lotes.",
                url: "https://www.devthru.com/tools/finance/cnab-parser"
            }
        ];

        // Destaque da Rádio Lo-Fi Dev & Central de Foco
        const radioSpotlight = {
            title: "Rádio Lo-Fi Dev & Central de Foco 🎧",
            description: "Ouça canais de Lo-Fi e Synthwave, barulho de chuva, café e teclado com notas rápidas e alarme de postura direto no DevThru.",
            url: "https://www.devthru.com"
        };

        // 4. Preparar o envio em lotes usando a API de lote (Batch) do Resend
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail = formatEmailSender(process.env.MAIL_FROM_NEWSLETTER, 'DevThru', 'newsletter@devthru.com');
        const replyToEmail = formatEmailSender(process.env.MAIL_FROM, 'DevThru', 'contato@devthru.com');
        
        // Formatar os e-mails para envio em blocos de até 100 destinatários por vez
        const emailList = users.map((u: any) => u.email).filter(Boolean);
        const batchSize = 100;
        let sentCount = 0;

        for (let i = 0; i < emailList.length; i += batchSize) {
            const currentBatch = emailList.slice(i, i + batchSize);
            
            const batchPayload = currentBatch.map((email: any) => {
                const emailElement = React.createElement(MonthlyUpdatesEmailTemplate, {
                    monthYear: currentMonthYear,
                    newTools: newTools,
                    blogPosts: recentPosts,
                    radioSpotlight: radioSpotlight,
                    userEmail: email,
                });

                return {
                    from: fromEmail,
                    to: email,
                    replyTo: replyToEmail, // Direciona as respostas para o e-mail de contato de suporte
                    subject: `🚀 Novas ferramentas e atualizações • ${currentMonthYear}`,
                    react: emailElement,
                };
            });

            // Enviar o lote para o Resend
            const { data, error: batchError } = await resend.batch.send(batchPayload);

            if (batchError) {
                console.error(`Erro ao enviar lote ${i / batchSize + 1} da newsletter:`, batchError);
            } else {
                sentCount += currentBatch.length;
                console.log(`Lote ${i / batchSize + 1} enviado com sucesso (${currentBatch.length} e-mails)`);
            }
        }

        return NextResponse.json({
            success: true,
            message: `Newsletter enviada com sucesso para ${sentCount} usuários.`,
            month: currentMonthYear
        });

    } catch (err) {
        console.error('Erro inesperado na Cron de Newsletter:', err);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
