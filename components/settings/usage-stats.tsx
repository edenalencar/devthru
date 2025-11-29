'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BarChart3, TrendingUp, Zap } from 'lucide-react'

interface UsageData {
    period: string
    used: number
    limit: number
    remaining: number
    resetAt: string
    topTools: Array<{ tool: string; count: number }>
}

interface UsageStatsProps {
    apiKey: string | null
}

export function UsageStats({ apiKey }: UsageStatsProps) {
    const [usage, setUsage] = useState<UsageData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!apiKey) {
            setLoading(false)
            return
        }

        const fetchUsage = async () => {
            try {
                const response = await fetch('/api/v1/usage', {
                    headers: {
                        'x-api-key': apiKey,
                    },
                })
                const data = await response.json()
                if (data.success) {
                    setUsage(data)
                }
            } catch (error) {
                console.error('Error fetching usage:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchUsage()
    }, [apiKey])

    if (!apiKey) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Estatísticas de Uso
                    </CardTitle>
                    <CardDescription>
                        Gere uma API key para ver suas estatísticas
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Estatísticas de Uso
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Carregando...</p>
                </CardContent>
            </Card>
        )
    }

    if (!usage) {
        return null
    }

    const usagePercent = usage.limit === -1 ? 0 : (usage.used / usage.limit) * 100
    const isUnlimited = usage.limit === -1

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Estatísticas de Uso
                </CardTitle>
                <CardDescription>
                    Período: {usage.period === 'monthly' ? 'Mensal' : usage.period}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Usage Progress */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Requisições</span>
                        <span className="font-semibold">
                            {usage.used.toLocaleString()} {!isUnlimited && `/ ${usage.limit.toLocaleString()}`}
                        </span>
                    </div>
                    {!isUnlimited && (
                        <>
                            <Progress value={usagePercent} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                                {usage.remaining.toLocaleString()} requisições restantes
                            </p>
                        </>
                    )}
                    {isUnlimited && (
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                            <Zap className="h-4 w-4" />
                            <span>Requisições ilimitadas (Pro)</span>
                        </div>
                    )}
                </div>

                {/* Top Tools */}
                {usage.topTools && usage.topTools.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Ferramentas Mais Usadas
                        </h4>
                        <div className="space-y-2">
                            {usage.topTools.map((tool) => (
                                <div key={tool.tool} className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground capitalize">{tool.tool}</span>
                                    <span className="font-semibold">{tool.count.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Reset Date */}
                <div className="text-xs text-muted-foreground pt-2 border-t">
                    Próximo reset: {new Date(usage.resetAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
