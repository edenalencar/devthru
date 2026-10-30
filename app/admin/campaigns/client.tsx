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
    CheckCircle2,
    Plus,
    AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';

interface Campaign {
    id: string;
    subject: string;
    target_segment: string;
    content: string;
    sent_count: number;
    status: string;
    sent_at: string;
    created_at: string;
}

interface Audience {
    totalNewsletter: number;
    proCount: number;
    businessCount: number;
    expiredTrialCount: number;
    freeCount: number;
}

const SEGMENT_LABELS: Record<string, { label: string; color: string; desc: string }> = {
    all_newsletter: {
        label: 'Toda a Newsletter',
        color: 'bg-blue-50 text-blue-700 border-blue-200',
        desc: 'Inscritos da newsletter + usuários com opt-in ativo'
    },
    pro_users: {
        label: 'Assinantes Pro',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        desc: 'Desenvolvedores com plano Pro ativo'
    },
    business_users: {
        label: 'Planos Business',
        color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        desc: 'Contas empresariais ativas'
    },
    expired_trials: {
        label: 'Trials Expirados',
        color: 'bg-amber-50 text-amber-700 border-amber-200',
        desc: 'Usuários cujo período de teste Pro acabou'
    },
    free_users: {
        label: 'Usuários Free',
        color: 'bg-slate-50 text-slate-700 border-slate-200',
        desc: 'Usuários cadastrados no plano gratuito'
    }
};

