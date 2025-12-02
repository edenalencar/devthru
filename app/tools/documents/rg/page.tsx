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
import { Navbar } from "@/components/layout/navbar"

import { getPlanLimitMessage } from "@/lib/constants"

export default function RGGeneratorPage() {
    const [rg, setRg] = useState<string>("")
    const [withPunctuation, setWithPunctuation] = useState<boolean>(true)
    const { isPro, limit } = useUser()

    const generateRG = (formatted: boolean = withPunctuation): string => {
        const n1 = Math.floor(Math.random() * 10)
        const n2 = Math.floor(Math.random() * 10)
        const n3 = Math.floor(Math.random() * 10)
        const n4 = Math.floor(Math.random() * 10)
        const n5 = Math.floor(Math.random() * 10)
        const n6 = Math.floor(Math.random() * 10)
        const n7 = Math.floor(Math.random() * 10)
        const n8 = Math.floor(Math.random() * 10)

        const d = Math.floor(Math.random() * 11)
        const digit = d === 10 ? "X" : d.toString()

        const base = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${digit}`

        if (formatted) {
            return `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}-${digit}`
        }
        return base
    }

    const handleGenerate = () => {
        setRg(generateRG())
    }

    if (!rg) {
        handleGenerate()
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Gerador de RG</h1>
                        <p className="text-muted-foreground">
                            Gere números de Registro Geral (RG) válidos para testes.
                            Nota: O algoritmo de RG varia por estado, este gerador cria um formato genérico válido.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar RG</CardTitle>
                                <CardDescription>Gere um único número de RG</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="punctuation"
                                        checked={withPunctuation}
                                        onChange={(e) => setWithPunctuation(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <Label htmlFor="punctuation">Com pontuação</Label>
                                </div>

                                {rg && (
                                    <ToolResult
                                        result={rg}
                                        toolId="rg"
                                        toolName="RG"
                                        input={{ withPunctuation }}
                                        successMessage="RG gerado com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Novo RG
                                </Button>

                                <ConfigurationManager
                                    toolId="rg"
                                    currentConfig={{ withPunctuation }}
                                    onLoadConfig={(config) => {
                                        if (config.withPunctuation !== undefined) {
                                            setWithPunctuation(config.withPunctuation)
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
                                    generatorFn={() => generateRG(withPunctuation)}
                                    label="RGs"
                                    limit={limit}
                                    isPro={isPro}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de RG</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Gerador de RG cria números de Registro Geral formatados. Como o padrão de RG varia entre os estados brasileiros, esta ferramenta gera um formato comum aceito na maioria dos sistemas de validação.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Os números são gerados aleatoriamente e não possuem vínculo com a base de dados oficial dos órgãos emissores.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}

