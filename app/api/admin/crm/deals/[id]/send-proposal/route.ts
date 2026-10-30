/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyAdmin } from '@/lib/api/admin-auth';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { SponsorshipProposalEmailTemplate } from '@/components/emails/SponsorshipProposalEmailTemplate';
import React from 'react';

export async function POST(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { isAdmin, response } = await verifyAdmin();
    if (!isAdmin) return response!;

    try {
        const { id } = await context.params;
        const body = await req.json().catch(() => ({}));
        const customMessage = body.customMessage?.trim() || '';

        const supabase = createAdminClient();

        const { data: deal, error: dealError } = await (supabase
            .from('crm_deals') as any)
            .select('*')
            .eq('id', id)
            .single();

        if (dealError || !deal) {
            return NextResponse.json({ error: 'Oportunidade não encontrada' }, { status: 404 });
        }

        // 1. Disparar e-mail com a proposta comercial
        const emailElement = React.createElement(SponsorshipProposalEmailTemplate, {
            contactName: deal.contact_name,
            companyName: deal.company_name,
            adFormat: deal.ad_format,
            customMessage: customMessage || undefined,
        });

        const { error: emailError } = await sendEmail({
            to: deal.contact_email,
            subject: `Proposta Comercial & Mídia Kit DevThru - ${deal.company_name}`,
            react: emailElement,
        });

        if (emailError) {
            console.error('Falha ao enviar proposta comercial via Resend:', emailError);
            return NextResponse.json({ error: 'Erro ao enviar e-mail via Resend' }, { status: 500 });
        }

        // 2. Atualizar estágio para proposal_sent (se ainda for lead) e registrar no histórico
        const updatedNotes = deal.notes
            ? `${deal.notes}\n\n[${new Date().toLocaleString('pt-BR')}] Proposta Comercial enviada via e-mail.`
            : `[${new Date().toLocaleString('pt-BR')}] Proposta Comercial enviada via e-mail.`;

        const newStage = deal.deal_stage === 'lead' ? 'proposal_sent' : deal.deal_stage;

        const { data: updatedDeal, error: updateError } = await (supabase
            .from('crm_deals') as any)
            .update({
                deal_stage: newStage,
                notes: updatedNotes,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (updateError) {
            console.warn('E-mail enviado, mas houve erro ao atualizar estágio do deal:', updateError);
        }

        return NextResponse.json({
            success: true,
            deal: updatedDeal || deal,
            message: 'Proposta comercial enviada com sucesso!'
        });
    } catch (error) {
        console.error('Erro ao enviar proposta:', error);
        return NextResponse.json({ error: 'Erro interno ao processar envio de proposta' }, { status: 500 });
    }
}
