"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { tools } from "@/lib/tools-list"
import { ArrowRight } from "lucide-react"

interface RelatedToolsProps {
    currentToolSlug: string
    category: string
}

export function RelatedTools({ currentToolSlug, category }: RelatedToolsProps) {
    // 1. Filter tools by category
    // 2. Exclude current tool
    // 3. Take first 4 results (or randomize if desired, but stability is better for SEO)
    const relatedTools = tools
        .filter(t => t.category === category && t.slug !== currentToolSlug)
        .slice(0, 4)

    if (relatedTools.length === 0) return null

    // Helper to format title (e.g., "boleto-generator" -> "Boleto Generator")
    const formatTitle = (slug: string) => {
        return slug
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    }

    return (
        <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Ferramentas Relacionadas</h2>
                <Link
                    href="/#tools"
                    className="text-sm font-medium text-primary hover:underline flex items-center"
                >
                    Ver todas
                    <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {relatedTools.map((tool) => (
                    <Link key={tool.slug} href={`/tools/${tool.category}/${tool.slug}`} className="block h-full">
                        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-muted/50 hover:border-border">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">{formatTitle(tool.slug)}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Acesse a ferramenta de {formatTitle(tool.slug)} online.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}
