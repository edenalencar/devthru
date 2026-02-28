"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { tools } from "@/lib/tools-list"
import { ArrowRight } from "lucide-react"

interface RelatedToolsProps {
    currentToolSlug: string
    category: string
    customSlugs?: string[]
}

export function RelatedTools({ currentToolSlug, category, customSlugs }: RelatedToolsProps) {
    // 1. Filter tools by category or custom slugs
    // 2. Exclude current tool
    // 3. Take first 4 results (or randomize if desired, but stability is better for SEO)
    let relatedTools = []

    if (customSlugs && customSlugs.length > 0) {
        // Find tools that match the precise slugs, keeping the requested order as much as possible
        relatedTools = tools.filter(t => customSlugs.includes(t.slug) && t.slug !== currentToolSlug)
    } else {
        relatedTools = tools
            .filter(t => t.category === category && t.slug !== currentToolSlug)
            .slice(0, 4)
    }

    if (relatedTools.length === 0) return null

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
                            <CardHeader className="pb-3 flex-row items-center gap-3 space-y-0">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <tool.icon className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-lg">{tool.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Acesse a ferramenta de {tool.title} online.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}
