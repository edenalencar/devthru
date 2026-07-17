"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    subscription_tier: string;
    created_at: string;
}

export function AdminUsersClient() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [planFilter, setPlanFilter] = useState<'all' | 'free' | 'pro' | 'business'>('all');

    useEffect(() => {
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

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                u =>
                    u.email.toLowerCase().includes(term) ||
                    (u.full_name && u.full_name.toLowerCase().includes(term))
            );
        }

        setFilteredUsers(result);
    }, [users, searchTerm, planFilter]);

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
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#0d121b]">Usuários</h1>
                <p className="text-sm text-[#4c669a] mt-1">Visualize e gerencie as contas dos usuários do DevThru.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white border border-[#e2e6ea] p-4 rounded-xl shadow-sm">
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={planFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => setPlanFilter('all')}
                        className={`h-9 px-4 rounded-lg text-xs font-semibold ${planFilter === 'all' ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90' : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'}`}
                    >
                        Todos
                    </Button>
                    <Button
                        variant={planFilter === 'free' ? 'default' : 'outline'}
                        onClick={() => setPlanFilter('free')}
                        className={`h-9 px-4 rounded-lg text-xs font-semibold ${planFilter === 'free' ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90' : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'}`}
                    >
                        Free
                    </Button>
                    <Button
                        variant={planFilter === 'pro' ? 'default' : 'outline'}
                        onClick={() => setPlanFilter('pro')}
                        className={`h-9 px-4 rounded-lg text-xs font-semibold ${planFilter === 'pro' ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90' : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'}`}
                    >
                        Pro
                    </Button>
                    <Button
                        variant={planFilter === 'business' ? 'default' : 'outline'}
                        onClick={() => setPlanFilter('business')}
                        className={`h-9 px-4 rounded-lg text-xs font-semibold ${planFilter === 'business' ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90' : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'}`}
                    >
                        Business
                    </Button>
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
                                    <th className="p-4 text-xs font-bold uppercase text-[#4c669a]">Data de Cadastro</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2e6ea]">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-sm text-[#4c669a]">
                                            Nenhum usuário encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-[#f6f6f8]/40 transition-colors">
                                            <td className="p-4 text-sm font-semibold text-[#0d121b]">
                                                {user.full_name || 'Sem nome'}
                                            </td>
                                            <td className="p-4 text-sm text-[#4c669a]">{user.email}</td>
                                            <td className="p-4 text-sm">{getPlanBadge(user.subscription_tier)}</td>
                                            <td className="p-4 text-sm text-[#4c669a]">{formatDate(user.created_at)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
