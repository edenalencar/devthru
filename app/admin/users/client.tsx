"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Send, CheckCircle2, Clock, Loader2, Sparkles, Flame, Crown, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { differenceInDays } from 'date-fns';

interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    subscription_tier: string;
    created_at: string;
    trial_ends_at?: string | null;
    welcome_sent?: boolean | null;
    generation_count?: number;
    lifecycle_stage?: string;
}

export function AdminUsersClient() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [lifecycleFilter, setLifecycleFilter] = useState<'all' | 'trial_active' | 'trial_expired' | 'paid' | 'power_user'>('all');
    const [sendingUserId, setSendingUserId] = useState<string | null>(null);
    const [sendingBulk, setSendingBulk] = useState(false);

    async function loadUsers() {
        try {
            const res = await fetch('/api/admin/users');
            if (!res.ok) throw new Error();
            const data = await res.json();
            setUsers(data.users || []);
        } catch (err) {
            console.error(err);
            toast.error('Erro ao carregar lista de usuários');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        let result = [...users];

        if (lifecycleFilter !== 'all') {
            result = result.filter(u => {
                if (lifecycleFilter === 'trial_active') return u.lifecycle_stage === 'trial_active';
                if (lifecycleFilter === 'trial_expired') return u.lifecycle_stage === 'trial_expired';
                if (lifecycleFilter === 'paid') return u.subscription_tier === 'pro' || u.subscription_tier === 'business';
                if (lifecycleFilter === 'power_user') return (u.generation_count || 0) >= 30;
                return true;
            });
        }

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                u =>
                    u.email.toLowerCase().includes(term) ||
                    (u.full_name && u.full_name.toLowerCase().includes(term))
            );
        }

        setFilteredUsers(result);
    }, [users, searchTerm, lifecycleFilter]);

    const pendingWelcomeCount = users.filter(u => !u.welcome_sent).length;
    const activeTrialCount = users.filter(u => u.lifecycle_stage === 'trial_active').length;
    const expiredTrialCount = users.filter(u => u.lifecycle_stage === 'trial_expired').length;
    const paidCount = users.filter(u => u.subscription_tier === 'pro' || u.subscription_tier === 'business').length;

    const handleSendIndividual = async (user: UserProfile) => {
        setSendingUserId(user.id);
        const actionLabel = user.welcome_sent ? 'Reenviando' : 'Enviando';
        const toastId = toast.loading(`${actionLabel} e-mail de boas-vindas para ${user.email}...`);

        try {
            const res = await fetch('/api/admin/welcome-retroactive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                throw new Error(data.error || 'Falha no envio');
            }

            toast.success(`E-mail de boas-vindas enviado com sucesso para ${user.email}!`, { id: toastId });
            setUsers(prev => prev.map(u => (u.id === user.id ? { ...u, welcome_sent: true } : u)));
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Erro ao disparar e-mail de boas-vindas';
            toast.error(message, { id: toastId });
        } finally {
            setSendingUserId(null);
        }
    };

    const handleSendBulkPending = async () => {
        if (pendingWelcomeCount === 0) {
            toast.info('Não há nenhum usuário com status pendente de envio.');
            return;
        }

        setSendingBulk(true);
        const toastId = toast.loading(`Disparando boas-vindas para ${pendingWelcomeCount} usuários pendentes...`);

        try {
            const res = await fetch('/api/admin/welcome-retroactive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                throw new Error(data.error || 'Falha no disparo em massa');
            }

            toast.success(`Boas-vindas enviadas com sucesso para ${data.sentCount} usuários!`, { id: toastId });
            await loadUsers();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Erro ao enviar e-mails de boas-vindas';
            toast.error(message, { id: toastId });
        } finally {
            setSendingBulk(false);
        }
    };

    const getPlanBadge = (tier: string) => {
        const normalized = (tier || 'free').toLowerCase();
        if (normalized === 'pro') {
            return (
                <Badge className="bg-[#135bec]/10 text-[#135bec] border-[#135bec]/20 flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    Pro
                </Badge>
            );
        }
        if (normalized === 'business' || normalized === 'enterprise') {
            return (
                <Badge className="bg-[#1d4ed8]/10 text-[#1d4ed8] border-[#1d4ed8]/20 flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    Business
                </Badge>
            );
        }
        return (
            <Badge variant="outline" className="text-[#4c669a] border-[#e2e6ea]">
                Free
            </Badge>
        );
    };

    const getLifecycleBadge = (user: UserProfile) => {
        const stage = user.lifecycle_stage;

        if (user.subscription_tier === 'pro' || user.subscription_tier === 'business') {
            return (
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Assinante Ativo
                </Badge>
            );
        }

        if (stage === 'trial_active' && user.trial_ends_at) {
            const daysRemaining = Math.max(0, differenceInDays(new Date(user.trial_ends_at), new Date()));
            return (
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Trial ({daysRemaining}d rest.)
                </Badge>
            );
        }

        if (stage === 'trial_expired') {
            return (
                <Badge className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Trial Expirado
                </Badge>
            );
        }

        if ((user.generation_count || 0) >= 30) {
            return (
                <Badge className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
                    <Flame className="h-3 w-3 text-purple-600" />
                    Power User Free
                </Badge>
            );
        }

        return (
            <Badge variant="outline" className="text-slate-500 border-slate-200">
                Usuário Regular
            </Badge>
        );
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#135bec] border-r-transparent"></div>
                <p className="text-sm text-[#4c669a]">Carregando CRM de usuários 360°...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#0d121b]">Usuários & Lifecycle 360°</h1>
                    <p className="text-sm text-[#4c669a] mt-1">
                        Acompanhe engajamento, status de trial, volume de gerações e conversão para o plano Pro.
                    </p>
                </div>

                {pendingWelcomeCount > 0 && (
                    <Button
                        onClick={handleSendBulkPending}
                        disabled={sendingBulk}
                        className="bg-[#135bec] text-white hover:bg-[#135bec]/90 shadow-sm flex items-center gap-2 h-10 px-4"
                    >
                        {sendingBulk ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="h-4 w-4" />
                        )}
                        <span>Enviar Boas-Vindas Pendentes ({pendingWelcomeCount})</span>
                    </Button>
                )}
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-white border-[#e2e6ea]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-[#4c669a] uppercase">Total Cadastrados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#0d121b]">{users.length}</div>
                        <p className="text-xs text-[#4c669a] mt-1">Desenvolvedores com conta</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-blue-600 uppercase">Trials Ativos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{activeTrialCount}</div>
                        <p className="text-xs text-[#4c669a] mt-1">Em período de teste Pro</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-amber-600 uppercase">Trials Expirados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-600">{expiredTrialCount}</div>
                        <p className="text-xs text-[#4c669a] mt-1">Oportunidades de conversão</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-semibold text-emerald-600 uppercase">Assinantes Pagos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">{paidCount}</div>
                        <p className="text-xs text-[#4c669a] mt-1">Planos Pro & Business</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white border border-[#e2e6ea] p-4 rounded-xl shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold text-[#4c669a]">Ciclo de Vida:</span>
                    <Button
                        size="sm"
                        variant={lifecycleFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => setLifecycleFilter('all')}
                        className={`h-8 text-xs ${lifecycleFilter === 'all' ? 'bg-[#135bec] text-white' : ''}`}
                    >
                        Todos ({users.length})
                    </Button>
                    <Button
                        size="sm"
                        variant={lifecycleFilter === 'trial_active' ? 'default' : 'outline'}
                        onClick={() => setLifecycleFilter('trial_active')}
                        className={`h-8 text-xs ${lifecycleFilter === 'trial_active' ? 'bg-blue-600 text-white' : 'text-blue-700'}`}
                    >
                        Trials Ativos ({activeTrialCount})
                    </Button>
                    <Button
                        size="sm"
                        variant={lifecycleFilter === 'trial_expired' ? 'default' : 'outline'}
                        onClick={() => setLifecycleFilter('trial_expired')}
                        className={`h-8 text-xs ${lifecycleFilter === 'trial_expired' ? 'bg-amber-600 text-white' : 'text-amber-700'}`}
                    >
                        Trials Expirados ({expiredTrialCount})
                    </Button>
                    <Button
                        size="sm"
                        variant={lifecycleFilter === 'paid' ? 'default' : 'outline'}
                        onClick={() => setLifecycleFilter('paid')}
                        className={`h-8 text-xs ${lifecycleFilter === 'paid' ? 'bg-emerald-600 text-white' : 'text-emerald-700'}`}
                    >
                        Assinantes ({paidCount})
                    </Button>
                    <Button
                        size="sm"
                        variant={lifecycleFilter === 'power_user' ? 'default' : 'outline'}
                        onClick={() => setLifecycleFilter('power_user')}
                        className={`h-8 text-xs ${lifecycleFilter === 'power_user' ? 'bg-purple-600 text-white' : 'text-purple-700'}`}
                    >
                        Power Users
                    </Button>
                </div>

                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#4c669a]" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou e-mail..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-9 h-9 w-full bg-[#f6f6f8] border border-[#e2e6ea] rounded-lg text-xs text-[#0d121b] placeholder-[#4c669a] focus:outline-none focus:border-[#135bec] focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Users Table */}
            <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#e2e6ea] bg-[#f8fafc]">
                                    <th className="p-4 text-xs font-bold uppercase text-[#4c669a]">Usuário</th>
                                    <th className="p-4 text-xs font-bold uppercase text-[#4c669a]">Plano</th>
                                    <th className="p-4 text-xs font-bold uppercase text-[#4c669a]">Ciclo de Vida</th>
                                    <th className="p-4 text-xs font-bold uppercase text-[#4c669a] text-center">Gerações</th>
                                    <th className="p-4 text-xs font-bold uppercase text-[#4c669a]">Cadastro</th>
                                    <th className="p-4 text-xs font-bold uppercase text-[#4c669a] text-right">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2e6ea]">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-sm text-[#4c669a]">
                                            Nenhum usuário encontrado com os filtros selecionados.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map(user => {
                                        const isSending = sendingUserId === user.id;
                                        return (
                                            <tr key={user.id} className="hover:bg-[#f6f6f8]/40 transition-colors">
                                                <td className="p-4">
                                                    <div className="text-sm font-semibold text-[#0d121b]">
                                                        {user.full_name || 'Desenvolvedor'}
                                                    </div>
                                                    <div className="text-xs text-[#4c669a]">{user.email}</div>
                                                </td>
                                                <td className="p-4 text-sm">{getPlanBadge(user.subscription_tier)}</td>
                                                <td className="p-4 text-sm">{getLifecycleBadge(user)}</td>
                                                <td className="p-4 text-sm text-center font-bold text-slate-700">
                                                    <span className="bg-slate-100 px-2 py-1 rounded text-xs">
                                                        {user.generation_count || 0}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm text-[#4c669a]">{formatDate(user.created_at)}</td>
                                                <td className="p-4 text-sm text-right space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleSendIndividual(user)}
                                                        disabled={isSending || sendingBulk}
                                                        className={`h-8 px-2.5 text-xs font-semibold rounded-lg border-[#e2e6ea] ${
                                                            user.welcome_sent
                                                                ? 'text-[#4c669a] hover:text-[#0d121b] hover:bg-[#f6f6f8]'
                                                                : 'bg-[#135bec]/10 text-[#135bec] border-[#135bec]/30 hover:bg-[#135bec] hover:text-white'
                                                        }`}
                                                        title={user.welcome_sent ? 'Reenviar e-mail de boas-vindas' : 'Enviar e-mail de boas-vindas'}
                                                    >
                                                        {isSending ? (
                                                            <>
                                                                <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                                                                Enviando...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Send className="h-3.5 w-3.5 mr-1" />
                                                                {user.welcome_sent ? 'Reenviar' : 'Boas-Vindas'}
                                                            </>
                                                        )}
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