export function AdminCampaignsClient() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [audience, setAudience] = useState<Audience | null>(null);
    const [loading, setLoading] = useState(true);

    // Modal de Novo Disparo
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [sending, setSending] = useState(false);
    const [formData, setFormData] = useState({
        subject: '',
        target_segment: 'all_newsletter',
        content: '',
    });

    const loadData = async () => {
        try {
            const res = await fetch('/api/admin/crm/campaigns');
            if (!res.ok) throw new Error();
            const data = await res.json();
            setCampaigns(data.campaigns || []);
            setAudience(data.audience || null);
        } catch (err) {
            console.error(err);
            toast.error('Erro ao carregar dados de campanhas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSendCampaign = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.subject.trim().length < 3) {
            toast.error('Informe um assunto com pelo menos 3 caracteres');
            return;
        }
        if (formData.content.trim().length < 10) {
            toast.error('Escreva um conteúdo com pelo menos 10 caracteres');
            return;
        }

        if (!confirm(`Deseja realmente disparar esta campanha via Resend para o segmento "${SEGMENT_LABELS[formData.target_segment]?.label}"?`)) {
            return;
        }

        setSending(true);
        const toastId = toast.loading('Disparando campanha via Resend Batch...');

        try {
            const res = await fetch('/api/admin/crm/campaigns', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Falha no disparo');

            toast.success(data.message || 'Campanha disparada com sucesso!', { id: toastId });
            setIsCreateOpen(false);
            setFormData({
                subject: '',
                target_segment: 'all_newsletter',
                content: '',
            });
            await loadData();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Erro ao disparar campanha';
            toast.error(message, { id: toastId });
        } finally {
            setSending(false);
        }
    };

    const getEstimatedReach = (segment: string) => {
        if (!audience) return 0;
        if (segment === 'all_newsletter') return audience.totalNewsletter;
        if (segment === 'pro_users') return audience.proCount;
        if (segment === 'business_users') return audience.businessCount;
        if (segment === 'expired_trials') return audience.expiredTrialCount;
        if (segment === 'free_users') return audience.freeCount;
        return 0;
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#135bec] border-r-transparent"></div>
                <p className="text-sm text-[#4c669a]">Carregando CRM de audiência e campanhas...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#0d121b]">Audiência & Campanhas</h1>
                    <p className="text-sm text-[#4c669a] mt-1">
                        Gerencie listas de assinantes e envie comunicados segmentados via Resend.
                    </p>
                </div>
                <Button
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-[#135bec] hover:bg-[#104ec8] text-white"
                >
                    <Plus className="h-4 w-4 mr-1.5" />
                    Novo Disparo de Campanha
                </Button>
            </div>

            {/* Audience KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-white border-[#e2e6ea]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-[#135bec] uppercase">Audiência da Newsletter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#0d121b]">{audience?.totalNewsletter || 0}</div>
                        <p className="text-xs text-[#4c669a] mt-1">Inscritos ativos alcançáveis</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-emerald-600 uppercase">Assinantes Pagos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">
                            {(audience?.proCount || 0) + (audience?.businessCount || 0)}
                        </div>
                        <p className="text-xs text-[#4c669a] mt-1">{audience?.proCount || 0} Pro + {audience?.businessCount || 0} Business</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-amber-600 uppercase">Trials Expirados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-600">{audience?.expiredTrialCount || 0}</div>
                        <p className="text-xs text-[#4c669a] mt-1">Alvos para ofertas de upgrade</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-[#4c669a] uppercase">Usuários Free</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#0d121b]">{audience?.freeCount || 0}</div>
                        <p className="text-xs text-[#4c669a] mt-1">Base gratuita cadastrada</p>
                    </CardContent>
                </Card>
            </div>

            {/* Campaign History Table */}
            <Card className="bg-white border-[#e2e6ea]">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-[#0d121b]">Histórico de Disparos & Broadcasts</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-[#0d121b]">
                            <thead className="bg-[#f8fafc] text-xs uppercase font-semibold text-[#4c669a] border-b border-[#e2e6ea]">
                                <tr>
                                    <th className="px-4 py-3">Assunto da Mensagem</th>
                                    <th className="px-4 py-3">Segmento Alvo</th>
                                    <th className="px-4 py-3 text-center">Destinatários</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Data de Envio</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2e6ea]">
                                {campaigns.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-sm text-[#4c669a]">
                                            Nenhum disparo de campanha realizado ainda. Clique no botão acima para criar o primeiro.
                                        </td>
                                    </tr>
                                ) : (
                                    campaigns.map(camp => (
                                        <tr key={camp.id} className="hover:bg-[#f8fafc]">
                                            <td className="px-4 py-3 font-semibold text-[#0d121b]">
                                                {camp.subject}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${SEGMENT_LABELS[camp.target_segment]?.color || 'bg-slate-50'}`}
                                                >
                                                    {SEGMENT_LABELS[camp.target_segment]?.label || camp.target_segment}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-center font-bold text-slate-700">
                                                <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">
                                                    {camp.sent_count} envios
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1 w-fit">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    Enviado
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-[#4c669a]">
                                                {new Date(camp.sent_at || camp.created_at).toLocaleString('pt-BR')}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Modal: Novo Disparo */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-lg bg-white">
                    <DialogHeader>
                        <DialogTitle>Disparar Nova Campanha de E-mail</DialogTitle>
                        <DialogDescription>
                            Escreva e envie um broadcast oficial do DevThru diretamente pelo Resend.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSendCampaign} className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-[#4c669a]">Segmento de Destino *</label>
                            <Select
                                value={formData.target_segment}
                                onValueChange={val => setFormData({ ...formData, target_segment: val })}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(SEGMENT_LABELS).map(([key, item]) => (
                                        <SelectItem key={key} value={key}>
                                            {item.label} ({getEstimatedReach(key)} contatos)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-[11px] text-[#4c669a] mt-1">
                                {SEGMENT_LABELS[formData.target_segment]?.desc}
                            </p>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-[#4c669a]">Assunto do E-mail *</label>
                            <Input
                                required
                                value={formData.subject}
                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="Ex: 🚀 Novas ferramentas fiscais e melhorias no DevThru"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-[#4c669a]">Conteúdo da Mensagem *</label>
                            <Textarea
                                required
                                rows={7}
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Olá desenvolvedor,&#10;&#10;Estamos lançando hoje duas ferramentas muito pedidas pela comunidade...&#10;&#10;Separe os parágrafos com linhas em branco."
                                className="mt-1 font-sans text-sm"
                            />
                        </div>

                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>
                                <strong>Atenção:</strong> O disparo será enviado imediatamente para aproximadamente{' '}
                                <strong>{getEstimatedReach(formData.target_segment)}</strong> destinatários via Resend em lotes protegidos com link de descadastro automático.
                            </span>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)} disabled={sending}>
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={sending}
                                className="bg-[#135bec] hover:bg-[#104ec8] text-white"
                            >
                                {sending ? 'Disparando Lotes...' : 'Disparar Campanha Agora'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
