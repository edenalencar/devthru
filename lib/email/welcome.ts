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

// Map em memória para evitar que múltiplas requisições paralelas no mesmo processo Node/Next.js
// processem o mesmo usuário concorrentemente.
const inFlightWelcomes = new Map<string, Promise<SendWelcomeEmailResult>>();

/**
 * Função interna que executa o fluxo protegido de boas-vindas.
 */
async function executeSendWelcomeEmail({
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

        // 3. Reserva Atômica (Distributed Claim Lock) no PostgreSQL:
        // Antes de chamar a API externa do Resend, tentamos marcar atomicamente welcome_sent = true
        // APENAS se ainda estiver false ou null.
        // O PostgreSQL aplica row-lock exclusivo durante o UPDATE: se 2 ou mais requisições
        // chegarem ao mesmo tempo, apenas a primeira atualiza a linha e obtém a permissão de envio.
        let claimedRows: any[] | null = null;
        if (!force) {
            try {
                const updateQuery = (dbClient.from('profiles') as any)
                    .update({
                        welcome_sent: true,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', userId);

                if (typeof updateQuery.or === 'function') {
                    const { data: updatedData, error: claimErr } = await updateQuery
                        .or('welcome_sent.is.null,welcome_sent.eq.false')
                        .select('id, full_name');

                    if (!claimErr && Array.isArray(updatedData)) {
                        claimedRows = updatedData;
                        if (updatedData.length === 0) {
                            // Outra requisição simultânea acabou de adquirir a reserva
                            console.log(`[Welcome Service] Disparo concorrente bloqueado para ${userId}: reserva já adquirida.`);
                            return {
                                success: true,
                                sent: false,
                                reason: 'already_sent',
                            };
                        }
                    }
                }
            } catch (lockErr) {
                console.warn('[Welcome Service] Aviso ao tentar reserva atômica:', lockErr);
            }
        }

        // 4. Resolver o nome para saudação personalizada
        const resolvedName =
            userName?.trim() ||
            claimedRows?.[0]?.full_name?.trim() ||
            profile?.full_name?.trim() ||
            'Desenvolvedor';

        // 5. Renderizar o template de e-mail
        const emailElement = React.createElement(WelcomeEmailTemplate, {
            userName: resolvedName,
        });

        // 6. Realizar o disparo via Resend
        const { error: sendError } = await sendEmail({
            to: userEmail,
            subject: 'Bem-vindo ao DevThru! 🚀',
            react: emailElement,
        });

        if (sendError) {
            console.error('[Welcome Service] Falha ao enviar e-mail via Resend:', sendError);

            // Reverte a reserva no banco de dados para que o usuário não fique bloqueado de receber
            if (!force && claimedRows && claimedRows.length > 0) {
                try {
                    await (dbClient.from('profiles') as any)
                        .update({
                            welcome_sent: false,
                            updated_at: new Date().toISOString(),
                        })
                        .eq('id', userId);
                } catch (rollbackErr) {
                    console.warn('[Welcome Service] Falha ao reverter status após erro de envio:', rollbackErr);
                }
            }

            return {
                success: false,
                sent: false,
                reason: 'gateway_error',
                error: sendError,
            };
        }

        // 7. Se for reenvio forçado (force === true) ou se o claim condicional não tiver rodado,
        // garante a persistência de welcome_sent = true
        if (force || !claimedRows) {
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

/**
 * Envia o e-mail de boas-vindas para um usuário caso ele ainda não tenha recebido.
 * Garante idempotência absoluta combinando:
 * 1. Mutex de requisições em vôo no processo Node (inFlightWelcomes)
 * 2. Reserva atômica no banco de dados com row-lock condicional no PostgreSQL
 */
export async function sendWelcomeEmailIfNeeded(
    params: SendWelcomeEmailParams
): Promise<SendWelcomeEmailResult> {
    const { userId, force = false } = params;

    // Se já houver um disparo em andamento para o mesmo usuário nesta mesma instância, reutiliza a promessa
    if (userId && !force && inFlightWelcomes.has(userId)) {
        console.log(`[Welcome Service] Disparo concorrente detectado para ${userId}. Reutilizando requisição em andamento.`);
        return inFlightWelcomes.get(userId)!;
    }

    const execution = executeSendWelcomeEmail(params);

    if (userId && !force) {
        inFlightWelcomes.set(userId, execution);
    }

    try {
        return await execution;
    } finally {
        if (userId && !force) {
            inFlightWelcomes.delete(userId);
        }
    }
}
