/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/api/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const updateDealSchema = z.object({
    company_name: z.string().min(2).optional(),
    contact_name: z.string().min(2).optional(),
    contact_email: z.string().email().optional(),
    contact_website: z.string().optional().nullable(),
    ad_format: z.string().optional(),
    deal_stage: z.enum(['lead', 'proposal_sent', 'negotiating', 'won', 'lost']).optional(),
    deal_value: z.number().optional(),
    notes: z.string().optional().nullable(),
    start_date: z.string().optional().nullable(),
    end_date: z.string().optional().nullable(),
});

export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const { id } = await context.params;
        const body = await req.json();
        const parsed = updateDealSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Dados inválidos para atualização', details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        const updatePayload: Record<string, any> = {
            ...parsed.data,
            updated_at: new Date().toISOString()
        };

        if (parsed.data.contact_email) {
            updatePayload.contact_email = parsed.data.contact_email.toLowerCase().trim();
        }

        const { data: updatedDeal, error } = await (supabase
            .from('crm_deals') as any)
            .update(updatePayload)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating crm deal:', error);
            return NextResponse.json({ error: 'Erro ao atualizar oportunidade' }, { status: 500 });
        }

        return NextResponse.json({ deal: updatedDeal });
    } catch (error) {
        console.error('Error in PATCH /api/admin/crm/deals/[id]:', error);
        return NextResponse.json({ error: 'Erro interno ao atualizar oportunidade' }, { status: 500 });
    }
}

export async function DELETE(
    _req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const { id } = await context.params;
        const supabase = createAdminClient();

        const { error } = await (supabase
            .from('crm_deals') as any)
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting crm deal:', error);
            return NextResponse.json({ error: 'Erro ao remover oportunidade' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in DELETE /api/admin/crm/deals/[id]:', error);
        return NextResponse.json({ error: 'Erro interno ao remover oportunidade' }, { status: 500 });
    }
}
