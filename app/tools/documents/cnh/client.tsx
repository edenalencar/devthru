"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ToolResult } from "@/components/tools/tool-result"
import { RefreshCw } from "lucide-react"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"
import { ConfigurationManager } from "@/components/tools/configuration-manager"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Navbar } from "@/components/layout/navbar"
import { getPlanLimitMessage } from "@/lib/constants"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export function CNHGeneratorPage() {
    const [cnh, setCnh] = useState<string>("")
    const [withPunctuation, setWithPunctuation] = useState<boolean>(false)
    const [bulkQuantity, setBulkQuantity] = useState<number>(5)
    const { isPro, limit } = useUser()

    const generateCNH = (): string => {
        const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))

        let v1 = 0
        for (let i = 0; i < 9; i++) {
            v1 += n[i] * (9 - i)
        }
        let d1 = v1 % 11
        d1 = d1 >= 10 ? 0 : d1

        let v2 = 0
        let j = 0
        for (let i = 0; i < 9; i++) {
            v2 += n[i] * (1 + j)
            j++
        }

        let d2 = (v2 + d1 * 9) % 11
        d2 = d2 >= 10 ? 0 : d2

        const base = n.join("")
        const fullCNH = `${base}${d1}${d2}`

        return fullCNH
    }

    const handleGenerate = () => {
        setCnh(generateCNH())
    }

    if (!cnh) {
        handleGenerate()
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Documentos Pessoais", href: "/ferramentas-documentos" },
                        { label: "Gerador de CNH" }
                    ]} className="mb-6" />

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Gerador de CNH</h1>
                        <p className="text-muted-foreground">
                            Gere números de Carteira Nacional de Habilitação (CNH) válidos para testes.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar CNH</CardTitle>
                                <CardDescription>Gere um único número de CNH</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {cnh && (
                                    <ToolResult
                                        result={cnh}
                                        toolId="cnh"
                                        toolName="CNH"
                                        input={{ withPunctuation }}
                                        successMessage="CNH gerada com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Nova CNH
                                </Button>

                                <ConfigurationManager
                                    toolId="cnh"
                                    currentConfig={{ withPunctuation, quantity: bulkQuantity }}
                                    onLoadConfig={(config) => {
                                        if (config.withPunctuation !== undefined) {
                                            setWithPunctuation(config.withPunctuation)
                                        }
                                        if (config.quantity) {
                                            setBulkQuantity(config.quantity)
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Geração em Massa</CardTitle>
                                <CardDescription>
                                    {getPlanLimitMessage(limit)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BulkGenerator
                                    generatorFn={() => generateCNH()}
                                    label="CNHs"
                                    limit={limit}
                                    isPro={isPro}
                                    quantity={bulkQuantity}
                                    onQuantityChange={setBulkQuantity}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de CNH</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <p>
                                    O Gerador de CNH cria números de Carteira Nacional de Habilitação válidos matematicamente para fins de teste de software.
                                    Ele utiliza o algoritmo oficial para calcular os dígitos verificadores.
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Nota:</strong> Os números gerados são fictícios e não correspondem a documentos reais. O uso é estritamente para desenvolvimento e testes.
                                </p>
                            </div>
                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de CNH"
                                    description="Gere números de CNH válidos para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="container mx-auto pb-10">
                    <RelatedTools currentToolSlug="cnh" category="documents" />
                </div>
            </main>

        </div>
    )
}
