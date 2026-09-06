/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email';
import { WelcomeEmailTemplate } from '@/components/emails/WelcomeEmailTemplate';

export interface SendWelcomeEmailParams {
    userId: string;
    userEmail: string;
    userName?: string;
    supabaseClient?: any;
    force?: boolean;
}

export interface SendWelcomeEmailResult {
    success: boolean;
    sent: boolean;
    reason?: string;
    error?: unknown;
}

/**
 * Envia o e-mail de boas-vindas para um usuário caso ele ainda não tenha recebido.
 * Garante idempotência verificando `welcome_sent` na tabela `profiles` e atualiza a flag após o envio.
 */
export async function sendWelcomeEmailIfNeeded({
    userId,
    userEmail,
    userName,
    supabaseClient,
    force = false,
}: SendWelcomeEmailParams): Promise<SendWelcomeEmailResult> {
    try {
        if (!userId || !userEmail) {
            return {
                success: false,
                sent: false,
                reason: 'missing_user_info',
                error: new Error('userId e userEmail são obrigatórios'),
            };
        }

        // 1. Tentar usar cliente admin com service_role para contornar RLS
        let dbClient: any = null;
        try {
            if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
                dbClient = createAdminClient();
            }
        } catch (adminErr) {
            console.warn('[Welcome Service] Não foi possível instanciar admin client:', adminErr);
        }

        if (!dbClient && supabaseClient) {
            dbClient = supabaseClient;
        }

        if (!dbClient) {
            return {
                success: false,
                sent: false,
                reason: 'database_client_unavailable',
                error: new Error('Nenhum cliente Supabase disponível para consulta/atualização'),
            };
        }

        // 2. Verificar status atual de welcome_sent no banco
        const { data: profile, error: profileErr } = await (dbClient
            .from('profiles') as any)
            .select('welcome_sent, full_name')
            .eq('id', userId)
            .maybeSingle();

        if (profileErr) {
            console.warn('[Welcome Service] Aviso ao consultar status no banco:', profileErr);
        }

        // Se já foi enviado anteriormente e não for reenvio forçado, não reenvia
        if (!force && profile?.welcome_sent) {
            return {
                success: true,
                sent: false,
                reason: 'already_sent',
            };
        }

        // 3. Resolver o nome para saudação personalizada
        const resolvedName =
            userName?.trim() ||
            profile?.full_name?.trim() ||
            'Desenvolvedor';

        // 4. Renderizar o template de e-mail
        const emailElement = React.createElement(WelcomeEmailTemplate, {
            userName: resolvedName,
        });

        // 5. Realizar o disparo via Resend
        const { error: sendError } = await sendEmail({
            to: userEmail,
            subject: 'Bem-vindo ao DevThru! 🚀',
            react: emailElement,
        });

        if (sendError) {
            console.error('[Welcome Service] Falha ao enviar e-mail via Resend:', sendError);
            return {
                success: false,
                sent: false,
                reason: 'gateway_error',
                error: sendError,
            };
        }

        // 6. Atualizar a flag welcome_sent no banco de dados
        const updatePayload = {
            welcome_sent: true,
            updated_at: new Date().toISOString(),
        };

        const { error: updateErr } = await (dbClient
            .from('profiles') as any)
            .update(updatePayload)
            .eq('id', userId);

        if (updateErr) {
            console.warn('[Welcome Service] Aviso ao persistir welcome_sent com dbClient:', updateErr);
            if (supabaseClient && supabaseClient !== dbClient) {
                await (supabaseClient
                    .from('profiles') as any)
                    .update(updatePayload)
                    .eq('id', userId);
            }
        }

        console.log(`[Welcome Service] E-mail de boas-vindas enviado e registrado com sucesso para ${userEmail}`);
        return {
            success: true,
            sent: true,
        };
    } catch (err) {
        console.error('[Welcome Service] Erro inesperado ao processar boas-vindas:', err);
        return {
            success: false,
            sent: false,
            reason: 'internal_error',
            error: err,
        };
    }
}
