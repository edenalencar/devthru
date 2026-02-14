'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ToolResult } from '@/components/tools/tool-result'
import { BulkGenerator } from '@/components/tools/bulk-generator'
import { RefreshCw, CheckCircle2, XCircle } from 'lucide-react'
import { generatePIS, validatePIS, formatPIS } from '@/lib/utils/validators/pis'
import { ShareButtons } from "@/components/share-buttons"
import { useUser } from '@/lib/hooks/use-user'
import { getPlanLimitMessage } from "@/lib/constants"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export function PISPage() {
    const [generatedPIS, setGeneratedPIS] = useState('')
    const [validateInput, setValidateInput] = useState('')
    const [validateResult, setValidateResult] = useState<boolean | null>(null)
    const [activeTab, setActiveTab] = useState<'generate' | 'validate' | 'bulk'>('generate')
    const { isPro, limit } = useUser()

    const handleGenerate = () => {
        const pis = generatePIS()
        const formatted = formatPIS(pis)
        setGeneratedPIS(formatted)
    }

    const handleValidate = () => {
        const isValid = validatePIS(validateInput)
        setValidateResult(isValid)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Documentos Pessoais" }, { "label": "PIS/PASEP" }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">Gerador de PIS/PASEP</h1>
                        <p className="text-lg text-muted-foreground">
                            Gere e valide números de PIS/PASEP válidos para testes
                        </p>
                    </div>

                    {/* Tab Buttons */}
                    <div className="flex gap-2 mb-6">
                        <Button
                            variant={activeTab === 'generate' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('generate')}
                        >
                            Gerar
                        </Button>
                        <Button
                            variant={activeTab === 'validate' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('validate')}
                        >
                            Validar
                        </Button>
                        <Button
                            variant={activeTab === 'bulk' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('bulk')}
                        >
                            Geração em Lote
                        </Button>
                    </div>

                    {/* Generate Section */}
                    {activeTab === 'generate' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar PIS/PASEP</CardTitle>
                                <CardDescription>
                                    Gere um número válido de PIS/PASEP
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {generatedPIS && (
                                    <ToolResult
                                        result={generatedPIS}
                                        toolId="pis"
                                        toolName="PIS/PASEP"
                                        successMessage="PIS/PASEP gerado com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar PIS/PASEP
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Validate Section */}
                    {activeTab === 'validate' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Validar PIS/PASEP</CardTitle>
                                <CardDescription>
                                    Verifique se um número de PIS/PASEP é válido
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Número do PIS/PASEP</Label>
                                    <Input
                                        placeholder="000.00000.00-0"
                                        value={validateInput}
                                        onChange={(e) => setValidateInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
                                    />
                                </div>

                                {validateResult !== null && (
                                    <div
                                        className={`flex items-center gap-2 p-4 rounded-lg ${validateResult
                                            ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                                            : 'bg-red-500/10 text-red-600 dark:text-red-400'
                                            }`}
                                    >
                                        {validateResult ? (
                                            <>
                                                <CheckCircle2 className="h-5 w-5" />
                                                <span className="font-semibold">PIS/PASEP válido!</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5" />
                                                <span className="font-semibold">PIS/PASEP inválido</span>
                                            </>
                                        )}
                                    </div>
                                )}

                                <Button onClick={handleValidate} className="w-full">
                                    Validar PIS/PASEP
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Bulk Section */}
                    {activeTab === 'bulk' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Geração em Lote</CardTitle>
                                <CardDescription>
                                    {getPlanLimitMessage(limit)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BulkGenerator
                                    generatorFn={() => formatPIS(generatePIS())}
                                    label="PIS/PASEP"
                                    limit={limit}
                                    isPro={isPro}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* Info Card */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Sobre o PIS/PASEP</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    O PIS (Programa de Integração Social) e o PASEP (Programa de Formação do Patrimônio do Servidor Público)
                                    são programas de contribuição social. O número de inscrição é o mesmo para ambos e também é utilizado
                                    como NIS (Número de Identificação Social) e NIT (Número de Inscrição do Trabalhador).
                                </p>
                                <p>
                                    O número é composto por 11 dígitos, sendo os primeiros 10 a base e o último o dígito verificador.
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Atenção:</strong> Os números gerados são válidos apenas para testes e desenvolvimento.
                                    Não correspondem a documentos reais.
                                </p>
                            </div>
                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de PIS/PASEP"
                                    description="Gere e valide números de PIS/PASEP para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>


        </div>
    )
}
