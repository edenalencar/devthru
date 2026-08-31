/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/api/admin-auth';
import { sendEmail } from '@/lib/email';
import { WelcomeEmailTemplate } from '@/components/emails/WelcomeEmailTemplate';
import { NextResponse } from 'next/server';
import React from 'react';

export async function GET() {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const supabase = createAdminClient();

        const { data: pendingUsers, error } = await (supabase
            .from('profiles') as any)
            .select('id, email, full_name, created_at, welcome_sent')
            .eq('welcome_sent', false)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({
            count: pendingUsers?.length || 0,
            pendingUsers: pendingUsers || []
        });
    } catch (error) {
        console.error('Erro ao listar usuários pendentes de boas-vindas:', error);
        return NextResponse.json({ error: 'Erro interno ao consultar usuários' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const supabase = createAdminClient();
        const body = await req.json().catch(() => ({}));
        const targetUserId = body.userId; // Opcional: enviar/reenviar para um usuário específico

        let query = (supabase
            .from('profiles') as any)
            .select('id, email, full_name, welcome_sent');

        if (targetUserId) {
            // Se um usuário específico for informado, permite envio mesmo se welcome_sent já for true (Reenvio)
            query = query.eq('id', targetUserId);
        } else {
            // Disparo em lote: filtra apenas os pendentes
            query = query.eq('welcome_sent', false);
        }

        const { data: usersToSend, error } = await query;

        if (error) throw error;

        if (!usersToSend || usersToSend.length === 0) {
            return NextResponse.json({
                success: true,
                message: targetUserId ? 'Usuário não encontrado.' : 'Nenhum usuário pendente de e-mail de boas-vindas.',
                sentCount: 0
            });
        }

        let sentCount = 0;
        const results: Array<{ email: string; success: boolean; error?: unknown }> = [];

        for (const user of usersToSend) {
            if (!user.email) continue;

            const userName = user.full_name || 'Desenvolvedor';
            const emailElement = React.createElement(WelcomeEmailTemplate, {
                userName: userName,
            });

            const { error: sendError } = await sendEmail({
                to: user.email,
                subject: 'Bem-vindo ao DevThru! 🚀',
                react: emailElement,
            });

            if (!sendError) {
                await (supabase
                    .from('profiles') as any)
                    .update({ welcome_sent: true, updated_at: new Date().toISOString() })
                    .eq('id', user.id);

                sentCount++;
                results.push({ email: user.email, success: true });
            } else {
                results.push({ email: user.email, success: false, error: sendError });
            }
        }

        return NextResponse.json({
            success: true,
            sentCount,
            totalPending: usersToSend.length,
            results
        });
    } catch (error) {
        console.error('Erro ao processar envio de e-mails de boas-vindas:', error);
        return NextResponse.json({ error: 'Erro ao processar envio de boas-vindas' }, { status: 500 });
    }
}
