"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Mail, Zap, Shield, CircleAlert } from 'lucide-react';
import { toast } from 'sonner';

interface Stats {
    totalUsers: number;
    freeUsers: number;
    proUsers: number;
    businessUsers: number;
    pendingMessages: number;
    totalGenerations: number;
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
                <p className="text-sm text-[#4c669a]">Carregando estatísticas...</p>
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
                <h1 className="text-3xl font-bold tracking-tight text-[#0d121b]">Visão Geral</h1>
                <p className="text-sm text-[#4c669a] mt-1">Estatísticas gerais de uso e cadastros do DevThru.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-[#4c669a]">Total de Usuários</CardTitle>
                        <Users className="h-4 w-4 text-[#135bec]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#0d121b]">{stats.totalUsers}</div>
                        <p className="text-xs text-[#4c669a] mt-1">Usuários registrados no Supabase</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-[#4c669a]">Mensagens de Contato</CardTitle>
                        <Mail className="h-4 w-4 text-[#135bec]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#0d121b]">{stats.pendingMessages}</div>
                        <p className="text-xs text-[#4c669a] mt-1">Aguardando resposta do suporte</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-[#4c669a]">Total de Gerações</CardTitle>
                        <Zap className="h-4 w-4 text-[#135bec]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#0d121b]">{stats.totalGenerations}</div>
                        <p className="text-xs text-[#4c669a] mt-1">Validações e gerações efetuadas</p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-[#4c669a]">Assinantes Pagos</CardTitle>
                        <Shield className="h-4 w-4 text-[#135bec]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#0d121b]">{stats.proUsers + stats.businessUsers}</div>
                        <p className="text-xs text-[#4c669a] mt-1">{stats.proUsers} Pro / {stats.businessUsers} Business</p>
                    </CardContent>
                </Card>
            </div>

            {/* Distribution Card */}
            <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                <CardHeader>
                    <CardTitle className="text-[#0d121b]">Distribuição de Planos</CardTitle>
                    <CardDescription className="text-[#4c669a]">Proporção de usuários por tier de assinatura.</CardDescription>
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
