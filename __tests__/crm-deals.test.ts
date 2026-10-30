import { describe, it, expect } from 'vitest';
import { parseSponsorshipMessage, DEAL_STAGES, AD_FORMATS } from '@/lib/crm/deals';

describe('CRM Deals & Sponsorship Logic', () => {
    it('defines 5 standard sales stages with colors and labels', () => {
        expect(DEAL_STAGES).toHaveLength(5);
        const stageIds = DEAL_STAGES.map(s => s.id);
        expect(stageIds).toEqual(['lead', 'proposal_sent', 'negotiating', 'won', 'lost']);
    });

    it('defines valid advertising formats for DevThru', () => {
        expect(AD_FORMATS.length).toBeGreaterThanOrEqual(4);
        const formatIds = AD_FORMATS.map(f => f.id);
        expect(formatIds).toContain('banner-ferramentas');
        expect(formatIds).toContain('patrocinio-newsletter');
    });

    it('correctly parses structured message from /anuncie into deal data', () => {
        const fullMessage = `
Empresa: TechFin do Brasil
Site: https://techfin.com.br
Contato: Carlos Silva (carlos@techfin.com.br)
Formato de Interesse: banner-ferramentas

Mensagem / Proposta:
Gostaríamos de anunciar no topo das ferramentas fiscais durante o mês de novembro.
        `.trim();

        const deal = parseSponsorshipMessage('Carlos Silva', 'carlos@techfin.com.br', fullMessage);

        expect(deal.company_name).toBe('TechFin do Brasil');
        expect(deal.contact_name).toBe('Carlos Silva');
        expect(deal.contact_email).toBe('carlos@techfin.com.br');
        expect(deal.contact_website).toBe('https://techfin.com.br');
        expect(deal.ad_format).toBe('banner-ferramentas');
        expect(deal.deal_stage).toBe('lead');
        expect(deal.deal_value).toBe(0);
        expect(deal.notes).toContain('Gostaríamos de anunciar');
    });

    it('falls back to contact name if company is not informed', () => {
        const message = `
Empresa: Não informada
Site: Não informado
Contato: Ana Souza (ana@dev.com)
Formato de Interesse: combo-completo

Mensagem / Proposta:
Olá, quanto custa anunciar na newsletter?
        `.trim();

        const deal = parseSponsorshipMessage('Ana Souza', 'ana@dev.com', message);

        expect(deal.company_name).toBe('Ana Souza');
        expect(deal.contact_website).toBeNull();
        expect(deal.ad_format).toBe('combo-completo');
    });
});
