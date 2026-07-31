import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { WelcomeEmailTemplate } from '@/components/emails/WelcomeEmailTemplate';
import React from 'react';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
        const supabase = await createClient();
        const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (!error && session && session.user) {
            const user = session.user;
            const userEmail = user.email;
            const userId = user.id;
            const userName = user.user_metadata?.full_name || 'Desenvolvedor';

            // Processar o envio de boas-vindas aguardando a finalização da requisição do Resend
            // antes de realizar o redirecionamento (evita o congelamento do processo no Vercel Serverless)
            try {
                const adminSupabase = createAdminClient();
                
                // Buscar status de envio de boas-vindas
                const { data: profile, error: fetchErr } = await (adminSupabase
                    .from('profiles') as any)
                    .select('welcome_sent')
                    .eq('id', userId)
                    .maybeSingle();

                if (!fetchErr && (!profile || !profile.welcome_sent)) {
                    const emailElement = React.createElement(WelcomeEmailTemplate, {
                        userName: userName,
                    });

                    const { error: emailError } = await sendEmail({
                        to: userEmail!,
                        subject: 'Bem-vindo ao DevThru! 🚀',
                        react: emailElement,
                    });

                    if (!emailError) {
                        // Marcar como enviado no banco de dados
                        await (adminSupabase
                            .from('profiles') as any)
                            .update({ welcome_sent: true } as any)
                            .eq('id', userId);
                        
                        console.log(`E-mail de boas-vindas enviado com sucesso para ${userEmail}`);
                    } else {
                        console.error('Falha ao enviar e-mail de boas-vindas:', emailError);
                    }
                }
            } catch (welcomeErr) {
                console.error('Erro inesperado no envio de e-mail de boas-vindas:', welcomeErr);
            }

            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=auth-code-error`);
}
