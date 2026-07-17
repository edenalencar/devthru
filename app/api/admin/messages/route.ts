import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/api/admin-auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const supabase = createAdminClient();

        const { data: messages, error } = await (supabase
            .from('contact_messages') as any)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Database query error for contact_messages:', error);
            // If the table doesn't exist or has issues, return an empty array instead of failing
            return NextResponse.json({ messages: [] });
        }

        return NextResponse.json({ messages });
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        return NextResponse.json({ error: 'Erro ao buscar mensagens de contato' }, { status: 500 });
    }
}
