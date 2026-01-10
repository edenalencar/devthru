"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToolResult } from "@/components/tools/tool-result"
import { generateIBAN, validateIBAN, formatIBAN } from "@/lib/utils/validators/iban"
import { CreditCard, CheckCircle2, XCircle } from "lucide-react"

import { BulkGenerator } from "@/components/tools/bulk-generator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"

export function IBANValidatorPage() {
    const [generatedIBAN, setGeneratedIBAN] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("BR")
    const [validationInput, setValidationInput] = useState("")
    const [validationResult, setValidationResult] = useState<boolean | null>(null)
    const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single')

    const { isPro, limit } = useUser()

    const handleGenerate = () => {
        const iban = generateIBAN(selectedCountry)
        setGeneratedIBAN(formatIBAN(iban))
    }

    const handleValidate = () => {
        setValidationResult(validateIBAN(validationInput))
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Validador de IBAN</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere e valide códigos IBAN (International Bank Account Number) para diversos países.
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
                                    <CardTitle>Gerar IBAN</CardTitle>
                                    <CardDescription>
                                        Gere um IBAN válido para testes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="country">País</Label>
                                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o país" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="BR">Brasil (BR)</SelectItem>
                                                <SelectItem value="DE">Alemanha (DE)</SelectItem>
                                                <SelectItem value="FR">França (FR)</SelectItem>
                                                <SelectItem value="GB">Reino Unido (GB)</SelectItem>
                                                <SelectItem value="PT">Portugal (PT)</SelectItem>
                                                <SelectItem value="ES">Espanha (ES)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button onClick={handleGenerate} className="w-full" size="lg">
                                        Gerar IBAN
                                    </Button>

                                    {generatedIBAN && (
                                        <ToolResult
                                            result={generatedIBAN}
                                            toolId="iban"
                                            toolName="IBAN"
                                            input={{ country: selectedCountry }}
                                            successMessage="IBAN gerado com sucesso"
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        ) : (
                            /* Bulk Generator Card */
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle>Geração em Massa</CardTitle>
                                    <CardDescription>
                                        {getPlanLimitMessage(limit)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <BulkGenerator
                                        generatorFn={() => {
                                            const iban = generateIBAN(selectedCountry)
                                            return formatIBAN(iban)
                                        }}
                                        label="IBANs"
                                        limit={limit}
                                        isPro={isPro}
                                    />
                                    <div className="mt-4">
                                        <Label htmlFor="country-bulk">País</Label>
                                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Selecione o país" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="BR">Brasil (BR)</SelectItem>
                                                <SelectItem value="DE">Alemanha (DE)</SelectItem>
                                                <SelectItem value="FR">França (FR)</SelectItem>
                                                <SelectItem value="GB">Reino Unido (GB)</SelectItem>
                                                <SelectItem value="PT">Portugal (PT)</SelectItem>
                                                <SelectItem value="ES">Espanha (ES)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Validator Card */}
                        {activeTab === 'single' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Validar IBAN</CardTitle>
                                    <CardDescription>
                                        Verifique se um código IBAN é válido
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="iban-input">IBAN para validar</Label>
                                        <Input
                                            id="iban-input"
                                            placeholder="BR00 0000 0000..."
                                            value={validationInput}
                                            onChange={(e) => setValidationInput(e.target.value)}
                                            className="font-mono uppercase"
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
                                                        <p className="font-semibold text-accent">IBAN Válido</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Este código IBAN é válido (checksum correto)
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <XCircle className="h-6 w-6 text-destructive" />
                                                    <div>
                                                        <p className="font-semibold text-destructive">IBAN Inválido</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Este código IBAN não é válido
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
                            <CardTitle>Sobre o IBAN</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O IBAN (International Bank Account Number) é um padrão internacional para identificar contas bancárias.
                                Ele consiste em um código de país, dígitos verificadores e o número da conta bancária nacional.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Esta ferramenta valida apenas a estrutura e o dígito verificador (checksum) do IBAN.
                                Ela não verifica se a conta realmente existe no banco.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}
