import { createClient } from '@/lib/supabase/server';
import { sendWelcomeEmailIfNeeded } from '@/lib/email/welcome';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));
        const { access_token, refresh_token, next = '/dashboard' } = body;

        if (!access_token || !refresh_token) {
            return NextResponse.json(
                { error: 'Tokens de autenticação não fornecidos' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // Define a sessão no Supabase e persiste os cookies no navegador
        const { data, error: sessionErr } = await supabase.auth.setSession({
            access_token,
            refresh_token,
        });

        if (sessionErr) {
            console.error('[Confirm Session API] Falha ao definir sessão:', sessionErr);
            return NextResponse.json(
                { error: 'Não foi possível validar a sessão' },
                { status: 401 }
            );
        }

        const user = data.user || data.session?.user;

        if (user && user.email) {
            const userName =
                user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                user.user_metadata?.user_name ||
                user.user_metadata?.preferred_username ||
                'Desenvolvedor';

            // Disparo resiliente do e-mail de boas-vindas após confirmação da conta
            await sendWelcomeEmailIfNeeded({
                userId: user.id,
                userEmail: user.email,
                userName,
                supabaseClient: supabase,
            });
        }

        const redirectTarget = next.startsWith('/') ? next : `/${next}`;
        return NextResponse.json({
            success: true,
            redirect: redirectTarget,
        });
    } catch (err) {
        console.error('[Confirm Session API] Erro inesperado ao confirmar sessão:', err);
        return NextResponse.json(
            { error: 'Erro interno ao processar confirmação de sessão' },
            { status: 500 }
        );
    }
}
