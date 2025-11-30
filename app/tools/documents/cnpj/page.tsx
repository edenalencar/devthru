"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToolResult } from "@/components/tools/tool-result"
import { generateCNPJ, validateCNPJ, formatCNPJ } from "@/lib/utils/validators/cnpj"
import { Code2, CheckCircle2, XCircle } from "lucide-react"
import { ConfigurationManager } from "@/components/tools/configuration-manager"

import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"

export default function CNPJGeneratorPage() {
    const [generatedCNPJ, setGeneratedCNPJ] = useState("")
    const [formatted, setFormatted] = useState(true)
    const [alphanumeric, setAlphanumeric] = useState(false)
    const [validationInput, setValidationInput] = useState("")
    const [validationResult, setValidationResult] = useState<boolean | null>(null)

    const { isPro, limit } = useUser()

    const handleGenerate = () => {
        const cnpj = generateCNPJ(alphanumeric)
        setGeneratedCNPJ(formatted ? formatCNPJ(cnpj) : cnpj)
    }

    const handleValidate = () => {
        setValidationResult(validateCNPJ(validationInput))
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Code2 className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de CNPJ</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere CNPJs válidos para testes e desenvolvimento. Valide CNPJs existentes.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar CNPJ</CardTitle>
                                <CardDescription>
                                    Gere um CNPJ válido aleatório
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="formatted"
                                            checked={formatted}
                                            onChange={(e) => setFormatted(e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="formatted">Formatar CNPJ (xx.xxx.xxx/xxxx-xx)</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="alphanumeric"
                                            checked={alphanumeric}
                                            onChange={(e) => setAlphanumeric(e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="alphanumeric">Gerar CNPJ Alfanumérico</Label>
                                    </div>
                                </div>

                                <Button onClick={handleGenerate} className="w-full" size="lg">
                                    Gerar CNPJ
                                </Button>

                                {generatedCNPJ && (
                                    <ToolResult
                                        result={generatedCNPJ}
                                        toolId="cnpj"
                                        toolName="CNPJ"
                                        input={{ formatted, alphanumeric }}
                                        successMessage="CNPJ válido gerado com sucesso"
                                    />
                                )}
                            </CardContent>
                        </Card>

                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Geração em Massa</CardTitle>
                                    <CardDescription>
                                        {getPlanLimitMessage(limit)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <BulkGenerator
                                        generatorFn={() => {
                                            const cnpj = generateCNPJ(alphanumeric)
                                            return formatted ? formatCNPJ(cnpj) : cnpj
                                        }}
                                        label="CNPJs"
                                        limit={limit}
                                        isPro={isPro}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Validar CNPJ</CardTitle>
                                    <CardDescription>
                                        Verifique se um CNPJ é válido
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cnpj-input">CNPJ para validar</Label>
                                        <Input
                                            id="cnpj-input"
                                            placeholder="00.000.000/0000-00"
                                            value={validationInput}
                                            onChange={(e) => setValidationInput(e.target.value)}
                                            className="font-mono"
                                        />
                                    </div>

                                    <Button onClick={handleValidate} className="w-full" size="lg" variant="outline">
                                        Validar
                                    </Button>

                                    {validationResult !== null && (
                                        <div className="rounded-lg border p-4">
                                            {validationResult ? (
                                                <div className="flex items-center gap-3">
                                                    <CheckCircle2 className="h-6 w-6 text-accent" />
                                                    <div>
                                                        <p className="font-semibold text-accent">CNPJ Válido</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Este CNPJ passou na validação
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <XCircle className="h-6 w-6 text-destructive" />
                                                    <div>
                                                        <p className="font-semibold text-destructive">CNPJ Inválido</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Este CNPJ não passou na validação
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Configuration Manager */}
                    <div className="mt-8">
                        <Card>
                            <CardContent className="pt-6">
                                <ConfigurationManager
                                    toolId="cnpj"
                                    currentConfig={{ formatted }}
                                    onLoadConfig={(config) => {
                                        if (config.formatted !== undefined) {
                                            setFormatted(config.formatted)
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de CNPJ</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O CNPJ (Cadastro Nacional da Pessoa Jurídica) é um documento brasileiro usado para identificação fiscal de empresas.
                                Esta ferramenta gera CNPJs válidos usando o algoritmo oficial de validação.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Os CNPJs gerados são válidos apenas do ponto de vista algorítmico.
                                Eles não estão registrados na Receita Federal e devem ser usados apenas para testes e desenvolvimento.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    )
}
