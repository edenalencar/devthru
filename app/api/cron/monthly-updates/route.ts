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

        // Destaque Editorial Principal: A Área Logada do DevThru (sem menções técnicas de infra/banco)
        const featuredSection = {
            badge: "Novidade & Produtividade",
            title: "🚀 Conheça os Superpoderes da sua Conta no DevThru",
            subtitle: "Você sabia que ter uma conta gratuita no DevThru desbloqueia recursos avançados para o seu fluxo de desenvolvimento?",
            points: [
                {
                    title: "📂 Histórico Persistente e Sincronizado",
                    description: "Suas gerações e dados de teste ficam salvos com segurança na nuvem, acessíveis de qualquer navegador ou dispositivo, sem o risco de perda ao limpar cookies."
                },
                {
                    title: "📊 Exportação para CSV, JSON e Excel (.xlsx)",
                    description: "Exporte históricos de dados com 1 clique para anexar em tarefas de homologação, tickets do Jira ou compartilhar massas de dados com o time de QA."
                },
                {
                    title: "🔑 API Keys para Automação & Testes",
                    description: "Gere sua chave de API pessoal na aba de configurações e consuma os geradores do DevThru diretamente em scripts, testes automatizados e pipelines."
                },
                {
                    title: "⚡ Métricas de Produtividade & Atalhos",
                    description: "Visualize sua ferramenta mais utilizada, o volume de gerações realizadas e acerte o atalho direto para o que você mais precisa."
                }
            ],
            ctaText: "Acessar Meu Dashboard no DevThru →",
            ctaUrl: "https://www.devthru.com/dashboard"
        };

        // Ferramentas inéditas em destaque (Curadoria de utilitários de alta demanda ainda não enviados)
        const newTools = [
            {
                title: "Debugger de JWT (JSON Web Tokens)",
                description: "Decodifique Header, Payload e valide assinaturas de JWT em tempo real com total privacidade — tudo executado 100% no seu navegador.",
                url: "https://www.devthru.com/tools/development/jwt-debugger"
            },
            {
                title: "Simulador de Split Payment (Reforma Tributária)",
                description: "Simule a retenção automática de IBS e CBS na liquidação financeira e compreenda os impactos técnicos das novas regras tributárias brasileiras.",
                url: "https://www.devthru.com/tools/finance/split-payment"
            },
            {
                title: "Gerador e Testador de Regex",
                description: "Crie e valide expressões regulares com destaque em tempo real, explicação de tokens e atalhos para padrões brasileiros (CPF, CNPJ, telefone, CEP).",
                url: "https://www.devthru.com/tools/development/regex"
            },
            {
                title: "Decodificador de Pix Copia e Cola & Placa Pix",
                description: "Faça o parse de payloads EMVCo do Pix, inspecione parâmetros, valide o CRC16 e gere placas de balcão prontas para impressão.",
                url: "https://www.devthru.com/tools/finance/pix-parser"
            }
        ];

        // Pegar os 3 posts de blog mais recentes
        const recentPosts = getAllPosts().slice(0, 3).map(post => ({
            title: post.title,
            description: post.description,
            url: `https://www.devthru.com/blog/${post.slug}`
        }));

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
                    introText: "O DevThru segue evoluindo como a sua parada rápida para ferramentas de desenvolvimento. Nesta edição, apresentamos como aproveitar ao máximo a sua Área Logada e trazemos uma seleção especial de utilitários indispensáveis para acelerar o seu dia a dia.",
                    featuredSection: featuredSection,
                    newTools: newTools,
                    blogPosts: recentPosts,
                    radioSpotlight: radioSpotlight,
                    userEmail: email,
                });

                return {
                    from: fromEmail,
                    to: email,
                    replyTo: replyToEmail, // Direciona as respostas para o e-mail de contato de suporte
                    subject: '🔑 Histórico na nuvem, exportação em Excel e API Keys: você já conhece a sua conta no DevThru?',
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
