"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { tools } from "@/lib/tools-list"
import { ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/seo/json-ld"

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
        const categoryTools = tools.filter(t => t.category === category)
        const currentIndex = categoryTools.findIndex(t => t.slug === currentToolSlug)

        if (currentIndex !== -1) {
            relatedTools = []
            for (let i = 1; i <= 4; i++) {
                const nextIndex = (currentIndex + i) % categoryTools.length
                const candidate = categoryTools[nextIndex]
                if (candidate && candidate.slug !== currentToolSlug) {
                    relatedTools.push(candidate)
                }
            }
            relatedTools = relatedTools.slice(0, 4)
        } else {
            relatedTools = categoryTools.filter(t => t.slug !== currentToolSlug).slice(0, 4)
        }
    }

    if (relatedTools.length === 0) return null

    return (
        <section className="mt-12">
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "itemListElement": relatedTools.map((tool, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "url": `https://www.devthru.com/tools/${tool.category}/${tool.slug}`,
                        "name": tool.title
                    }))
                }}
            />
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

            <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 m-0 p-0 list-none">
                {relatedTools.map((tool) => (
                    <li key={tool.slug}>
                        <Link href={`/tools/${tool.category}/${tool.slug}`} className="block h-full">
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
                    </li>
                ))}
            </ol>
        </section>
    )
}
