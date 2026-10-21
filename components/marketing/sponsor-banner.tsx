"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Megaphone, ExternalLink, Sparkles, Building2 } from "lucide-react"

export interface Sponsor {
    name: string
    description: string
    logoUrl?: string
    ctaText: string
    targetUrl: string
    tag?: string
}

interface SponsorBannerProps {
    sponsor?: Sponsor | null
    toolContext?: string
    className?: string
}

export function SponsorBanner({
    sponsor,
    toolContext,
    className = ""
}: SponsorBannerProps) {
    if (sponsor) {
        return (
            <aside
                aria-label="Patrocinador oficial"
                className={`group relative overflow-hidden rounded-xl border border-border/80 bg-gradient-to-r from-card via-card to-muted/30 p-4 md:p-5 shadow-xs transition-all hover:border-primary/40 ${className}`}
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3.5">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                            {sponsor.logoUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={sponsor.logoUrl}
                                    alt={sponsor.name}
                                    className="size-6 object-contain"
                                />
                            ) : (
                                <Building2 className="size-5" />
                            )}
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                                    Patrocinado por
                                </span>
                                <span className="font-bold text-foreground text-sm sm:text-base">
                                    {sponsor.name}
                                </span>
                                {sponsor.tag && (
                                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary border border-primary/20">
                                        {sponsor.tag}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 max-w-2xl leading-relaxed">
                                {sponsor.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <Button
                            asChild
                            size="sm"
                            className="text-xs font-medium shadow-xs"
                        >
                            <a
                                href={sponsor.targetUrl}
                                target="_blank"
                                rel="sponsored noopener noreferrer"
                            >
                                {sponsor.ctaText}
                                <ExternalLink className="ml-1.5 size-3.5" />
                            </a>
                        </Button>
                    </div>
                </div>
            </aside>
        )
    }

    // Default / Available Sponsor Slot
    return (
        <aside
            aria-label="Espaço reservado para patrocinador"
            className={`group relative overflow-hidden rounded-xl border border-dashed border-border/80 bg-muted/20 p-4 sm:p-5 transition-all hover:bg-muted/40 hover:border-primary/40 ${className}`}
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/5 border border-primary/15 text-primary">
                        <Megaphone className="size-5 text-primary/80" />
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wide">
                                <Sparkles className="size-3" />
                                Espaço para Patrocinador
                            </span>
                            {toolContext && (
                                <span className="text-xs text-muted-foreground hidden md:inline">
                                    • Em {toolContext}
                                </span>
                            )}
                        </div>
                        <h4 className="text-sm font-semibold text-foreground">
                            Sua marca conectada a milhares de desenvolvedores no Brasil
                        </h4>
                        <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                            Exiba sua plataforma de nuvem, API, gateway ou soluções tech diretamente para quem toma decisões técnicas no dia a dia.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="text-xs font-medium hover:border-primary hover:text-primary transition-colors"
                    >
                        <Link href="/anuncie">
                            Anuncie no DevThru
                            <ExternalLink className="ml-1.5 size-3.5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </aside>
    )
}
