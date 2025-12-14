"use client"

import { useEffect, useState, useCallback } from "react"
import { useUser } from "@/lib/hooks/use-user"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { History, BarChart3, Zap, Trash2, ArrowRight, Download } from "lucide-react"
import Link from "next/link"
import { tools } from "@/config/tools"
import { getHistory, getHistoryStats, clearHistory, GenerationHistory } from "@/lib/storage/history"
import { getHistoryFromSupabase } from "@/lib/supabase/history"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { exportToCSV } from "@/lib/export/csv"
import { exportToExcel } from "@/lib/export/excel"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
    const [history, setHistory] = useState<GenerationHistory[]>([])
    const [stats, setStats] = useState<any>(null) // eslint-disable-line @typescript-eslint/no-explicit-any
    const { user } = useUser()
    const supabase = createClient()

    const loadData = useCallback(async (currentUser: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        // setLoading(true)
        try {
            if (currentUser) {
                // Load from Supabase
                const supabaseHistory = await getHistoryFromSupabase(50, currentUser.id)
                setHistory(supabaseHistory)

                // Calculate stats from Supabase history (simplified for now)
                const toolCounts: Record<string, number> = {}
                supabaseHistory.forEach((item) => {
                    toolCounts[item.toolId] = (toolCounts[item.toolId] || 0) + 1
                })
                const mostUsedTool = Object.entries(toolCounts).sort((a, b) => b[1] - a[1])[0]

                setStats({
                    totalGenerations: supabaseHistory.length,
                    mostUsedTool: mostUsedTool ? { id: mostUsedTool[0], count: mostUsedTool[1] } : null,
                })
            } else {
                // Load from LocalStorage
                setHistory(getHistory())
                setStats(getHistoryStats())
            }
        } catch (error) {
            console.error("Error loading data:", error)
            toast.error("Erro ao carregar dados")
        } finally {
            // setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (user) {
            loadData(user)
        }
    }, [user, loadData])

    const handleClearHistory = () => {
        if (confirm("Tem certeza que deseja limpar todo o histórico?")) {
            clearHistory()
            loadData(user)
            toast.success("Histórico limpo com sucesso!")
        }
    }

    const handleExport = (format: 'csv' | 'excel') => {
        const data = history.map(item => ({
            Ferramenta: item.toolName,
            Data: new Date(item.timestamp).toLocaleString(),
            Input: JSON.stringify(item.input),
            Output: JSON.stringify(item.output)
        }))

        if (format === 'csv') {
            exportToCSV(data, 'historico_devtools')
        } else {
            exportToExcel(data, 'historico_devtools')
        }
        toast.success(`Exportado para ${format.toUpperCase()} com sucesso!`)
    }

    const getToolIcon = (toolId: string) => {
        const tool = tools.find(t => t.id === toolId)
        return tool?.icon || Zap
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto w-full">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Visão geral das suas atividades e gerações recentes.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total de Gerações
                        </CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalGenerations || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            +0% em relação ao mês passado
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Ferramenta Favorita
                        </CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats?.mostUsedTool ? (
                                tools.find(t => t.id === stats.mostUsedTool.id)?.name || stats.mostUsedTool.id
                            ) : (
                                "-"
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {stats?.mostUsedTool ? `${stats.mostUsedTool.count} usos` : "Nenhuma ferramenta usada"}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Última Geração
                        </CardTitle>
                        <History className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {history.length > 0 ? new Date(history[0].timestamp).toLocaleDateString() : "-"}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {history.length > 0 ? new Date(history[0].timestamp).toLocaleTimeString() : "Sem atividade recente"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent History */}
                <Card className="col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Histórico Recente</CardTitle>
                            <CardDescription>
                                Suas últimas 10 gerações de conteúdo.
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <Download className="mr-2 h-4 w-4" />
                                        Exportar
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))]">
                                    <DropdownMenuItem onClick={() => handleExport('csv')}>
                                        Exportar CSV
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleExport('excel')}>
                                        Exportar Excel
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button variant="destructive" size="sm" onClick={handleClearHistory}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Limpar
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {history.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    Nenhum histórico encontrado. Comece a usar as ferramentas!
                                </div>
                            ) : (
                                history.slice(0, 10).map((item) => {
                                    const Icon = getToolIcon(item.toolId)
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 border rounded-lg"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-primary/10 rounded-full">
                                                    <Icon className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{item.toolName}</p>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {new Date(item.timestamp).toLocaleTimeString()}
                                                        </Badge>
                                                        <span className="text-sm text-muted-foreground">
                                                            {new Date(item.timestamp).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                                {JSON.stringify(item.output).slice(0, 50)}...
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Access */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Acesso Rápido</CardTitle>
                        <CardDescription>
                            Ferramentas populares que você pode gostar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            {tools.slice(0, 5).map((tool) => (
                                <Link
                                    key={tool.id}
                                    href={tool.href}
                                    className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-muted group-hover:bg-background rounded-md transition-colors">
                                            <tool.icon className="h-4 w-4" />
                                        </div>
                                        <span className="font-medium">{tool.title}</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                            <Button variant="outline" className="w-full mt-2" asChild>
                                <Link href="/">
                                    Ver Todas as Ferramentas
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
