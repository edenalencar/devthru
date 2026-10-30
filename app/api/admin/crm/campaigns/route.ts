/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/api/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { formatEmailSender } from '@/lib/email';
import { BroadcastEmailTemplate } from '@/components/emails/BroadcastEmailTemplate';
import { z } from 'zod';
import React from 'react';

const createCampaignSchema = z.object({
    subject: z.string().min(3, 'Assunto deve ter pelo menos 3 caracteres'),
    target_segment: z.enum(['all_newsletter', 'pro_users', 'free_users', 'expired_trials', 'business_users']),
    content: z.string().min(10, 'Conteúdo deve ter pelo menos 10 caracteres'),
});

export async function GET() {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const supabase = createAdminClient();

        // 1. Buscar histórico de campanhas
        const { data: campaigns } = await (supabase
            .from('crm_campaigns') as any)
            .select('*')
            .order('created_at', { ascending: false });

        // 2. Calcular tamanhos de audiência
        const { data: subscribers } = await (supabase
            .from('newsletter_subscribers') as any)
            .select('email')
            .eq('active', true);

        const { data: profiles } = await (supabase
            .from('profiles') as any)
            .select('email, subscription_tier, trial_ends_at, newsletter_subscribed');

        const now = new Date();
        const allNewsletterEmails = new Set<string>();

        (subscribers || []).forEach((s: any) => {
            if (s.email) allNewsletterEmails.add(s.email.toLowerCase().trim());
        });

        let proCount = 0;
        let businessCount = 0;
        let expiredTrialCount = 0;
        let freeCount = 0;

        (profiles || []).forEach((p: any) => {
            const email = (p.email || '').toLowerCase().trim();
            if (p.newsletter_subscribed && email) {
                allNewsletterEmails.add(email);
            }

            const tier = (p.subscription_tier || 'free').toLowerCase();
            if (tier === 'pro') proCount++;
            else if (tier === 'business' || tier === 'enterprise') businessCount++;
            else freeCount++;

            if (p.trial_ends_at && new Date(p.trial_ends_at) <= now && tier === 'free') {
                expiredTrialCount++;
            }
        });

        return NextResponse.json({
            campaigns: campaigns || [],
            audience: {
                totalNewsletter: allNewsletterEmails.size,
                proCount,
                businessCount,
                expiredTrialCount,
                freeCount,
            }
        });
    } catch (error) {
        console.error('Error in GET /api/admin/crm/campaigns:', error);
        return NextResponse.json({ error: 'Erro ao buscar dados de campanhas' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { isAdmin, user: adminUser, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const body = await req.json();
        const parsed = createCampaignSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Dados inválidos', details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { subject, target_segment, content } = parsed.data;
        const supabase = createAdminClient();
        const now = new Date();

        // 1. Resolver lista de destinatários com base no segmento
        const recipientEmails = new Set<string>();

        if (target_segment === 'all_newsletter') {
            const { data: subs } = await (supabase
                .from('newsletter_subscribers') as any)
                .select('email')
                .eq('active', true);

            (subs || []).forEach((s: any) => {
                if (s.email) recipientEmails.add(s.email.toLowerCase().trim());
            });

            const { data: profs } = await (supabase
                .from('profiles') as any)
                .select('email')
                .eq('newsletter_subscribed', true);

            (profs || []).forEach((p: any) => {
                if (p.email) recipientEmails.add(p.email.toLowerCase().trim());
            });
        } else if (target_segment === 'pro_users') {
            const { data: profs } = await (supabase
                .from('profiles') as any)
                .select('email')
                .eq('subscription_tier', 'pro');

            (profs || []).forEach((p: any) => {
                if (p.email) recipientEmails.add(p.email.toLowerCase().trim());
            });
        } else if (target_segment === 'business_users') {
            const { data: profs } = await (supabase
                .from('profiles') as any)
                .select('email')
                .or('subscription_tier.eq.business,subscription_tier.eq.enterprise');

            (profs || []).forEach((p: any) => {
                if (p.email) recipientEmails.add(p.email.toLowerCase().trim());
            });
        } else if (target_segment === 'expired_trials') {
            const { data: profs } = await (supabase
                .from('profiles') as any)
                .select('email, trial_ends_at, subscription_tier')
                .not('trial_ends_at', 'is', null)
                .lte('trial_ends_at', now.toISOString());

            (profs || []).forEach((p: any) => {
                const tier = (p.subscription_tier || 'free').toLowerCase();
                if (tier === 'free' && p.email) {
                    recipientEmails.add(p.email.toLowerCase().trim());
                }
            });
        } else if (target_segment === 'free_users') {
            const { data: profs } = await (supabase
                .from('profiles') as any)
                .select('email, subscription_tier');

            (profs || []).forEach((p: any) => {
                const tier = (p.subscription_tier || 'free').toLowerCase();
                if (tier === 'free' && p.email) {
                    recipientEmails.add(p.email.toLowerCase().trim());
                }
            });
        }

        const emailList = Array.from(recipientEmails);

        if (emailList.length === 0) {
            return NextResponse.json(
                { error: 'Nenhum destinatário encontrado para o segmento selecionado.' },
                { status: 400 }
            );
        }

        // 2. Disparar via Resend (em lotes de 100 com resend.batch.send)
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'RESEND_API_KEY não configurada no servidor' }, { status: 500 });
        }

        const resend = new Resend(apiKey);
        const fromEmail = formatEmailSender(process.env.MAIL_FROM_NEWSLETTER, 'DevThru', 'newsletter@devthru.com');
        const batchSize = 100;
        let sentCount = 0;

        for (let i = 0; i < emailList.length; i += batchSize) {
            const batch = emailList.slice(i, i + batchSize);

            const batchPayload = batch.map(toEmail => ({
                from: fromEmail,
                to: [toEmail],
                subject,
                react: React.createElement(BroadcastEmailTemplate, {
                    subject,
                    content,
                    recipientEmail: toEmail,
                }),
            }));

            const { error: batchError } = await resend.batch.send(batchPayload);

            if (batchError) {
                console.error(`Erro ao disparar lote de campanha para ${batch.length} e-mails:`, batchError);
            } else {
                sentCount += batch.length;
            }
        }

        // 3. Registrar na tabela crm_campaigns
        const { data: campaignRecord, error: insertError } = await (supabase
            .from('crm_campaigns') as any)
            .insert({
                subject,
                target_segment,
                content,
                sent_count: sentCount,
                status: 'sent',
                sent_at: new Date().toISOString(),
                created_by: adminUser?.id || null,
            })
            .select()
            .single();

        if (insertError) {
            console.warn('Campanha enviada, mas houve erro ao salvar registro:', insertError);
        }

        return NextResponse.json({
            success: true,
            sentCount,
            campaign: campaignRecord,
            message: `Campanha enviada com sucesso para ${sentCount} destinatários.`
        });
    } catch (error) {
        console.error('Error in POST /api/admin/crm/campaigns:', error);
        return NextResponse.json({ error: 'Erro interno ao processar disparo de campanha' }, { status: 500 });
    }
}
