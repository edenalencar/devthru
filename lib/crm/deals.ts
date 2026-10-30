export type DealStage = 'lead' | 'proposal_sent' | 'negotiating' | 'won' | 'lost';

export interface Deal {
    id: string;
    contact_message_id?: string | null;
    company_name: string;
    contact_name: string;
    contact_email: string;
    contact_website?: string | null;
    ad_format: string;
    deal_stage: DealStage;
    deal_value: number;
    notes?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    created_at: string;
    updated_at: string;
}

export const DEAL_STAGES: { id: DealStage; label: string; color: string; description: string }[] = [
    {
        id: 'lead',
        label: 'Novo Lead',
        color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
        description: 'Proposta recebida pela página /anuncie ou formulário de contato'
    },
    {
        id: 'proposal_sent',
        label: 'Proposta Enviada',
        color: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
        description: 'Mídia Kit e valores enviados ao patrocinador'
    },
    {
        id: 'negotiating',
        label: 'Em Negociação',
        color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
        description: 'Alinhando formatos, datas de veiculação e valores'
    },
    {
        id: 'won',
        label: 'Fechado / Ativo',
        color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
        description: 'Patrocínio fechado, pagamento aprovado e anúncio em veiculação'
    },
    {
        id: 'lost',
        label: 'Perdido',
        color: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
        description: 'Negociação não avançou ou patrocinador declinou'
    }
];

export const AD_FORMATS = [
    { id: 'banner-ferramentas', label: 'Banner Nativo nas Ferramentas' },
    { id: 'banner-home', label: 'Banner de Alta Visibilidade na Home' },
    { id: 'patrocinio-newsletter', label: 'Menção Patrocinada na Newsletter' },
    { id: 'combo-completo', label: 'Combo Completo (Ferramentas + Newsletter)' },
    { id: 'guia-patrocinado', label: 'Artigo / Guia Técnico Patrocinado' }
];

/**
 * Extrai dados estruturados de um contato de patrocínio
 */
export function parseSponsorshipMessage(name: string, email: string, message: string) {
    let company = name;
    let website: string | null = null;
    let format = 'banner-ferramentas';

    const companyMatch = message.match(/Empresa:\s*(.+)/i);
    if (companyMatch && companyMatch[1].trim() && companyMatch[1].trim() !== 'Não informada') {
        company = companyMatch[1].trim();
    }

    const websiteMatch = message.match(/Site:\s*(.+)/i);
    if (websiteMatch && websiteMatch[1].trim() && websiteMatch[1].trim() !== 'Não informado') {
        website = websiteMatch[1].trim();
    }

    const formatMatch = message.match(/Formato de Interesse:\s*(.+)/i);
    if (formatMatch && formatMatch[1].trim()) {
        format = formatMatch[1].trim();
    }

    return {
        company_name: company,
        contact_name: name,
        contact_email: email.toLowerCase().trim(),
        contact_website: website,
        ad_format: format,
        deal_stage: 'lead' as DealStage,
        deal_value: 0,
        notes: message
    };
}

