import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/api/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const supabase = createAdminClient();

        // 1. Fetch feedbacks
        const { data: feedbacks, error } = await (supabase
            .from('tool_feedbacks') as any)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Database query error for tool_feedbacks:', error);
            return NextResponse.json({ feedbacks: [] });
        }

        if (!feedbacks || feedbacks.length === 0) {
            return NextResponse.json({ feedbacks: [] });
        }

        // 2. Extract unique user IDs to fetch profile data
        const userIds = Array.from(
            new Set(
                feedbacks
                    .map((f: any) => f.user_id)
                    .filter((id: any): id is string => Boolean(id))
            )
        );

        let userMap: Record<string, { email: string; full_name: string | null; avatar_url: string | null }> = {};

        if (userIds.length > 0) {
            const { data: profiles } = await (supabase
                .from('profiles') as any)
                .select('id, email, full_name, avatar_url')
                .in('id', userIds);

            if (profiles) {
                userMap = profiles.reduce((acc: any, curr: any) => {
                    acc[curr.id] = {
                        email: curr.email,
                        full_name: curr.full_name,
                        avatar_url: curr.avatar_url,
                    };
                    return acc;
                }, {});
            }
        }

        // 3. Enrich feedbacks with profile data
        const enrichedFeedbacks = feedbacks.map((f: any) => ({
            ...f,
            user: f.user_id ? userMap[f.user_id] || null : null,
        }));

        return NextResponse.json({ feedbacks: enrichedFeedbacks });
    } catch (error) {
        console.error('Error fetching admin feedbacks:', error);
        return NextResponse.json({ error: 'Erro ao buscar feedbacks' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const { searchParams } = new URL(request.url);
        let id = searchParams.get('id');

        if (!id) {
            try {
                const body = await request.json();
                id = body.id;
            } catch {
                // No JSON body
            }
        }

        if (!id) {
            return NextResponse.json({ error: 'ID do feedback não informado' }, { status: 400 });
        }

        const supabase = createAdminClient();

        const { error } = await (supabase
            .from('tool_feedbacks') as any)
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting feedback:', error);
            throw error;
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        return NextResponse.json({ error: 'Erro ao excluir feedback' }, { status: 500 });
    }
}
