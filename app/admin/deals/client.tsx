"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Search,
    Send,
    Plus,
    LayoutGrid,
    List,
    Globe,
    Mail,
    Trash2,
    Edit3
} from 'lucide-react';
import { toast } from 'sonner';
import { Deal, DealStage, DEAL_STAGES, AD_FORMATS } from '@/lib/crm/deals';

export function AdminDealsClient() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
    const [searchTerm, setSearchTerm] = useState('');
    const [formatFilter, setFormatFilter] = useState('all');

    // Modais
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isProposalOpen, setIsProposalOpen] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

    // Formulário de criação/edição
    const [formData, setFormData] = useState({
        company_name: '',
        contact_name: '',
        contact_email: '',
        contact_website: '',
        ad_format: 'banner-ferramentas',
        deal_stage: 'lead' as DealStage,
        deal_value: 0,
        notes: '',
        start_date: '',
        end_date: '',
    });

    // Formulário de envio de proposta
    const [proposalNote, setProposalNote] = useState('');
    const [sendingProposal, setSendingProposal] = useState(false);

    const loadDeals = async () => {
        try {
            const res = await fetch('/api/admin/crm/deals');
            if (!res.ok) throw new Error();
            const data = await res.json();
            setDeals(data.deals || []);
        } catch (err) {
            console.error(err);
            toast.error('Erro ao carregar oportunidades de patrocínio');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDeals();
    }, []);

    useEffect(() => {
        let result = [...deals];

        if (formatFilter !== 'all') {
            result = result.filter(d => d.ad_format === formatFilter);
        }

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                d =>
                    d.company_name.toLowerCase().includes(term) ||
                    d.contact_name.toLowerCase().includes(term) ||
                    d.contact_email.toLowerCase().includes(term) ||
                    (d.notes && d.notes.toLowerCase().includes(term))
            );
        }

        setFilteredDeals(result);
    }, [deals, searchTerm, formatFilter]);

    // Atualizar estágio rápido
    const handleUpdateStage = async (dealId: string, newStage: DealStage) => {
        try {
            const res = await fetch(`/api/admin/crm/deals/${dealId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deal_stage: newStage }),
            });

            if (!res.ok) throw new Error();
            const data = await res.json();

            setDeals(prev => prev.map(d => (d.id === dealId ? data.deal : d)));
            toast.success(`Estágio alterado para "${DEAL_STAGES.find(s => s.id === newStage)?.label}"`);
        } catch {
            toast.error('Erro ao alterar estágio da oportunidade');
        }
    };

    // Criar nova oportunidade
    const handleCreateDeal = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin/crm/deals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error();
            const data = await res.json();

            setDeals(prev => [data.deal, ...prev]);
            setIsCreateOpen(false);
            toast.success('Oportunidade adicionada com sucesso!');
        } catch {
            toast.error('Erro ao criar oportunidade');
        }
    };

    // Salvar edição
    const handleEditDeal = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDeal) return;

        try {
            const res = await fetch(`/api/admin/crm/deals/${selectedDeal.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error();
            const data = await res.json();

            setDeals(prev => prev.map(d => (d.id === selectedDeal.id ? data.deal : d)));
            setIsEditOpen(false);
            toast.success('Oportunidade atualizada!');
        } catch {
            toast.error('Erro ao atualizar oportunidade');
        }
    };

    // Excluir oportunidade
    const handleDeleteDeal = async (dealId: string) => {
        if (!confirm('Deseja realmente remover esta oportunidade?')) return;

        try {
            const res = await fetch(`/api/admin/crm/deals/${dealId}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error();
            setDeals(prev => prev.filter(d => d.id !== dealId));
            toast.success('Oportunidade removida');
        } catch {
            toast.error('Erro ao remover oportunidade');
        }
    };

    // Disparar proposta
    const handleSendProposal = async () => {
        if (!selectedDeal) return;
        setSendingProposal(true);

        try {
            const res = await fetch(`/api/admin/crm/deals/${selectedDeal.id}/send-proposal`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customMessage: proposalNote }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Falha no envio');

            setDeals(prev => prev.map(d => (d.id === selectedDeal.id ? data.deal : d)));
            setIsProposalOpen(false);
            setProposalNote('');
            toast.success('Proposta comercial enviada com sucesso via Resend!');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Erro ao enviar proposta comercial';
            toast.error(message);
        } finally {
            setSendingProposal(false);
        }
    };

    // Abrir modal de edição
    const openEditModal = (deal: Deal) => {
        setSelectedDeal(deal);
        setFormData({
            company_name: deal.company_name,
            contact_name: deal.contact_name,
            contact_email: deal.contact_email,
            contact_website: deal.contact_website || '',
            ad_format: deal.ad_format,
            deal_stage: deal.deal_stage,
            deal_value: deal.deal_value || 0,
            notes: deal.notes || '',
            start_date: deal.start_date || '',
            end_date: deal.end_date || '',
        });
        setIsEditOpen(true);
    };

    // Cálculos de KPIs
    const totalPipelineValue = deals
        .filter(d => d.deal_stage !== 'lost')
        .reduce((acc, curr) => acc + Number(curr.deal_value || 0), 0);

    const wonValue = deals
        .filter(d => d.deal_stage === 'won')
        .reduce((acc, curr) => acc + Number(curr.deal_value || 0), 0);

    const totalWon = deals.filter(d => d.deal_stage === 'won').length;
    const totalActiveLeads = deals.filter(d => d.deal_stage === 'lead' || d.deal_stage === 'proposal_sent' || d.deal_stage === 'negotiating').length;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#135bec] border-r-transparent"></div>
                <p className="text-sm text-[#4c669a]">Carregando pipeline de patrocínios...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#0d121b]">Pipeline de Patrocínios</h1>
                    <p className="text-sm text-[#4c669a] mt-1">
                        Gerencie propostas, negociações e cotas publicitárias de empresas no DevThru.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#e2e6ea] rounded-lg bg-white p-1">
                        <Button
                            variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('kanban')}
                            className="h-8 px-3"
                        >
                            <LayoutGrid className="h-4 w-4 mr-1.5" />
                            Kanban
                        </Button>
                        <Button
                            variant={viewMode === 'table' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('table')}
                            className="h-8 px-3"
                        >
                            <List className="h-4 w-4 mr-1.5" />
                            Tabela
                        </Button>
                    </div>
                    <Button
                        onClick={() => {
                            setFormData({
                                company_name: '',
                                contact_name: '',
                                contact_email: '',
                                contact_website: '',
                                ad_format: 'banner-ferramentas',
                                deal_stage: 'lead',
                                deal_value: 0,
                                notes: '',
                                start_date: '',
                                end_date: '',
                            });
                            setIsCreateOpen(true);
                        }}
                        className="bg-[#135bec] hover:bg-[#104ec8] text-white"
                    >
                        <Plus className="h-4 w-4 mr-1.5" />
                        Nova Oportunidade
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-white border-[#e2e6ea]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-[#4c669a] uppercase">Pipeline Aberto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#0d121b]">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPipelineValue)}
                        </div>
                        <p className="text-xs text-[#4c669a] mt-1">{totalActiveLeads} oportunidades ativas</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-emerald-600 uppercase">Faturamento Fechado</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(wonValue)}
                        </div>
                        <p className="text-xs text-[#4c669a] mt-1">{totalWon} contratos fechados</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-[#4c669a] uppercase">Total de Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#0d121b]">{deals.length}</div>
                        <p className="text-xs text-[#4c669a] mt-1">Registrados no /anuncie</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-[#4c669a] uppercase">Taxa de Conversão</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#0d121b]">
                            {deals.length > 0 ? `${((totalWon / deals.length) * 100).toFixed(1)}%` : '0%'}
                        </div>
                        <p className="text-xs text-[#4c669a] mt-1">Won / Total de Oportunidades</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4c669a]" />
                    <Input
                        placeholder="Buscar por empresa, contato ou e-mail..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-9 bg-white border-[#e2e6ea]"
                    />
                </div>
                <Select value={formatFilter} onValueChange={setFormatFilter}>
                    <SelectTrigger className="w-full sm:w-[240px] bg-white border-[#e2e6ea]">
                        <SelectValue placeholder="Formato de Anúncio" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos os Formatos</SelectItem>
                        {AD_FORMATS.map(f => (
                            <SelectItem key={f.id} value={f.id}>
                                {f.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Kanban View */}
            {viewMode === 'kanban' ? (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                    {DEAL_STAGES.map(stage => {
                        const stageDeals = filteredDeals.filter(d => d.deal_stage === stage.id);
                        const stageTotal = stageDeals.reduce((sum, d) => sum + Number(d.deal_value || 0), 0);

                        return (
                            <div key={stage.id} className="bg-[#eef2f6] rounded-xl p-3 flex flex-col min-h-[500px]">
                                {/* Stage Header */}
                                <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#dce2ea]">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-xs text-[#0d121b]">{stage.label}</span>
                                        <Badge variant="secondary" className="text-[11px] px-1.5 py-0 h-5">
                                            {stageDeals.length}
                                        </Badge>
                                    </div>
                                    <span className="text-[11px] font-semibold text-[#4c669a]">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(stageTotal)}
                                    </span>
                                </div>

                                {/* Cards List */}
                                <div className="space-y-3 flex-1 overflow-y-auto">
                                    {stageDeals.map(deal => (
                                        <Card key={deal.id} className="bg-white border-[#e2e6ea] shadow-sm hover:shadow transition-all">
                                            <CardContent className="p-3.5 space-y-2.5">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <h4 className="font-bold text-sm text-[#0d121b] leading-tight">
                                                            {deal.company_name}
                                                        </h4>
                                                        <p className="text-xs text-[#4c669a] mt-0.5">{deal.contact_name}</p>
                                                    </div>
                                                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(deal.deal_value || 0)}
                                                    </span>
                                                </div>

                                                <div className="text-[11px] text-[#4c669a] flex items-center gap-1.5">
                                                    <Mail className="h-3 w-3 shrink-0" />
                                                    <span className="truncate">{deal.contact_email}</span>
                                                </div>

                                                {deal.contact_website && (
                                                    <div className="text-[11px] text-[#135bec] flex items-center gap-1.5">
                                                        <Globe className="h-3 w-3 shrink-0" />
                                                        <a
                                                            href={deal.contact_website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="truncate hover:underline"
                                                        >
                                                            {deal.contact_website.replace(/^https?:\/\//, '')}
                                                        </a>
                                                    </div>
                                                )}

                                                <div className="pt-1 flex flex-wrap gap-1">
                                                    <Badge variant="outline" className="text-[10px] text-[#4c669a] bg-[#f8fafc]">
                                                        {AD_FORMATS.find(f => f.id === deal.ad_format)?.label || deal.ad_format}
                                                    </Badge>
                                                </div>

                                                {/* Actions */}
                                                <div className="pt-2 border-t border-[#f1f5f9] flex items-center justify-between gap-1">
                                                    <Select
                                                        value={deal.deal_stage}
                                                        onValueChange={val => handleUpdateStage(deal.id, val as DealStage)}
                                                    >
                                                        <SelectTrigger className="h-7 text-[11px] w-[130px] bg-[#f8fafc]">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {DEAL_STAGES.map(s => (
                                                                <SelectItem key={s.id} value={s.id} className="text-xs">
                                                                    {s.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>

                                                    <div className="flex items-center gap-1">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-7 w-7 p-0 text-[#135bec] hover:bg-blue-50"
                                                            title="Enviar Proposta Comercial via E-mail"
                                                            onClick={() => {
                                                                setSelectedDeal(deal);
                                                                setProposalNote('');
                                                                setIsProposalOpen(true);
                                                            }}
                                                        >
                                                            <Send className="h-3.5 w-3.5" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-7 w-7 p-0 text-[#4c669a] hover:bg-slate-100"
                                                            title="Editar Oportunidade"
                                                            onClick={() => openEditModal(deal)}
                                                        >
                                                            <Edit3 className="h-3.5 w-3.5" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-7 w-7 p-0 text-red-500 hover:bg-red-50"
                                                            title="Excluir Oportunidade"
                                                            onClick={() => handleDeleteDeal(deal.id)}
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}

                                    {stageDeals.length === 0 && (
                                        <div className="text-center py-8 text-xs text-[#94a3b8] border-2 border-dashed border-[#dce2ea] rounded-lg">
                                            Nenhuma oportunidade
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Table View */
                <Card className="bg-white border-[#e2e6ea]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-[#0d121b]">
                            <thead className="bg-[#f8fafc] text-xs uppercase font-semibold text-[#4c669a] border-b border-[#e2e6ea]">
                                <tr>
                                    <th className="px-4 py-3">Empresa</th>
                                    <th className="px-4 py-3">Contato</th>
                                    <th className="px-4 py-3">Formato</th>
                                    <th className="px-4 py-3">Estágio</th>
                                    <th className="px-4 py-3">Valor</th>
                                    <th className="px-4 py-3 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2e6ea]">
                                {filteredDeals.map(deal => (
                                    <tr key={deal.id} className="hover:bg-[#f8fafc]">
                                        <td className="px-4 py-3 font-semibold">
                                            {deal.company_name}
                                            {deal.contact_website && (
                                                <a
                                                    href={deal.contact_website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block text-xs font-normal text-[#135bec] hover:underline"
                                                >
                                                    {deal.contact_website.replace(/^https?:\/\//, '')}
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div>{deal.contact_name}</div>
                                            <div className="text-xs text-[#4c669a]">{deal.contact_email}</div>
                                        </td>
                                        <td className="px-4 py-3 text-xs">
                                            {AD_FORMATS.find(f => f.id === deal.ad_format)?.label || deal.ad_format}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge
                                                variant="outline"
                                                className={`text-xs ${DEAL_STAGES.find(s => s.id === deal.deal_stage)?.color}`}
                                            >
                                                {DEAL_STAGES.find(s => s.id === deal.deal_stage)?.label}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 font-bold text-emerald-600">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(deal.deal_value || 0)}
                                        </td>
                                        <td className="px-4 py-3 text-right space-x-1">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 text-xs"
                                                onClick={() => {
                                                    setSelectedDeal(deal);
                                                    setProposalNote('');
                                                    setIsProposalOpen(true);
                                                }}
                                            >
                                                <Send className="h-3.5 w-3.5 mr-1 text-[#135bec]" />
                                                Proposta
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 text-xs"
                                                onClick={() => openEditModal(deal)}
                                            >
                                                Editar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Modal: Criar Oportunidade */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle>Nova Oportunidade de Patrocínio</DialogTitle>
                        <DialogDescription>
                            Cadastre manualmente uma nova empresa interessada em anunciar no DevThru.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateDeal} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-[#4c669a]">Empresa *</label>
                                <Input
                                    required
                                    value={formData.company_name}
                                    onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                                    placeholder="Ex: Nubank, AWS"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#4c669a]">Site</label>
                                <Input
                                    value={formData.contact_website}
                                    onChange={e => setFormData({ ...formData, contact_website: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-[#4c669a]">Nome do Contato *</label>
                                <Input
                                    required
                                    value={formData.contact_name}
                                    onChange={e => setFormData({ ...formData, contact_name: e.target.value })}
                                    placeholder="Ex: Roberto"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#4c669a]">E-mail *</label>
                                <Input
                                    required
                                    type="email"
                                    value={formData.contact_email}
                                    onChange={e => setFormData({ ...formData, contact_email: e.target.value })}
                                    placeholder="contato@empresa.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-[#4c669a]">Formato</label>
                                <Select
                                    value={formData.ad_format}
                                    onValueChange={val => setFormData({ ...formData, ad_format: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AD_FORMATS.map(f => (
                                            <SelectItem key={f.id} value={f.id}>
                                                {f.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#4c669a]">Valor Estimado (R$)</label>
                                <Input
                                    type="number"
                                    value={formData.deal_value}
                                    onChange={e => setFormData({ ...formData, deal_value: Number(e.target.value) })}
                                    placeholder="1500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-[#4c669a]">Anotações / Contexto</label>
                            <Textarea
                                rows={3}
                                value={formData.notes}
                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Notas da conversa, requisitos técnicos ou preferências de data..."
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" className="bg-[#135bec] hover:bg-[#104ec8] text-white">
                                Salvar Oportunidade
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Modal: Editar Oportunidade */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle>Editar Oportunidade: {selectedDeal?.company_name}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditDeal} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-[#4c669a]">Empresa</label>
                                <Input
                                    required
                                    value={formData.company_name}
                                    onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#4c669a]">Valor da Cota (R$)</label>
                                <Input
                                    type="number"
                                    value={formData.deal_value}
                                    onChange={e => setFormData({ ...formData, deal_value: Number(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-[#4c669a]">Estágio</label>
                                <Select
                                    value={formData.deal_stage}
                                    onValueChange={val => setFormData({ ...formData, deal_stage: val as DealStage })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DEAL_STAGES.map(s => (
                                            <SelectItem key={s.id} value={s.id}>
                                                {s.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#4c669a]">Formato</label>
                                <Select
                                    value={formData.ad_format}
                                    onValueChange={val => setFormData({ ...formData, ad_format: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {AD_FORMATS.map(f => (
                                            <SelectItem key={f.id} value={f.id}>
                                                {f.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-[#4c669a]">Início Veiculação</label>
                                <Input
                                    type="date"
                                    value={formData.start_date}
                                    onChange={e => setFormData({ ...formData, start_date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#4c669a]">Fim Veiculação</label>
                                <Input
                                    type="date"
                                    value={formData.end_date}
                                    onChange={e => setFormData({ ...formData, end_date: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-[#4c669a]">Histórico / Anotações</label>
                            <Textarea
                                rows={4}
                                value={formData.notes}
                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" className="bg-[#135bec] hover:bg-[#104ec8] text-white">
                                Atualizar
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Modal: Enviar Proposta Comercial / Mídia Kit */}
            <Dialog open={isProposalOpen} onOpenChange={setIsProposalOpen}>
                <DialogContent className="max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle>Enviar Proposta Comercial</DialogTitle>
                        <DialogDescription>
                            Dispare o e-mail oficial com o Mídia Kit do DevThru para <strong>{selectedDeal?.contact_email}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e6ea] text-xs text-[#334155] space-y-1">
                            <div><strong>Empresa:</strong> {selectedDeal?.company_name}</div>
                            <div><strong>Contato:</strong> {selectedDeal?.contact_name}</div>
                            <div><strong>Formato:</strong> {AD_FORMATS.find(f => f.id === selectedDeal?.ad_format)?.label || selectedDeal?.ad_format}</div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-[#4c669a]">Mensagem Personalizada ou Condições Especiais (Opcional):</label>
                            <Textarea
                                rows={4}
                                value={proposalNote}
                                onChange={e => setProposalNote(e.target.value)}
                                placeholder="Ex: Olá Roberto, conforme conversamos, se fecharmos o banner para o mês de novembro, incluímos 1 menção gratuita na newsletter semanal..."
                                className="mt-1"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsProposalOpen(false)} disabled={sendingProposal}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSendProposal}
                            disabled={sendingProposal}
                            className="bg-[#135bec] hover:bg-[#104ec8] text-white"
                        >
                            {sendingProposal ? 'Enviando via Resend...' : 'Enviar Proposta Agora'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
