"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Zap, FileSpreadsheet, History } from "lucide-react"
import { useUser } from "@/lib/hooks/use-user"

interface ToolProCtaProps {
    toolName?: string
    badge?: string
    title?: string
    description?: string
    className?: string
}

export function ToolProCta({
    toolName,
    badge = "Recursos Avançados",
    title,
    description = "Gere dados em grande volume (até 1.000 registros por vez), exporte instantaneamente para CSV, JSON e Excel e salve suas configurações personalizadas.",
    className = ""
}: ToolProCtaProps) {
    const { profile } = useUser()

    // Oculta apenas se o usuário já possuir uma assinatura paga ativa (pro ou business)
    const isPayingSubscriber = profile?.subscription_tier === "pro" || profile?.subscription_tier === "business"
    if (isPayingSubscriber) {
        return null
    }

    const heading = title || (toolName
        ? `Precisa de escala em testes com ${toolName}?`
        : "Precisa de maior escala para seus testes de software?")

    return (
        <section
            aria-label="Vantagens do Plano Pro"
            className={`relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-card to-primary/10 p-5 md:p-6 shadow-sm my-8 [content-visibility:auto] [contain-intrinsic-size:1px_200px] ${className}`}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        <span>{badge}</span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                        {heading}
                    </h3>

                    <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                        {description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1.5">
                            <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                            Geração em Lote (1.000 itens)
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            Exportação CSV, JSON e Excel
                        </span>
                        <span className="flex items-center gap-1.5">
                            <History className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                            Salvar Configurações & Histórico
                        </span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-center gap-2 shrink-0">
                    <Button asChild size="lg" className="w-full sm:w-auto shadow-sm">
                        <Link href="/pricing">
                            Conhecer Plano Pro
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <span className="text-xs text-muted-foreground">A partir de R$ 29/mês • Sem fidelidade</span>
                </div>
            </div>
        </section>
    )
}
