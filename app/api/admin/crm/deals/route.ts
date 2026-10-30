/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/api/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createDealSchema = z.object({
    company_name: z.string().min(2, 'Nome da empresa é obrigatório'),
    contact_name: z.string().min(2, 'Nome do contato é obrigatório'),
    contact_email: z.string().email('E-mail de contato inválido'),
    contact_website: z.string().optional().nullable(),
    ad_format: z.string().default('banner-ferramentas'),
    deal_stage: z.enum(['lead', 'proposal_sent', 'negotiating', 'won', 'lost']).default('lead'),
    deal_value: z.number().default(0),
    notes: z.string().optional().nullable(),
    start_date: z.string().optional().nullable(),
    end_date: z.string().optional().nullable(),
});

export async function GET() {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const supabase = createAdminClient();

        const { data: deals, error } = await (supabase
            .from('crm_deals') as any)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Database query error for crm_deals:', error);
            return NextResponse.json({ deals: [] });
        }

        return NextResponse.json({ deals: deals || [] });
    } catch (error) {
        console.error('Error fetching crm deals:', error);
        return NextResponse.json({ error: 'Erro ao buscar oportunidades do CRM' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const body = await req.json();
        const parsed = createDealSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Dados inválidos', details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        const { data: deal, error } = await (supabase
            .from('crm_deals') as any)
            .insert({
                ...parsed.data,
                contact_email: parsed.data.contact_email.toLowerCase().trim(),
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating crm deal:', error);
            return NextResponse.json({ error: 'Erro ao salvar oportunidade' }, { status: 500 });
        }

        return NextResponse.json({ deal }, { status: 201 });
    } catch (error) {
        console.error('Error creating deal:', error);
        return NextResponse.json({ error: 'Erro interno ao criar oportunidade' }, { status: 500 });
    }
}
