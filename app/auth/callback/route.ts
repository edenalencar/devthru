/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { WelcomeEmailTemplate } from '@/components/emails/WelcomeEmailTemplate';
import { type EmailOtpType } from '@supabase/supabase-js';
import React from 'react';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type') as EmailOtpType | null;
    const next = searchParams.get('next') ?? '/dashboard';

    // Trata o host/origem de forma robusta em ambientes com proxy reverso (Vercel)
    const forwardedHost = request.headers.get('x-forwarded-host');
    const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
    const baseUrl = forwardedHost ? `${forwardedProto}://${forwardedHost}` : origin;
    const redirectTarget = next.startsWith('/') ? next : `/${next}`;

    const supabase = await createClient();
    let authUser: any = null;

    if (code) {
        const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error && session?.user) {
            authUser = session.user;
        } else if (error) {
            console.error('Erro ao trocar código por sessão no Supabase Auth:', error);
        }
    } else if (token_hash && type) {
        const { data: { session, user }, error } = await supabase.auth.verifyOtp({ token_hash, type });
        if (!error && (session?.user || user)) {
            authUser = session?.user || user;
        } else if (error) {
            console.error('Erro ao verificar OTP com token_hash no Supabase Auth:', error);
        }
    }

    if (authUser) {
        const userEmail = authUser.email;
        const userId = authUser.id;

        // Extrai o nome do usuário com suporte a Google (full_name, name) e GitHub (name, user_name, preferred_username)
        const userName = 
            authUser.user_metadata?.full_name || 
            authUser.user_metadata?.name || 
            authUser.user_metadata?.user_name || 
            authUser.user_metadata?.preferred_username || 
            'Desenvolvedor';

        // Processar o envio de boas-vindas aguardando a finalização da requisição do Resend
        // antes de realizar o redirecionamento (evita o congelamento do processo no Vercel Serverless)
        try {
            let shouldSendWelcome = false;
            let dbClient: any = null;

            // 1. Tentar inicializar o cliente admin se a chave de serviço estiver disponível
            try {
                if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
                    dbClient = createAdminClient();
                }
            } catch (adminInitErr) {
                console.warn('Aviso: Não foi possível instanciar adminSupabase, usando sessão do usuário:', adminInitErr);
            }

            // Fallback para o cliente autenticado de sessão
            if (!dbClient) {
                dbClient = supabase;
            }

            // 2. Buscar status de envio de boas-vindas
            const { data: profile, error: fetchErr } = await (dbClient
                .from('profiles') as any)
                .select('welcome_sent')
                .eq('id', userId)
                .maybeSingle();

            if (fetchErr) {
                console.warn('Aviso ao consultar status de welcome_sent no banco:', fetchErr);
                // Se o cliente admin falhou, tenta com o cliente de sessão do usuário
                if (dbClient !== supabase) {
                    const { data: userProfile, error: userFetchErr } = await (supabase
                        .from('profiles') as any)
                        .select('welcome_sent')
                        .eq('id', userId)
                        .maybeSingle();

                    if (!userFetchErr && (!userProfile || !userProfile.welcome_sent)) {
                        shouldSendWelcome = true;
                    } else if (userFetchErr) {
                        // Se ambos falharem mas o usuário é novo com e-mail válido, permite o envio
                        shouldSendWelcome = true;
                    }
                } else {
                    shouldSendWelcome = true;
                }
            } else {
                if (!profile || !profile.welcome_sent) {
                    shouldSendWelcome = true;
                }
            }

            // 3. Enviar e-mail de boas-vindas caso ainda não tenha sido enviado
            if (shouldSendWelcome && userEmail) {
                const emailElement = React.createElement(WelcomeEmailTemplate, {
                    userName: userName,
                });

                const { error: emailError } = await sendEmail({
                    to: userEmail,
                    subject: 'Bem-vindo ao DevThru! 🚀',
                    react: emailElement,
                });

                if (!emailError) {
                    console.log(`E-mail de boas-vindas enviado com sucesso para ${userEmail}`);

                    // 4. Persistir a flag welcome_sent no banco via upsert resiliente
                    const profileUpdate = {
                        id: userId,
                        email: userEmail,
                        full_name: userName,
                        welcome_sent: true,
                        updated_at: new Date().toISOString(),
                    };

                    const { error: updateErr } = await (dbClient
                        .from('profiles') as any)
                        .upsert(profileUpdate, { onConflict: 'id' });

                    if (updateErr) {
                        console.warn('Aviso ao persistir welcome_sent com dbClient, tentando cliente de sessão:', updateErr);
                        await (supabase
                            .from('profiles') as any)
                            .upsert(profileUpdate, { onConflict: 'id' });
                    }
                } else {
                    console.error('Falha ao enviar e-mail de boas-vindas via Resend:', emailError);
                }
            }
        } catch (welcomeErr) {
            console.error('Erro inesperado no fluxo de e-mail de boas-vindas:', welcomeErr);
        }

        return NextResponse.redirect(`${baseUrl}${redirectTarget}`);
    }

    // Retorna o usuário para a página de login com erro amigável em caso de falha de autenticação
    return NextResponse.redirect(`${baseUrl}/login?error=auth-code-error`);
}
