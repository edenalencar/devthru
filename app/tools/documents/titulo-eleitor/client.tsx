"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ToolResult } from "@/components/tools/tool-result"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { RefreshCw, CheckCircle2, XCircle } from "lucide-react"
import { generateTituloEleitor, validateTituloEleitor, formatTituloEleitor } from "@/lib/utils/validators/titulo-eleitor"
import { ShareButtons } from "@/components/share-buttons"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"

const STATES = [
    { uf: "AC", name: "Acre" },
    { uf: "AL", name: "Alagoas" },
    { uf: "AP", name: "Amapá" },
    { uf: "AM", name: "Amazonas" },
    { uf: "BA", name: "Bahia" },
    { uf: "CE", name: "Ceará" },
    { uf: "DF", name: "Distrito Federal" },
    { uf: "ES", name: "Espírito Santo" },
    { uf: "GO", name: "Goiás" },
    { uf: "MA", name: "Maranhão" },
    { uf: "MT", name: "Mato Grosso" },
    { uf: "MS", name: "Mato Grosso do Sul" },
    { uf: "MG", name: "Minas Gerais" },
    { uf: "PA", name: "Pará" },
    { uf: "PB", name: "Paraíba" },
    { uf: "PR", name: "Paraná" },
    { uf: "PE", name: "Pernambuco" },
    { uf: "PI", name: "Piauí" },
    { uf: "RJ", name: "Rio de Janeiro" },
    { uf: "RN", name: "Rio Grande do Norte" },
    { uf: "RS", name: "Rio Grande do Sul" },
    { uf: "RO", name: "Rondônia" },
    { uf: "RR", name: "Roraima" },
    { uf: "SC", name: "Santa Catarina" },
    { uf: "SP", name: "São Paulo" },
    { uf: "SE", name: "Sergipe" },
    { uf: "TO", name: "Tocantins" },
    { uf: "EXTERIOR", name: "Exterior" },
]

export function TituloEleitorPage() {
    const [selectedUF, setSelectedUF] = useState(STATES[0].uf)
    const [generatedTitulo, setGeneratedTitulo] = useState("")
    const [validateInput, setValidateInput] = useState("")
    const [validateResult, setValidateResult] = useState<boolean | null>(null)
    const [activeTab, setActiveTab] = useState<"generate" | "validate" | "bulk">("generate")
    const { isPro, limit } = useUser()

    const handleGenerate = () => {
        const titulo = generateTituloEleitor(selectedUF)
        const formatted = formatTituloEleitor(titulo)
        setGeneratedTitulo(formatted)
    }

    const handleValidate = () => {
        const isValid = validateTituloEleitor(validateInput)
        setValidateResult(isValid)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">Gerador de Título de Eleitor</h1>
                        <p className="text-lg text-muted-foreground">
                            Gere e valide números de Título de Eleitor válidos para testes
                        </p>
                    </div>

                    {/* Tab Buttons */}
                    <div className="flex gap-2 mb-6">
                        <Button
                            variant={activeTab === "generate" ? "default" : "outline"}
                            onClick={() => setActiveTab("generate")}
                        >
                            Gerar
                        </Button>
                        <Button
                            variant={activeTab === "validate" ? "default" : "outline"}
                            onClick={() => setActiveTab("validate")}
                        >
                            Validar
                        </Button>
                        <Button
                            variant={activeTab === "bulk" ? "default" : "outline"}
                            onClick={() => setActiveTab("bulk")}
                        >
                            Geração em Lote
                        </Button>
                    </div>

                    {/* Generate Section */}
                    {activeTab === "generate" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar Título de Eleitor</CardTitle>
                                <CardDescription>
                                    Gere um número válido de Título de Eleitor por estado
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Estado de Origem</Label>
                                    <Select value={selectedUF} onValueChange={setSelectedUF}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[300px]">
                                            {STATES.map((state) => (
                                                <SelectItem key={state.uf} value={state.uf}>
                                                    {state.uf} - {state.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {generatedTitulo && (
                                    <ToolResult
                                        result={generatedTitulo}
                                        toolId="titulo-eleitor"
                                        toolName="Título de Eleitor"
                                        input={{ uf: selectedUF }}
                                        successMessage="Título de Eleitor gerado com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Título
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Validate Section */}
                    {activeTab === "validate" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Validar Título de Eleitor</CardTitle>
                                <CardDescription>
                                    Verifique se um número de Título de Eleitor é válido
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Número do Título</Label>
                                    <Input
                                        placeholder="0000 0000 0000"
                                        value={validateInput}
                                        onChange={(e) => setValidateInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleValidate()}
                                    />
                                </div>

                                {validateResult !== null && (
                                    <div
                                        className={`flex items-center gap-2 p-4 rounded-lg ${validateResult
                                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                                            }`}
                                    >
                                        {validateResult ? (
                                            <>
                                                <CheckCircle2 className="h-5 w-5" />
                                                <span className="font-semibold">Título válido!</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="h-5 w-5" />
                                                <span className="font-semibold">Título inválido</span>
                                            </>
                                        )}
                                    </div>
                                )}

                                <Button onClick={handleValidate} className="w-full">
                                    Validar Título
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Bulk Section */}
                    {activeTab === "bulk" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Geração em Lote</CardTitle>
                                <CardDescription>
                                    {getPlanLimitMessage(limit)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Estado de Origem</Label>
                                    <Select value={selectedUF} onValueChange={setSelectedUF}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[300px]">
                                            {STATES.map((state) => (
                                                <SelectItem key={state.uf} value={state.uf}>
                                                    {state.uf} - {state.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <BulkGenerator
                                    generatorFn={() => formatTituloEleitor(generateTituloEleitor(selectedUF))}
                                    label="Título de Eleitor"
                                    limit={limit}
                                    isPro={isPro}
                                />
                            </CardContent>
                        </Card>
                    )}

                    {/* Info Card */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Sobre o Título de Eleitor</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    O Título de Eleitor é o documento que comprova que o cidadão está inscrito na Justiça Eleitoral do Brasil
                                    e está apto a exercer o direito de voto.
                                </p>
                                <p>
                                    O número é composto por 12 dígitos, sendo:
                                    <br />- 8 dígitos sequenciais
                                    <br />- 2 dígitos para o código do estado (UF)
                                    <br />- 2 dígitos verificadores
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Atenção:</strong> Os números gerados são válidos apenas para testes e desenvolvimento.
                                    Não correspondem a documentos reais de cidadãos.
                                </p>
                            </div>
                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Título de Eleitor"
                                    description="Gere e valide números de Título de Eleitor para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}
