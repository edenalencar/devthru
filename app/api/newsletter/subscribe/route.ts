/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const subscribeSchema = z.object({
    email: z.string().email('E-mail inválido'),
    source: z.string().optional().default('website'),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = subscribeSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Por favor, informe um e-mail válido.' },
                { status: 400 }
            );
        }

        const normalizedEmail = parsed.data.email.toLowerCase().trim();
        const source = parsed.data.source || 'website';

        const supabase = createAdminClient();

        // 1. Inserir ou atualizar na tabela de newsletter_subscribers
        try {
            await (supabase.from('newsletter_subscribers') as any)
                .upsert(
                    {
                        email: normalizedEmail,
                        source,
                        active: true,
                        unsubscribed_at: null,
                    },
                    { onConflict: 'email' }
                );
        } catch (dbErr) {
            console.warn('Erro ao inserir em newsletter_subscribers:', dbErr);
        }

        // 2. Se o usuário já tiver perfil cadastrado no Supabase, marcar newsletter_subscribed = true
        try {
            await (supabase.from('profiles') as any)
                .update({ newsletter_subscribed: true })
                .eq('email', normalizedEmail);
        } catch (profileErr) {
            console.warn('Aviso ao sincronizar newsletter no perfil:', profileErr);
        }

        return NextResponse.json({
            success: true,
            message: 'Inscrição confirmada com sucesso! Você receberá novidades e atualizações do DevThru.'
        });
    } catch (error) {
        console.error('Erro na rota de inscrição de newsletter:', error);
        return NextResponse.json(
            { error: 'Erro ao processar inscrição. Tente novamente mais tarde.' },
            { status: 500 }
        );
    }
}
