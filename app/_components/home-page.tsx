"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
                                        <Card className="group h-full transition-all hover:shadow-lg hover:border-primary cursor-pointer">
                                            <CardHeader>
                                                <div className="flex items-start justify-between mb-2">
                                                    <Icon className="h-8 w-8 text-primary" />
                                                    <div className="flex items-center gap-1.5">
                                                        {!tool.isPro && (
                                                            <Badge variant="outline" className="text-xs border-green-500/50 text-green-600 dark:text-green-400">
                                                                Grátis
                                                            </Badge>
                                                        )}
                                                        {tool.isPro && (
                                                            <Badge variant="secondary" className="text-xs">
                                                                PRO
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                <CardTitle>{tool.name}</CardTitle>
                                                <CardDescription>{tool.description}</CardDescription>
                                                <span className="text-sm font-medium text-primary flex items-center gap-1 pt-2 group-hover:gap-2 transition-all">
                                                    Usar ferramenta
                                                    <ArrowRight className="h-3.5 w-3.5" />
                                                </span>
                                            </CardHeader>
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
