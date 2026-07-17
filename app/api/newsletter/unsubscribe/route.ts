import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'E-mail inválido' }, { status: 400 });
        }

        const supabase = createAdminClient();
        
        // Atualizar newsletter_subscribed para false
        const { error } = await (supabase
            .from('profiles') as any)
            .update({ newsletter_subscribed: false } as any)
            .eq('email', email.toLowerCase().trim());

        if (error) {
            console.error('Erro ao cancelar assinatura de newsletter:', error);
            return NextResponse.json({ error: 'Erro de banco de dados' }, { status: 500 });
        }

        console.log(`Assinatura de newsletter cancelada com sucesso para o e-mail: ${email}`);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Erro inesperado no descadastro de newsletter:', err);
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
    }
}
