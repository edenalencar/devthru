/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { sendWelcomeEmailIfNeeded } from '@/lib/email/welcome';
import { type EmailOtpType } from '@supabase/supabase-js';

function renderClientCallbackHtml(redirectTarget: string) {
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Confirmando conta | DevThru</title>
    <style>
        * { box-sizing: border-box; }
        body {
            margin: 0;
            padding: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #09090b;
            color: #fafafa;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .card {
            text-align: center;
            padding: 2.5rem 2rem;
            max-width: 420px;
            width: 100%;
            background: #121215;
            border: 1px solid #27272a;
            border-radius: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
        }
        .spinner {
            width: 44px;
            height: 44px;
            border: 3px solid #27272a;
            border-top: 3px solid #135bec;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 1.25rem;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        h1 { font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem; color: #ffffff; }
        p { font-size: 0.875rem; color: #a1a1aa; margin: 0; line-height: 1.5; }
    </style>
</head>
<body>
    <div class="card">
        <div class="spinner"></div>
        <h1>Confirmando sua conta</h1>
        <p>Finalizando a validação e preparando seu acesso ao DevThru...</p>
    </div>
    <script>
        (async function() {
            try {
                const rawHash = window.location.hash || '';
                const hash = rawHash.startsWith('#') ? rawHash.substring(1) : rawHash;
                const params = new URLSearchParams(hash);
                const accessToken = params.get('access_token');
                const refreshToken = params.get('refresh_token');
                const error = params.get('error');
                const errorDescription = params.get('error_description');

                if (error) {
                    window.location.href = '/login?error=' + encodeURIComponent(errorDescription || error);
                    return;
                }

                if (accessToken && refreshToken) {
                    const res = await fetch('/api/auth/confirm-session', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            access_token: accessToken,
                            refresh_token: refreshToken,
                            next: ${JSON.stringify(redirectTarget)}
                        })
                    });

                    if (res.ok) {
                        const data = await res.json();
                        window.location.href = data.redirect || ${JSON.stringify(redirectTarget)};
                        return;
                    }
                }
            } catch (e) {
                console.error('[Auth Callback] Erro no processamento do hash client-side:', e);
            }

            // Fallback caso não haja hash de sessão
            window.location.href = '/login';
        })();
    </script>
</body>
</html>`;

    return new NextResponse(html, {
        status: 200,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store, max-age=0',
        },
    });
}

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
            console.error('[Auth Callback] Erro ao trocar código por sessão:', error);
        }
    } else if (token_hash && type) {
        const { data: { session, user }, error } = await supabase.auth.verifyOtp({ token_hash, type });
        if (!error && (session?.user || user)) {
            authUser = session?.user || user;
        } else if (error) {
            console.error('[Auth Callback] Erro ao verificar OTP com token_hash:', error);
        }
    }

    if (authUser && authUser.email) {
        const userName = 
            authUser.user_metadata?.full_name || 
            authUser.user_metadata?.name || 
            authUser.user_metadata?.user_name || 
            authUser.user_metadata?.preferred_username || 
            'Desenvolvedor';

        // Disparo resiliente e idempotente de boas-vindas
        await sendWelcomeEmailIfNeeded({
            userId: authUser.id,
            userEmail: authUser.email,
            userName,
            supabaseClient: supabase,
        });

        return NextResponse.redirect(`${baseUrl}${redirectTarget}`);
    }

    // Se authUser for nulo (seja por ausência de parâmetros ou falha de código),
    // serve a ponte HTML para capturar tokens presentes no fragmento de hash (#access_token=...)
    return renderClientCallbackHtml(redirectTarget);
}
