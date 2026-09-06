/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/server';
import { sendWelcomeEmailIfNeeded } from '@/lib/email/welcome';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user || !user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userName = 
            user.user_metadata?.full_name || 
            user.user_metadata?.name || 
            user.user_metadata?.user_name || 
            user.user_metadata?.preferred_username || 
            'Desenvolvedor';

        const result = await sendWelcomeEmailIfNeeded({
            userId: user.id,
            userEmail: user.email,
            userName,
            supabaseClient: supabase,
        });

        if (!result.success && result.reason === 'gateway_error') {
            return NextResponse.json(
                { success: false, error: 'Falha no gateway de envio de e-mail' },
                { status: 500 }
            );
        }

        if (result.reason === 'already_sent') {
            return NextResponse.json({
                success: true,
                sent: false,
                message: 'E-mail de boas-vindas já foi enviado anteriormente.'
            });
        }

        return NextResponse.json({
            success: result.success,
            sent: result.sent,
        });

    } catch (err: any) {
        console.error('[Welcome API] Erro inesperado na rota de boas-vindas:', err);
        return NextResponse.json(
            { error: 'Erro interno ao processar e-mail de boas-vindas' },
            { status: 500 }
        );
    }
}

