import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/api/admin-auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const supabase = createAdminClient();

        const { data: users, error } = await (supabase
            .from('profiles') as any)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ users });
    } catch (error) {
        console.error('Error fetching admin users list:', error);
        return NextResponse.json({ error: 'Erro ao buscar lista de usuários' }, { status: 500 });
    }
}
