"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2, Briefcase, Star } from "lucide-react"
import { toast } from "sonner"
import { ConfigurationManager } from "@/components/tools/configuration-manager"
import { Badge } from "@/components/ui/badge"

interface Cnae {
    id: string
    descricao: string
}

export default function CnaeSearchPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState<Cnae[]>([])
    const [loading, setLoading] = useState(false)
    const [favorites, setFavorites] = useState<Cnae[]>([])

    // Load favorites from ConfigurationManager
    const handleLoadConfig = (config: any) => {
        if (config.favorites) {
            setFavorites(config.favorites)
            toast.success("Favoritos carregados!")
        }
    }

    const searchCnae = async () => {
        if (!searchTerm.trim()) return

        setLoading(true)
        try {
            // IBGE API for CNAE Subclasses (most detailed level)
            const response = await fetch("https://servicodados.ibge.gov.br/api/v2/cnae/subclasses")
            if (!response.ok) throw new Error("Falha ao buscar dados")

            const data: Cnae[] = await response.json()

            // Client-side filtering because API doesn't support search by term easily
            const filtered = data.filter(item =>
                item.id.includes(searchTerm) ||
                item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0, 50) // Limit to 50 results

            setResults(filtered)

            if (filtered.length === 0) {
                toast.info("Nenhum CNAE encontrado para o termo pesquisado.")
            }
        } catch (error) {
            console.error(error)
            toast.error("Erro ao buscar CNAEs. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    const toggleFavorite = (cnae: Cnae) => {
        setFavorites(prev => {
            const exists = prev.find(f => f.id === cnae.id)
            if (exists) {
                return prev.filter(f => f.id !== cnae.id)
            } else {
                return [...prev, cnae]
            }
        })
    }

    const isFavorite = (id: string) => favorites.some(f => f.id === id)

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
                            <Briefcase className="h-8 w-8 text-primary" />
                            Busca de CNAE
                        </h1>
                        <p className="text-muted-foreground">
                            Pesquise códigos e descrições da Classificação Nacional de Atividades Econômicas.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pesquisa</CardTitle>
                                    <CardDescription>Digite o código ou palavra-chave (ex: "Programação", "6201-5")</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <Label htmlFor="search" className="sr-only">Pesquisar</Label>
                                            <Input
                                                id="search"
                                                placeholder="Digite para buscar..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && searchCnae()}
                                            />
                                        </div>
                                        <Button onClick={searchCnae} disabled={loading}>
                                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                                            <span className="ml-2 hidden sm:inline">Buscar</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {favorites.length > 0 && (
                                <Card className="border-primary/20 bg-primary/5">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Star className="h-5 w-5 fill-primary text-primary" />
                                            Meus Favoritos
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-2">
                                            {favorites.map((item) => (
                                                <div key={item.id} className="flex items-start justify-between p-3 bg-background rounded-md border shadow-sm">
                                                    <div>
                                                        <div className="font-mono font-bold text-primary">{item.id}</div>
                                                        <div className="text-sm text-muted-foreground">{item.descricao}</div>
                                                    </div>
                                                    <Button variant="ghost" size="icon" onClick={() => toggleFavorite(item)}>
                                                        <Star className="h-4 w-4 fill-primary text-primary" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {results.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Resultados</CardTitle>
                                        <CardDescription>Encontrados {results.length} registros</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-2">
                                            {results.map((item) => (
                                                <div key={item.id} className="flex items-start justify-between p-3 rounded-md border hover:bg-muted/50 transition-colors">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant="outline" className="font-mono">{item.id}</Badge>
                                                        </div>
                                                        <div className="mt-1 text-sm">{item.descricao}</div>
                                                    </div>
                                                    <Button variant="ghost" size="icon" onClick={() => toggleFavorite(item)}>
                                                        <Star className={`h-4 w-4 ${isFavorite(item.id) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardContent className="pt-6">
                                    <ConfigurationManager
                                        toolId="cnae-search"
                                        currentConfig={{ favorites }}
                                        onLoadConfig={handleLoadConfig}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
