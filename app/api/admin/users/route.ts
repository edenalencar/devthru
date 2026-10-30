import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/api/admin-auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const supabase = createAdminClient();

        // 1. Buscar perfis de usuários
        const { data: users, error } = await (supabase
            .from('profiles') as any)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // 2. Buscar contagem de gerações por usuário
        const { data: generations } = await (supabase
            .from('generation_history') as any)
            .select('user_id');

        const generationCounts: Record<string, number> = {};
        if (generations) {
            for (const gen of generations) {
                if (gen.user_id) {
                    generationCounts[gen.user_id] = (generationCounts[gen.user_id] || 0) + 1;
                }
            }
        }

        const now = new Date();

        // 3. Enriquecer usuários com métricas 360° e estágio de ciclo de vida
        const enrichedUsers = (users || []).map((u: any) => {
            const count = generationCounts[u.id] || 0;
            let lifecycleStage = 'free_regular';

            const isPaid = u.subscription_tier === 'pro' || u.subscription_tier === 'business' || u.subscription_tier === 'enterprise';

            if (isPaid) {
                lifecycleStage = u.subscription_tier;
            } else if (u.trial_ends_at) {
                const trialEnd = new Date(u.trial_ends_at);
                if (trialEnd > now) {
                    lifecycleStage = 'trial_active';
                } else {
                    lifecycleStage = 'trial_expired';
                }
            } else if (count >= 30) {
                lifecycleStage = 'free_power';
            }

            return {
                ...u,
                generation_count: count,
                lifecycle_stage: lifecycleStage,
            };
        });

        return NextResponse.json({ users: enrichedUsers });
    } catch (error) {
        console.error('Error fetching admin users list:', error);
        return NextResponse.json({ error: 'Erro ao buscar lista de usuários' }, { status: 500 });
    }
}
