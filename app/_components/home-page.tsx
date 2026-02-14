"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { tools, toolCategories } from "@/config/tools"
import { Search, ArrowRight } from "lucide-react"

export function HomePageClient() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const filteredTools = tools.filter((tool) => {
        const matchesSearch =
            tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !selectedCategory || tool.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Hero */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
                            Gere Dados de Teste em Segundos
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            CPF, CNPJ, cartões, NF-e e mais — válidos e prontos para uso. Sem cadastro. Sem complicação.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="mb-8 max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar ferramentas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="mb-8 flex flex-wrap gap-2 justify-center">
                        <Badge
                            variant={selectedCategory === null ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setSelectedCategory(null)}
                        >
                            Todas
                        </Badge>
                        {toolCategories.map((category) => {
                            const Icon = category.icon
                            return (
                                <Badge
                                    key={category.id}
                                    variant={selectedCategory === category.id ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    <Icon className="mr-1 h-3 w-3" />
                                    {category.name}
                                </Badge>
                            )
                        })}
                    </div>

                    {/* Tools Grid */}
                    {filteredTools.length > 0 ? (
                        <div id="tools-grid" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredTools.map((tool) => {
                                const Icon = tool.icon
                                return (
                                    <Link key={tool.id} href={tool.href}>
                                        <Card className="group h-full flex flex-col transition-all hover:shadow-lg hover:border-primary cursor-pointer border-muted/50 hover:border-primary/50 relative overflow-hidden">
                                            <CardHeader className="flex-1 pb-2">
                                                <div className="flex items-start gap-4 mb-2">
                                                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                                                        <Icon className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                                                            {tool.isPro && (
                                                                <Badge variant="secondary" className="text-xs font-medium shrink-0">
                                                                    PRO
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <CardDescription className="text-sm leading-relaxed mt-2 line-clamp-2">{tool.description}</CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-0 mt-auto pb-6">
                                                <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Usar ferramenta
                                                    <ArrowRight className="h-4 w-4" />
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-lg text-muted-foreground">
                                Nenhuma ferramenta encontrada para &quot;{searchQuery}&quot;
                            </p>
                        </div>
                    )}


                </div>
            </main>

            <Footer />
        </div>
    )
}
