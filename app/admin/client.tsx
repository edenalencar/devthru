"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Mail, Zap, CircleAlert, Star, Briefcase, Megaphone, Clock } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

interface Stats {
    totalUsers: number;
    freeUsers: number;
    proUsers: number;
    businessUsers: number;
    activeTrials?: number;
    pendingMessages: number;
    totalGenerations: number;
    totalFeedbacks?: number;
    averageRating?: number;
    totalDeals?: number;
    dealsPipelineValue?: number;
    dealsWonValue?: number;
    newsletterSubscribersCount?: number;
}

export function AdminDashboardClient() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStats() {
            try {
                const res = await fetch('/api/admin/stats');
                if (!res.ok) {
                    throw new Error('Falha ao buscar dados das APIs de admin');
                }
                const data = await res.json();
                setStats(data.stats);
            } catch (err) {
                console.error(err);
                toast.error('Erro ao carregar estatísticas do painel');
            } finally {
                setLoading(false);
            }
        }

        loadStats();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#135bec] border-r-transparent"></div>
                <p className="text-sm text-[#4c669a]">Carregando painel do CRM DevThru...</p>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="text-center py-12">
                <CircleAlert className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0d121b]">Erro ao carregar dados</h3>
                <p className="text-sm text-[#4c669a] mt-1">Não foi possível recuperar as informações estatísticas do servidor.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#0d121b]">Visão Geral do CRM</h1>
                <p className="text-sm text-[#4c669a] mt-1">Métricas de crescimento, oportunidades comerciais e retenção de usuários.</p>
            </div>

            {/* CRM Growth Highlights */}
            <div className="grid gap-6 md:grid-cols-3">
                <Link href="/admin/deals">
                    <Card className="bg-white border-[#e2e6ea] shadow-sm hover:border-[#135bec]/40 hover:shadow-md transition-all cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-semibold text-[#4c669a]">Pipeline de Patrocínios B2B</CardTitle>
                            <Briefcase className="h-4 w-4 text-[#135bec]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-[#0d121b]">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(stats.dealsPipelineValue || 0)}
                            </div>
                            <p className="text-xs text-[#135bec] mt-1 flex items-center gap-1 font-medium">
                                {stats.totalDeals || 0} oportunidades no pipeline →
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/users">
                    <Card className="bg-white border-[#e2e6ea] shadow-sm hover:border-[#135bec]/40 hover:shadow-md transition-all cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-semibold text-[#4c669a]">Trials Ativos (Pro)</CardTitle>
                            <Clock className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-[#0d121b]">{stats.activeTrials || 0}</div>
                            <p className="text-xs text-[#4c669a] mt-1">
                                {stats.proUsers + stats.businessUsers} assinantes pagos ativos
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/campaigns">
                    <Card className="bg-white border-[#e2e6ea] shadow-sm hover:border-[#135bec]/40 hover:shadow-md transition-all cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-semibold text-[#4c669a]">Audiência da Newsletter</CardTitle>
                            <Megaphone className="h-4 w-4 text-[#135bec]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-[#0d121b]">{stats.newsletterSubscribersCount || 0}</div>
                            <p className="text-xs text-[#135bec] mt-1 flex items-center gap-1 font-medium">
                                Criar novo disparo em lote →
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Core Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/admin/users">
                    <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm hover:border-[#135bec]/40 transition-all cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-semibold text-[#4c669a]">Total de Usuários</CardTitle>
                            <Users className="h-4 w-4 text-[#135bec]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-[#0d121b]">{stats.totalUsers}</div>
                            <p className="text-xs text-[#4c669a] mt-1">Contas registradas</p>
                        </CardContent>
                    </Card>
                </Link>

                <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-[#4c669a]">Total de Gerações</CardTitle>
                        <Zap className="h-4 w-4 text-[#135bec]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#0d121b]">{stats.totalGenerations}</div>
                        <p className="text-xs text-[#4c669a] mt-1">Uso de ferramentas</p>
                    </CardContent>
                </Card>

                <Link href="/admin/messages">
                    <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm hover:border-[#135bec]/40 transition-all cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-semibold text-[#4c669a]">Mensagens Pendentes</CardTitle>
                            <Mail className="h-4 w-4 text-[#135bec]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-[#0d121b]">{stats.pendingMessages}</div>
                            <p className="text-xs text-[#4c669a] mt-1">Aguardando resposta</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/feedbacks">
                    <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm hover:border-[#135bec]/40 transition-all cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-semibold text-[#4c669a]">Avaliações</CardTitle>
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-[#0d121b]">{stats.totalFeedbacks ?? 0}</span>
                                {stats.averageRating !== undefined && stats.averageRating > 0 && (
                                    <span className="text-xs font-semibold text-amber-600">
                                        ({stats.averageRating} ★)
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-[#4c669a] mt-1">Feedbacks recebidos</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Distribution Card */}
            <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                <CardHeader>
                    <CardTitle className="text-[#0d121b]">Distribuição de Planos & Assinaturas</CardTitle>
                    <CardDescription className="text-[#4c669a]">Proporção de desenvolvedores por tier de monetização.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-[#4c669a]">Usuários Free ({stats.freeUsers})</span>
                            <span className="text-sm text-[#4c669a]">{Math.round((stats.freeUsers / (stats.totalUsers || 1)) * 100)}%</span>
                        </div>
                        <div className="w-full bg-[#e2e6ea] rounded-full h-2">
                            <div className="bg-[#a0aec0] h-2 rounded-full" style={{ width: `${(stats.freeUsers / (stats.totalUsers || 1)) * 100}%` }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-[#135bec]">Usuários Pro ({stats.proUsers})</span>
                            <span className="text-sm text-[#135bec]">{Math.round((stats.proUsers / (stats.totalUsers || 1)) * 100)}%</span>
                        </div>
                        <div className="w-full bg-[#e2e6ea] rounded-full h-2">
                            <div className="bg-[#135bec] h-2 rounded-full" style={{ width: `${(stats.proUsers / (stats.totalUsers || 1)) * 100}%` }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-[#1d4ed8]">Usuários Business / Enterprise ({stats.businessUsers})</span>
                            <span className="text-sm text-[#1d4ed8]">{Math.round((stats.businessUsers / (stats.totalUsers || 1)) * 100)}%</span>
                        </div>
                        <div className="w-full bg-[#e2e6ea] rounded-full h-2">
                            <div className="bg-[#1d4ed8] h-2 rounded-full" style={{ width: `${(stats.businessUsers / (stats.totalUsers || 1)) * 100}%` }}></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
