"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Send, CheckCircle2, Clock, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    subscription_tier: string;
    created_at: string;
    welcome_sent?: boolean | null;
}

export function AdminUsersClient() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [planFilter, setPlanFilter] = useState<'all' | 'free' | 'pro' | 'business'>('all');
    const [welcomeFilter, setWelcomeFilter] = useState<'all' | 'sent' | 'pending'>('all');
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

        if (planFilter !== 'all') {
            result = result.filter(u => {
                const tier = (u.subscription_tier || 'free').toLowerCase();
                if (planFilter === 'business') {
                    return tier === 'business' || tier === 'enterprise';
                }
                return tier === planFilter;
            });
        }

        if (welcomeFilter !== 'all') {
            result = result.filter(u => {
                if (welcomeFilter === 'sent') return !!u.welcome_sent;
                if (welcomeFilter === 'pending') return !u.welcome_sent;
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
    }, [users, searchTerm, planFilter, welcomeFilter]);

    const pendingWelcomeCount = users.filter(u => !u.welcome_sent).length;

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
            
            // Atualizar estado local de forma otimista
            setUsers(prev => prev.map(u => u.id === user.id ? { ...u, welcome_sent: true } : u));
        } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            console.error(err);
            toast.error(err.message || 'Erro ao disparar e-mail de boas-vindas', { id: toastId });
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
            
            // Recarregar os usuários atualizados
            await loadUsers();
        } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            console.error(err);
            toast.error(err.message || 'Erro ao enviar e-mails de boas-vindas', { id: toastId });
        } finally {
            setSendingBulk(false);
        }
    };

    const getPlanBadge = (tier: string) => {
        const normalized = (tier || 'free').toLowerCase();
        if (normalized === 'pro') {
            return (
                <Badge className="bg-[#135bec]/10 text-[#135bec] border-[#135bec]/20">
                    Pro
                </Badge>
            );
        }
        if (normalized === 'business' || normalized === 'enterprise') {
            return (
                <Badge className="bg-[#1d4ed8]/10 text-[#1d4ed8] border-[#1d4ed8]/20">
                    Business
                </Badge>
            );
        }
        return (
            <Badge className="bg-[#a0aec0]/10 text-[#4c669a] border-[#a0aec0]/20">
                Free
            </Badge>
        );
    };

    const getWelcomeBadge = (sent?: boolean | null) => {
        if (sent) {
            return (
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1 w-fit">
                    <CheckCircle2 className="h-3 w-3" />
                    Enviado
                </Badge>
            );
        }
        return (
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1 w-fit">
                <Clock className="h-3 w-3" />
                Pendente
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
                <p className="text-sm text-[#4c669a]">Carregando lista de usuários...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#0d121b]">Usuários</h1>
                    <p className="text-sm text-[#4c669a] mt-1">Visualize, gerencie e controle o onboarding dos desenvolvedores no DevThru.</p>
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
                        <span>Enviar Boas-Vindas para Todos ({pendingWelcomeCount} pendentes)</span>
                    </Button>
                )}
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white border border-[#e2e6ea] p-4 rounded-xl shadow-sm">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Plan Filter */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-semibold text-[#4c669a] mr-1">Plano:</span>
                        <Button
                            variant={planFilter === 'all' ? 'default' : 'outline'}
                            onClick={() => setPlanFilter('all')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${planFilter === 'all' ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90' : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'}`}
                        >
                            Todos
                        </Button>
                        <Button
                            variant={planFilter === 'free' ? 'default' : 'outline'}
                            onClick={() => setPlanFilter('free')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${planFilter === 'free' ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90' : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'}`}
                        >
                            Free
                        </Button>
                        <Button
                            variant={planFilter === 'pro' ? 'default' : 'outline'}
                            onClick={() => setPlanFilter('pro')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${planFilter === 'pro' ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90' : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'}`}
                        >
                            Pro
                        </Button>
                        <Button
                            variant={planFilter === 'business' ? 'default' : 'outline'}
                            onClick={() => setPlanFilter('business')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${planFilter === 'business' ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90' : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'}`}
                        >
                            Business
                        </Button>
                    </div>

                    <div className="hidden sm:block h-5 w-[1px] bg-[#e2e6ea]"></div>

                    {/* Welcome Email Filter */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-semibold text-[#4c669a] mr-1">Boas-vindas:</span>
                        <Button
                            variant={welcomeFilter === 'all' ? 'default' : 'outline'}
                            onClick={() => setWelcomeFilter('all')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${welcomeFilter === 'all' ? 'bg-[#0d121b] text-white hover:bg-[#0d121b]/90' : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'}`}
                        >
                            Todos ({users.length})
                        </Button>
                        <Button
                            variant={welcomeFilter === 'pending' ? 'default' : 'outline'}
                            onClick={() => setWelcomeFilter('pending')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${welcomeFilter === 'pending' ? 'bg-amber-600 text-white hover:bg-amber-700' : 'border-[#e2e6ea] text-amber-700 hover:text-amber-800'}`}
                        >
                            Pendentes ({pendingWelcomeCount})
                        </Button>
                        <Button
                            variant={welcomeFilter === 'sent' ? 'default' : 'outline'}
                            onClick={() => setWelcomeFilter('sent')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${welcomeFilter === 'sent' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'border-[#e2e6ea] text-emerald-700 hover:text-emerald-800'}`}
                        >
                            Enviados ({users.length - pendingWelcomeCount})
                        </Button>
                    </div>
                </div>

                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#4c669a]" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou e-mail..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                                <tr className="border-b border-[#e2e6ea] bg-[#f6f6f8]">
                                    <th className="p-4 text-xs font-bold uppercase text-[#4c669a]">Nome</th>
                                    <th className="p-4 text-xs font-bold uppercase text-[#4c669a]">E-mail</th>
                                    <th className="p-4 text-xs font-bold uppercase text-[#4c669a]">Plano</th>
                                    <th className="p-4 text-xs font-bold uppercase text-[#4c669a]">Cadastro</th>
                                    <th className="p-4 text-xs font-bold uppercase text-[#4c669a]">Boas-Vindas</th>
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
                                    filteredUsers.map((user) => {
                                        const isSending = sendingUserId === user.id;
                                        return (
                                            <tr key={user.id} className="hover:bg-[#f6f6f8]/40 transition-colors">
                                                <td className="p-4 text-sm font-semibold text-[#0d121b]">
                                                    {user.full_name || 'Sem nome'}
                                                </td>
                                                <td className="p-4 text-sm text-[#4c669a]">{user.email}</td>
                                                <td className="p-4 text-sm">{getPlanBadge(user.subscription_tier)}</td>
                                                <td className="p-4 text-sm text-[#4c669a]">{formatDate(user.created_at)}</td>
                                                <td className="p-4 text-sm">{getWelcomeBadge(user.welcome_sent)}</td>
                                                <td className="p-4 text-sm text-right">
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
                                                                {user.welcome_sent ? 'Reenviar' : 'Enviar'}
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
