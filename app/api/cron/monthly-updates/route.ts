import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getAllPosts } from '@/lib/content/blog';
import { MonthlyUpdatesEmailTemplate } from '@/components/emails/MonthlyUpdatesEmailTemplate';
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

        // Ferramentas em destaque do mês
        const newTools = [
            {
                title: "Gerador de Crontab Online",
                description: "Configure agendamentos cron de forma simples e gere a linha de comando linux na hora.",
                url: "https://www.devthru.com/tools/development/crontab-generator"
            },
            {
                title: "Gerador de QR Code",
                description: "Crie códigos QR para links, Wi-Fi e textos com download em alta resolução (PNG e SVG).",
                url: "https://www.devthru.com/tools/utilities/qrcode"
            },
            {
                title: "Painel de Controle Administrativo",
                description: "Gerenciamento completo de mensagens e usuários em uma interface integrada.",
                url: "https://www.devthru.com/admin"
            }
        ];

        // 4. Preparar o envio em lotes usando a API de lote (Batch) do Resend
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail = process.env.MAIL_FROM || 'DevThru <contato@devthru.com>';
        
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
                    userEmail: email,
                });

                return {
                    from: fromEmail,
                    to: email,
                    subject: `Novidades do DevThru • ${currentMonthYear} 🚀`,
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
