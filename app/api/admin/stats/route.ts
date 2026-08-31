import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/api/admin-auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const supabase = createAdminClient();

        // 1. Total users and breakdown by subscription tier
        const { data: profiles, error: profilesError } = await (supabase
            .from('profiles') as any)
            .select('subscription_tier');

        if (profilesError) throw profilesError;

        const totalUsers = profiles.length;
        let proUsers = 0;
        let businessUsers = 0;
        let freeUsers = 0;

        profiles.forEach((p: any) => {
            const tier = p.subscription_tier || 'free';
            if (tier === 'pro') proUsers++;
            else if (tier === 'enterprise' || tier === 'business') businessUsers++;
            else freeUsers++;
        });

        // 2. Count pending contact messages
        const { count: pendingMessages, error: messagesError } = await (supabase
            .from('contact_messages') as any)
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');

        const pendingCount = messagesError ? 0 : (pendingMessages || 0);

        // 3. Count total history generations
        const { count: totalGenerations, error: historyError } = await (supabase
            .from('generation_history') as any)
            .select('*', { count: 'exact', head: true });

        const generationsCount = historyError ? 0 : (totalGenerations || 0);

        // 4. Count total feedbacks and average rating
        const { data: feedbacks, error: feedbacksError } = await (supabase
            .from('tool_feedbacks') as any)
            .select('rating');

        const totalFeedbacks = feedbacksError || !feedbacks ? 0 : feedbacks.length;
        const averageRating =
            totalFeedbacks > 0
                ? Number((feedbacks!.reduce((acc: number, f: any) => acc + (f.rating || 0), 0) / totalFeedbacks).toFixed(1))
                : 0;

        return NextResponse.json({
            stats: {
                totalUsers,
                freeUsers,
                proUsers,
                businessUsers,
                pendingMessages: pendingCount,
                totalGenerations: generationsCount,
                totalFeedbacks,
                averageRating
            }
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return NextResponse.json({ error: 'Erro ao buscar estatísticas' }, { status: 500 });
    }
}
