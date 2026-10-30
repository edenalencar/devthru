/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { TrialWarningEmailTemplate } from '@/components/emails/TrialWarningEmailTemplate';
import { TrialExpiredEmailTemplate } from '@/components/emails/TrialExpiredEmailTemplate';
import { differenceInDays } from 'date-fns';
import React from 'react';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        // 1. Validar Token de Segurança da Cron da Vercel
        const authHeader = req.headers.get('authorization');
        const isProd = process.env.NODE_ENV === 'production';
        const expectedToken = `Bearer ${process.env.CRON_SECRET}`;

        if (isProd && authHeader !== expectedToken) {
            console.warn('Tentativa de execução de Cron de Trial não autorizada');
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
        }

        const supabase = createAdminClient();
        const now = new Date();
        const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

        let warningsSent = 0;
        let expiredSent = 0;

        // 2. Buscar usuários com trial expirando em até 3 dias (D-3) que ainda não foram avisados
        const { data: warningUsers, error: warningErr } = await (supabase
            .from('profiles') as any)
            .select('id, email, full_name, trial_ends_at, subscription_tier')
            .not('trial_ends_at', 'is', null)
            .is('trial_warning_sent_at', null)
            .gt('trial_ends_at', now.toISOString())
            .lte('trial_ends_at', inThreeDays.toISOString());

        if (warningErr) {
            console.error('Erro ao buscar usuários para alerta de trial:', warningErr);
        } else if (warningUsers && warningUsers.length > 0) {
            for (const user of warningUsers) {
                // Se já for assinante Pro/Business pago, não precisa alertar
                if (user.subscription_tier === 'pro' || user.subscription_tier === 'business') {
                    continue;
                }

                const daysRemaining = Math.max(1, differenceInDays(new Date(user.trial_ends_at), now));
                const emailElement = React.createElement(TrialWarningEmailTemplate, {
                    userName: user.full_name || 'Desenvolvedor',
                    daysRemaining,
                });

                const { error: sendError } = await sendEmail({
                    to: user.email,
                    subject: `Seu trial no DevThru Pro encerra em ${daysRemaining} dias ⏳`,
                    react: emailElement,
                });

                if (!sendError) {
                    await (supabase.from('profiles') as any)
                        .update({ trial_warning_sent_at: new Date().toISOString() })
                        .eq('id', user.id);
                    warningsSent++;
                }
            }
        }

        // 3. Buscar usuários cujo trial expirou (D-0) e ainda não receberam a notificação de expiração
        const { data: expiredUsers, error: expiredErr } = await (supabase
            .from('profiles') as any)
            .select('id, email, full_name, trial_ends_at, subscription_tier')
            .not('trial_ends_at', 'is', null)
            .is('trial_expired_sent_at', null)
            .lte('trial_ends_at', now.toISOString());

        if (expiredErr) {
            console.error('Erro ao buscar usuários com trial expirado:', expiredErr);
        } else if (expiredUsers && expiredUsers.length > 0) {
            for (const user of expiredUsers) {
                // Se já for assinante pago, não precisa notificar
                if (user.subscription_tier === 'pro' || user.subscription_tier === 'business') {
                    continue;
                }

                const emailElement = React.createElement(TrialExpiredEmailTemplate, {
                    userName: user.full_name || 'Desenvolvedor',
                });

                const { error: sendError } = await sendEmail({
                    to: user.email,
                    subject: `Seu período de teste no DevThru Pro encerrou`,
                    react: emailElement,
                });

                if (!sendError) {
                    await (supabase.from('profiles') as any)
                        .update({ trial_expired_sent_at: new Date().toISOString() })
                        .eq('id', user.id);
                    expiredSent++;
                }
            }
        }

        return NextResponse.json({
            success: true,
            warningsSent,
            expiredSent,
            message: `Automação executada: ${warningsSent} alertas de fim de trial e ${expiredSent} avisos de expiração enviados.`
        });
    } catch (error) {
        console.error('Erro inesperado na Cron de Trial Lifecycle:', error);
        return NextResponse.json({ error: 'Erro interno ao processar ciclo de vida de trial' }, { status: 500 });
    }
}
