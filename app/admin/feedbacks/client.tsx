"use client";

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    Star,
    Search,
    Download,
    Trash2,
    ExternalLink,
    MessageSquare,
    Sparkles,
    TrendingUp,
    User,
    ArrowUpDown,
    CheckCircle2,
    AlertTriangle,
    Loader2,
    BookOpen,
    Wrench,
    FileSpreadsheet,
} from 'lucide-react';
import { toast } from 'sonner';
import { tools } from '@/lib/tools-list';
import { blogPosts } from '@/lib/content/blog';
import Link from 'next/link';

export interface FeedbackItem {
    id: string;
    tool_slug: string;
    rating: number;
    comment: string | null;
    user_id: string | null;
    created_at: string;
    user?: {
        email: string;
        full_name: string | null;
        avatar_url: string | null;
    } | null;
}

export function AdminFeedbacksClient() {
    const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'tool' | 'blog'>('all');
    const [ratingFilter, setRatingFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1' | 'positive' | 'critical'>('all');
    const [commentFilter, setCommentFilter] = useState<'all' | 'with_comment' | 'without_comment'>('all');
    const [selectedToolSlug, setSelectedToolSlug] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'highest' | 'lowest'>('recent');

    // Delete modal state
    const [feedbackToDelete, setFeedbackToDelete] = useState<FeedbackItem | null>(null);
    const [deleting, setDeleting] = useState(false);

    // Load feedbacks from backend
    const loadFeedbacks = async () => {
        try {
            const res = await fetch('/api/admin/feedbacks');
            if (!res.ok) throw new Error('Falha ao carregar feedbacks');
            const data = await res.json();
            setFeedbacks(data.feedbacks || []);
        } catch (err) {
            console.error(err);
            toast.error('Erro ao carregar feedbacks das ferramentas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeedbacks();
    }, []);

    // Tool / Post Metadata Resolver
    const resolveItemMeta = (slug: string) => {
        if (slug.startsWith('blog:')) {
            const cleanSlug = slug.replace('blog:', '');
            const post = blogPosts.find((p) => p.slug === cleanSlug);
            return {
                type: 'blog' as const,
                title: post ? post.title : cleanSlug,
                category: post ? post.category : 'Blog',
                url: `/blog/${cleanSlug}`,
                Icon: BookOpen,
            };
        }

        const tool = tools.find((t) => t.slug === slug);
        return {
            type: 'tool' as const,
            title: tool ? tool.title : slug,
            category: tool ? tool.category : 'Ferramenta',
            url: tool ? `/tools/${tool.category}/${tool.slug}` : `/tools`,
            Icon: tool ? tool.icon : Wrench,
        };
    };

    // Calculate aggregated stats
    const stats = useMemo(() => {
        const total = feedbacks.length;
        if (total === 0) {
            return {
                total: 0,
                average: '0.0',
                withComment: 0,
                withCommentPct: 0,
                positiveCount: 0,
                positivePct: 0,
                ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
                ratingPcts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
                topTools: [] as { slug: string; title: string; count: number; avg: number }[],
            };
        }

        let sumRating = 0;
        let withCommentCount = 0;
        const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        const toolMap: Record<string, { ratings: number[]; count: number }> = {};

        feedbacks.forEach((f) => {
            const r = Math.min(5, Math.max(1, Math.round(f.rating || 0)));
            sumRating += f.rating || 0;
            if (f.comment && f.comment.trim().length > 0) {
                withCommentCount++;
            }
            if (counts[r] !== undefined) {
                counts[r]++;
            }

            if (!toolMap[f.tool_slug]) {
                toolMap[f.tool_slug] = { ratings: [], count: 0 };
            }
            toolMap[f.tool_slug].ratings.push(f.rating || 0);
            toolMap[f.tool_slug].count++;
        });

        const average = (sumRating / total).toFixed(1);
        const positiveCount = (counts[5] || 0) + (counts[4] || 0);
        const positivePct = Math.round((positiveCount / total) * 100);
        const withCommentPct = Math.round((withCommentCount / total) * 100);

        const ratingPcts = {
            5: Math.round(((counts[5] || 0) / total) * 100),
            4: Math.round(((counts[4] || 0) / total) * 100),
            3: Math.round(((counts[3] || 0) / total) * 100),
            2: Math.round(((counts[2] || 0) / total) * 100),
            1: Math.round(((counts[1] || 0) / total) * 100),
        };

        const topTools = Object.entries(toolMap)
            .map(([slug, data]) => {
                const meta = resolveItemMeta(slug);
                const avg = Number((data.ratings.reduce((a, b) => a + b, 0) / data.count).toFixed(1));
                return {
                    slug,
                    title: meta.title,
                    count: data.count,
                    avg,
                };
            })
            .sort((a, b) => b.count - a.count)
            .slice(0, 4);

        return {
            total,
            average,
            withComment: withCommentCount,
            withCommentPct,
            positiveCount,
            positivePct,
            ratingCounts: counts,
            ratingPcts,
            topTools,
        };
    }, [feedbacks]);

    // Unique tool slugs list for the dropdown
    const availableSlugs = useMemo(() => {
        const uniqueSlugs = Array.from(new Set(feedbacks.map((f) => f.tool_slug)));
        return uniqueSlugs.map((slug) => {
            const meta = resolveItemMeta(slug);
            return {
                slug,
                label: `${meta.type === 'blog' ? '📝 Blog: ' : '🛠️ '}${meta.title}`,
            };
        }).sort((a, b) => a.label.localeCompare(b.label));
    }, [feedbacks]);

    // Filter and sort feedbacks
    const filteredFeedbacks = useMemo(() => {
        let list = [...feedbacks];

        // Type filter
        if (typeFilter !== 'all') {
            list = list.filter((f) => {
                const isBlog = f.tool_slug.startsWith('blog:');
                return typeFilter === 'blog' ? isBlog : !isBlog;
            });
        }

        // Rating filter
        if (ratingFilter !== 'all') {
            if (ratingFilter === 'positive') {
                list = list.filter((f) => (f.rating || 0) >= 4);
            } else if (ratingFilter === 'critical') {
                list = list.filter((f) => (f.rating || 0) <= 2);
            } else {
                const targetRating = parseInt(ratingFilter, 10);
                list = list.filter((f) => Math.round(f.rating || 0) === targetRating);
            }
        }

        // Comment filter
        if (commentFilter === 'with_comment') {
            list = list.filter((f) => f.comment && f.comment.trim().length > 0);
        } else if (commentFilter === 'without_comment') {
            list = list.filter((f) => !f.comment || f.comment.trim().length === 0);
        }

        // Specific tool filter
        if (selectedToolSlug !== 'all') {
            list = list.filter((f) => f.tool_slug === selectedToolSlug);
        }

        // Search text
        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            list = list.filter((f) => {
                const meta = resolveItemMeta(f.tool_slug);
                const matchComment = f.comment?.toLowerCase().includes(term);
                const matchSlug = f.tool_slug.toLowerCase().includes(term);
                const matchTitle = meta.title.toLowerCase().includes(term);
                const matchUser =
                    f.user?.email?.toLowerCase().includes(term) ||
                    f.user?.full_name?.toLowerCase().includes(term);

                return matchComment || matchSlug || matchTitle || matchUser;
            });
        }

        // Sorting
        list.sort((a, b) => {
            if (sortBy === 'recent') {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
            if (sortBy === 'oldest') {
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            }
            if (sortBy === 'highest') {
                return (b.rating || 0) - (a.rating || 0);
            }
            if (sortBy === 'lowest') {
                return (a.rating || 0) - (b.rating || 0);
            }
            return 0;
        });

        return list;
    }, [feedbacks, typeFilter, ratingFilter, commentFilter, selectedToolSlug, searchTerm, sortBy]);

    // Handle delete feedback
    const handleDeleteFeedback = async () => {
        if (!feedbackToDelete) return;

        setDeleting(true);
        const toastId = toast.loading('Excluindo feedback...');

        try {
            const res = await fetch(`/api/admin/feedbacks?id=${feedbackToDelete.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Falha ao excluir feedback');
            }

            toast.success('Feedback excluído com sucesso!', { id: toastId });
            setFeedbacks((prev) => prev.filter((item) => item.id !== feedbackToDelete.id));
            setFeedbackToDelete(null);
        } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            console.error(err);
            toast.error(err.message || 'Erro ao excluir feedback', { id: toastId });
        } finally {
            setDeleting(false);
        }
    };

    // Export to CSV
    const handleExportCSV = () => {
        if (filteredFeedbacks.length === 0) {
            toast.info('Nenhum feedback disponível para exportação.');
            return;
        }

        const headers = ['ID', 'Data/Hora', 'Tipo', 'Slug', 'Título', 'Avaliação', 'Comentário', 'Autor Email', 'Autor Nome'];
        const rows = filteredFeedbacks.map((f) => {
            const meta = resolveItemMeta(f.tool_slug);
            const date = new Date(f.created_at).toLocaleString('pt-BR');
            const comment = f.comment ? `"${f.comment.replace(/"/g, '""')}"` : '""';
            const userEmail = f.user?.email ? `"${f.user.email}"` : '"Anônimo"';
            const userName = f.user?.full_name ? `"${f.user.full_name}"` : '""';

            return [
                f.id,
                `"${date}"`,
                meta.type === 'blog' ? 'Blog' : 'Ferramenta',
                `"${f.tool_slug}"`,
                `"${meta.title}"`,
                f.rating || 0,
                comment,
                userEmail,
                userName,
            ].join(',');
        });

        const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `feedbacks-devthru-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success(`Exportados ${filteredFeedbacks.length} feedbacks em CSV!`);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const renderStars = (rating: number) => {
        const rounded = Math.min(5, Math.max(1, Math.round(rating || 0)));
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-4 w-4 ${
                            star <= rounded
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-[#e2e6ea] fill-[#f6f6f8]'
                        }`}
                    />
                ))}
            </div>
        );
    };

    const getRatingBadge = (rating: number) => {
        if (rating >= 4) {
            return (
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-semibold">
                    {rating} ★ Positivo
                </Badge>
            );
        }
        if (rating === 3) {
            return (
                <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs font-semibold">
                    {rating} ★ Regular
                </Badge>
            );
        }
        return (
            <Badge className="bg-red-50 text-red-700 border-red-200 text-xs font-semibold">
                {rating} ★ Crítico
            </Badge>
        );
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[450px] gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#135bec] border-r-transparent"></div>
                <p className="text-sm text-[#4c669a]">Carregando feedbacks das ferramentas...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#0d121b]">
                        Feedbacks & Avaliações
                    </h1>
                    <p className="text-sm text-[#4c669a] mt-1">
                        Acompanhe o que os desenvolvedores estão achando das ferramentas e artigos do DevThru.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        onClick={handleExportCSV}
                        variant="outline"
                        className="h-10 border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b] hover:bg-white shadow-sm flex items-center gap-2"
                    >
                        <Download className="h-4 w-4 text-[#135bec]" />
                        <span>Exportar CSV</span>
                    </Button>
                </div>
            </div>

            {/* Metrics Overview Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-[#4c669a]">Total de Feedbacks</CardTitle>
                        <MessageSquare className="h-4 w-4 text-[#135bec]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#0d121b]">{stats.total}</div>
                        <p className="text-xs text-[#4c669a] mt-1">
                            {stats.positivePct}% avaliações positivas (4-5 ★)
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-[#4c669a]">Média Geral</CardTitle>
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-[#0d121b]">{stats.average}</span>
                            <span className="text-sm text-[#4c669a] font-medium">/ 5.0</span>
                        </div>
                        <div className="mt-1">{renderStars(parseFloat(stats.average))}</div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-[#4c669a]">Comentários Enviados</CardTitle>
                        <Sparkles className="h-4 w-4 text-[#135bec]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#0d121b]">{stats.withComment}</div>
                        <p className="text-xs text-[#4c669a] mt-1">
                            {stats.withCommentPct}% dos envios contêm sugestões
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-semibold text-[#4c669a]">Satisfação</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-600">
                            {stats.positivePct}%
                        </div>
                        <p className="text-xs text-[#4c669a] mt-1">
                            {stats.positiveCount} votos de 4 ou 5 estrelas
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Distribution & Top Tools Section */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Rating Distribution */}
                <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base text-[#0d121b]">Distribuição das Notas</CardTitle>
                        <CardDescription className="text-xs text-[#4c669a]">
                            Proporção de avaliações recebidas de 1 a 5 estrelas.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = stats.ratingCounts[star as keyof typeof stats.ratingCounts] || 0;
                            const pct = stats.ratingPcts[star as keyof typeof stats.ratingPcts] || 0;
                            const barColor =
                                star >= 4
                                    ? 'bg-emerald-500'
                                    : star === 3
                                    ? 'bg-amber-400'
                                    : 'bg-red-500';

                            return (
                                <div key={star} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-12 text-xs font-semibold text-[#0d121b]">
                                        <span>{star}</span>
                                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                    </div>
                                    <div className="flex-1 h-2.5 bg-[#f6f6f8] border border-[#e2e6ea] rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${barColor} transition-all duration-500 rounded-full`}
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <div className="w-16 text-right text-xs text-[#4c669a] font-medium">
                                        {count} ({pct}%)
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* Top Rated Tools */}
                <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base text-[#0d121b]">Ferramentas Mais Avaliadas</CardTitle>
                        <CardDescription className="text-xs text-[#4c669a]">
                            Recursos com maior volume de feedback dos usuários.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {stats.topTools.length === 0 ? (
                            <p className="text-xs text-[#4c669a]">Nenhum feedback registrado.</p>
                        ) : (
                            stats.topTools.map((item) => (
                                <div
                                    key={item.slug}
                                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#f6f6f8] border border-[#e2e6ea]"
                                >
                                    <div className="min-w-0 pr-2">
                                        <p className="text-xs font-semibold text-[#0d121b] truncate">
                                            {item.title}
                                        </p>
                                        <p className="text-[11px] text-[#4c669a]">
                                            {item.count} {item.count === 1 ? 'avaliação' : 'avaliações'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs font-bold text-[#0d121b] shrink-0">
                                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                        <span>{item.avg}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Filters Bar */}
            <div className="bg-white border border-[#e2e6ea] p-5 rounded-2xl shadow-sm space-y-4">
                {/* Search & Tool Dropdown */}
                <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-[#4c669a]" />
                        <input
                            type="text"
                            placeholder="Buscar por comentário, ferramenta, slug ou usuário..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 h-10 w-full bg-[#f6f6f8] border border-[#e2e6ea] rounded-xl text-xs text-[#0d121b] placeholder-[#4c669a] focus:outline-none focus:border-[#135bec] focus:bg-white transition-all"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                        {/* Tool selection filter */}
                        <div className="w-full sm:w-auto">
                            <select
                                value={selectedToolSlug}
                                onChange={(e) => setSelectedToolSlug(e.target.value)}
                                className="h-10 px-3 bg-[#f6f6f8] border border-[#e2e6ea] rounded-xl text-xs text-[#0d121b] focus:outline-none focus:border-[#135bec] focus:bg-white cursor-pointer w-full sm:w-60 transition-all font-medium"
                            >
                                <option value="all">Todas as Ferramentas & Posts ({availableSlugs.length})</option>
                                {availableSlugs.map((opt) => (
                                    <option key={opt.slug} value={opt.slug}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort selector */}
                        <div className="w-full sm:w-auto flex items-center gap-1.5 bg-[#f6f6f8] border border-[#e2e6ea] rounded-xl px-3 h-10">
                            <ArrowUpDown className="h-3.5 w-3.5 text-[#4c669a]" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="bg-transparent border-0 text-xs text-[#0d121b] focus:outline-none cursor-pointer font-medium"
                            >
                                <option value="recent">Mais Recentes</option>
                                <option value="oldest">Mais Antigos</option>
                                <option value="highest">Maior Nota (5 ★)</option>
                                <option value="lowest">Menor Nota (1 ★)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e2e6ea]">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-[#4c669a] mr-1">Tipo:</span>
                        <Button
                            variant={typeFilter === 'all' ? 'default' : 'outline'}
                            onClick={() => setTypeFilter('all')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${
                                typeFilter === 'all'
                                    ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90'
                                    : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'
                            }`}
                        >
                            Todos ({feedbacks.length})
                        </Button>
                        <Button
                            variant={typeFilter === 'tool' ? 'default' : 'outline'}
                            onClick={() => setTypeFilter('tool')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${
                                typeFilter === 'tool'
                                    ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90'
                                    : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'
                            }`}
                        >
                            Ferramentas ({feedbacks.filter((f) => !f.tool_slug.startsWith('blog:')).length})
                        </Button>
                        <Button
                            variant={typeFilter === 'blog' ? 'default' : 'outline'}
                            onClick={() => setTypeFilter('blog')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${
                                typeFilter === 'blog'
                                    ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90'
                                    : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'
                            }`}
                        >
                            Blog ({feedbacks.filter((f) => f.tool_slug.startsWith('blog:')).length})
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-[#4c669a] mr-1">Nota:</span>
                        <Button
                            variant={ratingFilter === 'all' ? 'default' : 'outline'}
                            onClick={() => setRatingFilter('all')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${
                                ratingFilter === 'all'
                                    ? 'bg-[#0d121b] text-white hover:bg-[#0d121b]/90'
                                    : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'
                            }`}
                        >
                            Todas
                        </Button>
                        <Button
                            variant={ratingFilter === 'positive' ? 'default' : 'outline'}
                            onClick={() => setRatingFilter('positive')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${
                                ratingFilter === 'positive'
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                    : 'border-[#e2e6ea] text-emerald-700 hover:text-emerald-800'
                            }`}
                        >
                            Positivas (4-5 ★)
                        </Button>
                        <Button
                            variant={ratingFilter === 'critical' ? 'default' : 'outline'}
                            onClick={() => setRatingFilter('critical')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${
                                ratingFilter === 'critical'
                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                    : 'border-[#e2e6ea] text-red-700 hover:text-red-800'
                            }`}
                        >
                            Críticas (1-2 ★)
                        </Button>
                        <Button
                            variant={commentFilter === 'with_comment' ? 'default' : 'outline'}
                            onClick={() => setCommentFilter(commentFilter === 'with_comment' ? 'all' : 'with_comment')}
                            className={`h-8 px-3 rounded-lg text-xs font-semibold ${
                                commentFilter === 'with_comment'
                                    ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90'
                                    : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'
                            }`}
                        >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Apenas com Comentário ({stats.withComment})
                        </Button>
                    </div>
                </div>
            </div>

            {/* Feedbacks List / Table */}
            <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#4c669a]">
                    <span>
                        Exibindo <strong>{filteredFeedbacks.length}</strong> de <strong>{feedbacks.length}</strong> feedbacks
                    </span>
                    {(searchTerm || typeFilter !== 'all' || ratingFilter !== 'all' || commentFilter !== 'all' || selectedToolSlug !== 'all') && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setTypeFilter('all');
                                setRatingFilter('all');
                                setCommentFilter('all');
                                setSelectedToolSlug('all');
                            }}
                            className="text-[#135bec] hover:underline font-semibold"
                        >
                            Limpar todos os filtros
                        </button>
                    )}
                </div>

                {filteredFeedbacks.length === 0 ? (
                    <Card className="bg-white border-[#e2e6ea] p-12 text-center shadow-sm">
                        <MessageSquare className="h-12 w-12 text-[#4c669a]/40 mx-auto mb-3" />
                        <h3 className="text-base font-semibold text-[#0d121b]">Nenhum feedback encontrado</h3>
                        <p className="text-xs text-[#4c669a] mt-1 max-w-sm mx-auto">
                            Tente ajustar os termos de pesquisa ou remover os filtros aplicados para visualizar outros registros.
                        </p>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {filteredFeedbacks.map((item) => {
                            const meta = resolveItemMeta(item.tool_slug);
                            const ItemIcon = meta.Icon;

                            return (
                                <Card
                                    key={item.id}
                                    className="bg-white border-[#e2e6ea] hover:border-[#135bec]/40 transition-all duration-200 text-[#0d121b] shadow-sm overflow-hidden"
                                >
                                    <CardContent className="p-5">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            {/* Left: Tool Info & Rating */}
                                            <div className="space-y-2 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <div className="h-8 w-8 rounded-lg bg-[#f6f6f8] border border-[#e2e6ea] flex items-center justify-center text-[#135bec]">
                                                        <ItemIcon className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <Link
                                                                href={meta.url}
                                                                target="_blank"
                                                                className="font-bold text-sm text-[#0d121b] hover:text-[#135bec] flex items-center gap-1.5 transition-colors"
                                                            >
                                                                <span>{meta.title}</span>
                                                                <ExternalLink className="h-3 w-3 text-[#4c669a]" />
                                                            </Link>
                                                            <Badge
                                                                variant="outline"
                                                                className="text-[10px] uppercase font-semibold text-[#4c669a] border-[#e2e6ea] bg-[#f6f6f8]"
                                                            >
                                                                {meta.type === 'blog' ? 'Blog' : meta.category}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-[11px] text-[#4c669a]">
                                                            Slug: <code className="bg-[#f6f6f8] px-1 py-0.5 rounded text-[10px] text-[#0d121b]">{item.tool_slug}</code>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 pt-1">
                                                    {renderStars(item.rating)}
                                                    {getRatingBadge(item.rating)}
                                                </div>

                                                {/* Comment Body */}
                                                {item.comment ? (
                                                    <div className="mt-3 p-3.5 bg-[#f6f6f8] border border-[#e2e6ea] rounded-xl text-xs text-[#0d121b] leading-relaxed relative">
                                                        <span className="text-[#4c669a] font-serif text-lg leading-none absolute top-2 left-2 opacity-50">&ldquo;</span>
                                                        <p className="pl-3 whitespace-pre-wrap font-medium">
                                                            {item.comment}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="text-[11px] text-[#4c669a] italic pt-1">
                                                        Nenhum comentário por escrito enviado.
                                                    </p>
                                                )}
                                            </div>

                                            {/* Right: User details, date, and actions */}
                                            <div className="flex flex-col md:items-end justify-between self-stretch gap-4 shrink-0 border-t md:border-t-0 md:border-l border-[#e2e6ea] pt-3 md:pt-0 md:pl-5">
                                                <div className="space-y-1 md:text-right">
                                                    <div className="flex items-center md:justify-end gap-1.5 text-xs text-[#0d121b] font-medium">
                                                        <User className="h-3.5 w-3.5 text-[#4c669a]" />
                                                        <span>
                                                            {item.user?.email || (
                                                                <span className="text-[#4c669a] italic">Usuário Anônimo</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                    {item.user?.full_name && (
                                                        <p className="text-[11px] text-[#4c669a]">
                                                            {item.user.full_name}
                                                        </p>
                                                    )}
                                                    <p className="text-[10px] text-[#4c669a]">
                                                        {formatDate(item.created_at)}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => setFeedbackToDelete(item)}
                                                        className="h-8 px-2.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-[#e2e6ea] hover:border-red-200 transition-colors"
                                                        title="Excluir este feedback"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5 mr-1" />
                                                        <span>Excluir</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!feedbackToDelete} onOpenChange={(open) => !open && setFeedbackToDelete(null)}>
                <DialogContent className="sm:max-w-md bg-white border-[#e2e6ea] text-[#0d121b]">
                    <DialogHeader>
                        <div className="flex items-center gap-2 text-red-600 mb-1">
                            <AlertTriangle className="h-5 w-5" />
                            <DialogTitle className="text-base font-bold">Excluir Feedback</DialogTitle>
                        </div>
                        <DialogDescription className="text-xs text-[#4c669a]">
                            Tem certeza que deseja excluir permanentemente esta avaliação? Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>

                    {feedbackToDelete && (
                        <div className="p-3 bg-[#f6f6f8] border border-[#e2e6ea] rounded-xl text-xs space-y-1.5 my-2">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-[#0d121b]">
                                    {resolveItemMeta(feedbackToDelete.tool_slug).title}
                                </span>
                                <span className="font-bold text-amber-500">
                                    {feedbackToDelete.rating} ★
                                </span>
                            </div>
                            {feedbackToDelete.comment && (
                                <p className="text-[#4c669a] line-clamp-2 italic">
                                    &ldquo;{feedbackToDelete.comment}&rdquo;
                                </p>
                            )}
                            <p className="text-[10px] text-[#4c669a]">
                                Autor: {feedbackToDelete.user?.email || 'Anônimo'} • {formatDate(feedbackToDelete.created_at)}
                            </p>
                        </div>
                    )}

                    <DialogFooter className="flex gap-2 sm:justify-end">
                        <Button
                            variant="outline"
                            onClick={() => setFeedbackToDelete(null)}
                            disabled={deleting}
                            className="border-[#e2e6ea] text-[#4c669a]"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteFeedback}
                            disabled={deleting}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                                    Excluindo...
                                </>
                            ) : (
                                'Sim, Excluir'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
