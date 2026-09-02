/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email';
import { WelcomeEmailTemplate } from '@/components/emails/WelcomeEmailTemplate';
import { NextResponse } from 'next/server';
import React from 'react';

export async function POST() {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user || !user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = user.id;
        const userEmail = user.email;

        // Tentar usar o admin client para contornar RLS em leitura/escrita, com fallback para o cliente autenticado
        let dbClient: any = null;
        try {
            if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
                dbClient = createAdminClient();
            }
        } catch {
            dbClient = supabase;
        }
        if (!dbClient) dbClient = supabase;

        // Verificar status atual de welcome_sent
        const { data: profile, error: profileErr } = await (dbClient
            .from('profiles') as any)
            .select('welcome_sent, full_name')
            .eq('id', userId)
            .maybeSingle();

        if (profileErr) {
            console.warn('[Welcome API] Aviso ao buscar perfil do usuário:', profileErr);
        }

        if (profile?.welcome_sent) {
            return NextResponse.json({
                success: true,
                sent: false,
                message: 'E-mail de boas-vindas já foi enviado anteriormente.'
            });
        }

        const userName = 
            profile?.full_name || 
            user.user_metadata?.full_name || 
            user.user_metadata?.name || 
            user.user_metadata?.user_name || 
            user.user_metadata?.preferred_username || 
            'Desenvolvedor';

        const emailElement = React.createElement(WelcomeEmailTemplate, {
            userName,
        });

        const { error: sendError } = await sendEmail({
            to: userEmail,
            subject: 'Bem-vindo ao DevThru! 🚀',
            react: emailElement,
        });

        if (sendError) {
            console.error('[Welcome API] Falha ao enviar e-mail via Resend:', sendError);
            return NextResponse.json(
                { success: false, error: 'Falha no gateway de envio de e-mail' },
                { status: 500 }
            );
        }

        // Atualiza a flag welcome_sent
        const { error: updateErr } = await (dbClient
            .from('profiles') as any)
            .update({
                welcome_sent: true,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        if (updateErr) {
            console.warn('[Welcome API] Aviso ao atualizar welcome_sent no banco:', updateErr);
            // Fallback usando cliente de sessão
            await (supabase
                .from('profiles') as any)
                .update({
                    welcome_sent: true,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', userId);
        }

        console.log(`[Welcome API] E-mail de boas-vindas disparado com sucesso para ${userEmail}`);
        return NextResponse.json({ success: true, sent: true });

    } catch (err: any) {
        console.error('[Welcome API] Erro inesperado na rota de boas-vindas:', err);
        return NextResponse.json(
            { error: 'Erro interno ao processar e-mail de boas-vindas' },
            { status: 500 }
        );
    }
}
