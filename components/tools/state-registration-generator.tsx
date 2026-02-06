'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ToolResult } from '@/components/tools/tool-result'
import { BulkGenerator } from '@/components/tools/bulk-generator'
import { RefreshCw, CheckCircle2, XCircle } from 'lucide-react'
import { generateIE, validateIE, formatIE, IE_STATES } from '@/lib/utils/validators/inscricao-estadual'
import { useUser } from '@/lib/hooks/use-user'
import { getPlanLimitMessage } from "@/lib/constants"
import { ShareButtons } from "@/components/share-buttons"

interface StateRegistrationGeneratorProps {
    defaultState?: string
}

export function StateRegistrationGenerator({ defaultState }: StateRegistrationGeneratorProps) {
    const [selectedUF, setSelectedUF] = useState(defaultState || IE_STATES[0].uf)
    const [generatedIE, setGeneratedIE] = useState('')
    const [validateInput, setValidateInput] = useState('')
    const [validateResult, setValidateResult] = useState<boolean | null>(null)
    const [activeTab, setActiveTab] = useState<'generate' | 'validate' | 'bulk'>('generate')
    const { isPro, limit } = useUser()

    // Update selectedUF if defaultState changes
    useEffect(() => {
        if (defaultState) {
            setSelectedUF(defaultState)
        }
    }, [defaultState])

    const handleGenerate = () => {
        const ie = generateIE(selectedUF)
        const formatted = formatIE(ie, selectedUF)
        setGeneratedIE(formatted)
    }

    const handleValidate = () => {
        const isValid = validateIE(validateInput, selectedUF)
        setValidateResult(isValid)
    }

    const stateInfo = IE_STATES.find(s => s.uf === selectedUF)

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Inscrição Estadual</h1>
                <p className="text-lg text-muted-foreground">
                    Gere e valide Inscrições Estaduais de todas as UFs brasileiras
                </p>
                <a href="/ferramentas-fiscais" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2">
                    ← Suíte de Ferramentas Fiscais
                </a>
            </div>

            {/* State Selector */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Selecione o Estado</CardTitle>
                    <CardDescription>
                        Cada estado possui formato e algoritmo próprios
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Estado (UF)</Label>
                            <Select value={selectedUF} onValueChange={setSelectedUF}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px]">
                                    {IE_STATES.map((state) => (
                                        <SelectItem key={state.uf} value={state.uf}>
                                            {state.uf} - {state.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {stateInfo && (
                            <div className="space-y-2">
                                <Label>Formato</Label>
                                <div className="p-3 bg-muted rounded-lg">
                                    <code className="text-sm font-mono">{stateInfo.format}</code>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {stateInfo.length} dígitos
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

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
                        <CardTitle>Gerar Inscrição Estadual</CardTitle>
                        <CardDescription>
                            Gere uma IE válida para {stateInfo?.name || 'o estado selecionado'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {generatedIE && (
                            <ToolResult
                                result={generatedIE}
                                toolId="inscricao-estadual"
                                toolName="Inscrição Estadual"
                                input={{ uf: selectedUF }}
                                successMessage={`IE de ${stateInfo?.name} gerada com sucesso`}
                            />
                        )}

                        <Button onClick={handleGenerate} className="w-full">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Gerar Nova IE
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Validate Section */}
            {activeTab === 'validate' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Validar Inscrição Estadual</CardTitle>
                        <CardDescription>
                            Verifique se uma IE de {stateInfo?.name || 'o estado selecionado'} é válida
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Inscrição Estadual</Label>
                            <Input
                                placeholder={stateInfo?.format || 'Digite a IE'}
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
                                        <span className="font-semibold">IE válida!</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="h-5 w-5" />
                                        <span className="font-semibold">IE inválida</span>
                                    </>
                                )}
                            </div>
                        )}

                        <Button onClick={handleValidate} className="w-full">
                            Validar IE
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
                            generatorFn={() => formatIE(generateIE(selectedUF), selectedUF)}
                            label="Inscrição Estadual"
                            limit={limit}
                            isPro={isPro}
                        />
                    </CardContent>
                </Card>
            )}

            {/* Info Card */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Sobre a Inscrição Estadual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                        A Inscrição Estadual é um registro obrigatório para empresas que realizam operações
                        de circulação de mercadorias ou prestação de serviços de transporte interestadual
                        e intermunicipal e de comunicação.
                    </p>
                    <p>
                        Cada estado brasileiro possui seu próprio formato e algoritmo de validação.
                        Esta ferramenta suporta todos os 27 estados (26 estados + DF).
                    </p>
                    <p className="text-amber-600 dark:text-amber-400">
                        <strong>Atenção:</strong> As IEs geradas são válidas apenas para testes e desenvolvimento.
                        Não utilize em produção ou para fins fraudulentos.
                    </p>
                    <div className="pt-4 border-t">
                        <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                        <ShareButtons
                            title="Gerador de Inscrição Estadual"
                            description="Gere e valide números de Inscrição Estadual (IE) de todos os estados."
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
