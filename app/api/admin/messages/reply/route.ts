import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/api/admin-auth';
import { sendEmail } from '@/lib/email';
import { ReplyEmailTemplate } from '@/components/emails/ReplyEmailTemplate';
import { NextResponse } from 'next/server';
import React from 'react';

export async function POST(req: Request) {
    const { isAdmin, user, response: authResponse } = await verifyAdmin();
    if (!isAdmin) return authResponse!;

    try {
        const body = await req.json();
        const { messageId, replyText } = body;

        if (!messageId || !replyText || replyText.trim().length < 5) {
            return NextResponse.json(
                { error: 'Parâmetros inválidos. A resposta deve ter pelo menos 5 caracteres.' },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        // 1. Fetch original message
        const { data: original, error: fetchError } = await (supabase
            .from('contact_messages') as any)
            .select('*')
            .eq('id', messageId)
            .single();

        if (fetchError || !original) {
            return NextResponse.json({ error: 'Mensagem original não encontrada' }, { status: 404 });
        }

        // 2. Send email via Resend
        const emailElement = React.createElement(ReplyEmailTemplate, {
            userName: original.name,
            originalMessage: original.message,
            replyText: replyText,
        });

        const { error: emailError } = await sendEmail({
            to: original.email,
            subject: `Resposta: ${original.subject}`,
            react: emailElement,
        });

        if (emailError) {
            console.error('Failed to send email via Resend:', emailError);
            return NextResponse.json({ error: 'Erro ao enviar o e-mail via Resend' }, { status: 500 });
        }

        // 3. Update message status in database
        const { error: updateError } = await (supabase
            .from('contact_messages') as any)
            .update({
                status: 'replied',
                reply_message: replyText,
                replied_at: new Date().toISOString(),
                replied_by: user!.id,
            })
            .eq('id', messageId);

        if (updateError) {
            console.error('Error updating contact message status:', updateError);
            return NextResponse.json(
                { error: 'E-mail enviado, mas houve um erro ao atualizar o status no banco de dados' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Unexpected error in contact reply API:', error);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
