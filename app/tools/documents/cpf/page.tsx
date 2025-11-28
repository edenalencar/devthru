"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/copy-button"
import { generateCPF, validateCPF, formatCPF } from "@/lib/utils/validators/cpf"
import { FileText, CheckCircle2, XCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { BulkGenerator } from "@/components/tools/bulk-generator"

export default function CPFGeneratorPage() {
    const [generatedCPF, setGeneratedCPF] = useState("")
    const [formatted, setFormatted] = useState(true)
    const [validationInput, setValidationInput] = useState("")
    const [validationResult, setValidationResult] = useState<boolean | null>(null)
    const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single')
    const [isPro, setIsPro] = useState(false)
    const [loadingProfile, setLoadingProfile] = useState(true)

    const supabase = createClient()

    useEffect(() => {
        checkSubscription()
    }, [])

    const checkSubscription = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('subscription_tier')
                    .eq('id', user.id)
                    .single()

                const userProfile = profile as { subscription_tier: string } | null
                setIsPro(userProfile?.subscription_tier === 'pro' || userProfile?.subscription_tier === 'enterprise')
            }
        } catch (error) {
            console.error("Error checking subscription:", error)
        } finally {
            setLoadingProfile(false)
        }
    }

    const handleGenerate = () => {
        const cpf = generateCPF()
        setGeneratedCPF(formatted ? formatCPF(cpf) : cpf)
    }

    const handleValidate = () => {
        setValidationResult(validateCPF(validationInput))
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de CPF</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere CPFs válidos para testes e desenvolvimento. Valide CPFs existentes.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-2 mb-6">
                        <Button
                            variant={activeTab === 'single' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('single')}
                        >
                            Gerar Único
                        </Button>
                        <Button
                            variant={activeTab === 'bulk' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('bulk')}
                        >
                            Gerar em Massa
                        </Button>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {activeTab === 'single' ? (
                            /* Generator Card */
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gerar CPF</CardTitle>
                                    <CardDescription>
                                        Gere um CPF válido aleatório
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="formatted"
                                            checked={formatted}
                                            onChange={(e) => setFormatted(e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="formatted">Formatar CPF (xxx.xxx.xxx-xx)</Label>
                                    </div>

                                    <Button onClick={handleGenerate} className="w-full" size="lg">
                                        Gerar CPF
                                    </Button>

                                    {generatedCPF && (
                                        <div className="space-y-3">
                                            <div className="rounded-lg border bg-muted p-4">
                                                <div className="flex items-center justify-between">
                                                    <code className="text-2xl font-mono font-bold">
                                                        {generatedCPF}
                                                    </code>
                                                    <CopyButton text={generatedCPF} />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <CheckCircle2 className="h-4 w-4 text-accent" />
                                                CPF válido gerado com sucesso
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ) : (
                            /* Bulk Generator Card */
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>Geração em Massa</CardTitle>
                                    <CardDescription>
                                        Gere múltiplos CPFs de uma vez. {isPro ? "Limite: 10.000 itens." : "Limite Grátis: 50 itens."}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <BulkGenerator
                                        generatorFn={() => {
                                            const cpf = generateCPF()
                                            return formatted ? formatCPF(cpf) : cpf
                                        }}
                                        label="CPFs"
                                        limit={isPro ? 10000 : 50}
                                        isPro={isPro}
                                    />
                                    <div className="flex items-center space-x-2 mt-4">
                                        <input
                                            type="checkbox"
                                            id="formatted-bulk"
                                            checked={formatted}
                                            onChange={(e) => setFormatted(e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="formatted-bulk">Formatar CPFs</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Validator Card - Always visible in Single mode, hidden or moved in Bulk? Keeping it visible only in Single for now to match layout */}
                        {activeTab === 'single' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Validar CPF</CardTitle>
                                    <CardDescription>
                                        Verifique se um CPF é válido
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cpf-input">CPF para validar</Label>
                                        <Input
                                            id="cpf-input"
                                            placeholder="000.000.000-00"
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
                                                        <p className="font-semibold text-accent">CPF Válido</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Este CPF passou na validação
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <XCircle className="h-6 w-6 text-destructive" />
                                                    <div>
                                                        <p className="font-semibold text-destructive">CPF Inválido</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Este CPF não passou na validação
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de CPF</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O CPF (Cadastro de Pessoas Físicas) é um documento brasileiro usado para identificação fiscal.
                                Esta ferramenta gera CPFs válidos usando o algoritmo oficial de validação.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Os CPFs gerados são válidos apenas do ponto de vista algorítmico.
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
