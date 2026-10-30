/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email';
import { buildUnsubscribeUrl, normalizeEmail, verifyUnsubscribeToken } from '@/lib/newsletter/unsubscribe-token';
import { UnsubscribeConfirmEmailTemplate } from '@/components/emails/UnsubscribeConfirmEmailTemplate';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import React from 'react';

const unsubscribeSchema = z.object({
    email: z.string().email(),
    token: z.string().optional(),
});

export async function POST(req: NextRequest) {
    try {
        const parsed = unsubscribeSchema.safeParse(await req.json());

        if (!parsed.success) {
            return NextResponse.json({ error: 'E-mail inválido' }, { status: 400 });
        }

        const email = normalizeEmail(parsed.data.email);
        const { token } = parsed.data;
        const supabase = createAdminClient();

        // Links antigos não têm token: confirmamos a posse do e-mail antes de descadastrar
        if (!token || !verifyUnsubscribeToken(email, token)) {
            if (!process.env.UNSUBSCRIBE_SECRET) {
                console.error('UNSUBSCRIBE_SECRET não configurado');
                return NextResponse.json({ error: 'Descadastro indisponível no momento' }, { status: 503 });
            }

            const { data: profile } = await (supabase.from('profiles') as any)
                .select('id')
                .eq('email', email)
                .maybeSingle();

            const { data: subscriber } = await (supabase.from('newsletter_subscribers') as any)
                .select('id')
                .eq('email', email)
                .maybeSingle();

            if (profile || subscriber) {
                await sendEmail({
                    to: email,
                    subject: 'Confirme o cancelamento dos e-mails do DevThru',
                    react: React.createElement(UnsubscribeConfirmEmailTemplate, {
                        confirmUrl: buildUnsubscribeUrl(email),
                    }),
                });
            }

            // Mesma resposta para e-mail conhecido ou não, para não revelar quem está na base
            return NextResponse.json({ success: true, confirmationRequired: true });
        }

        const { error: profileError } = await (supabase.from('profiles') as any)
            .update({ newsletter_subscribed: false })
            .eq('email', email);

        const { error: subscriberError } = await (supabase.from('newsletter_subscribers') as any)
            .update({ active: false, unsubscribed_at: new Date().toISOString() })
            .eq('email', email);

        if (profileError || subscriberError) {
            console.error('Erro ao cancelar assinatura de newsletter:', profileError || subscriberError);
            return NextResponse.json({ error: 'Erro de banco de dados' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Erro inesperado no descadastro de newsletter:', err);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
