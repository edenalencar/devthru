"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Shield, RefreshCw, Copy } from "lucide-react"
import { toast } from "sonner"
import { ShareButtons } from "@/components/share-buttons"

export function RenavamGeneratorPage() {
    const [renavam, setRenavam] = useState("")

    const generateRenavam = () => {
        const random = Math.floor(Math.random() * 9999999999).toString().padStart(10, '0')
        const renavamWithoutDigit = random.substring(0, 10)

        const renavamArr = renavamWithoutDigit.split("").reverse()
        let sum = 0
        for (let i = 0; i < 8; i++) {
            sum += parseInt(renavamArr[i]) * (i + 2)
        }
        sum += parseInt(renavamArr[8]) * 2
        sum += parseInt(renavamArr[9]) * 3

        const mod = sum % 11
        const digit = 11 - mod
        const finalDigit = digit >= 10 ? 0 : digit

        setRenavam(renavamWithoutDigit + finalDigit)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Copiado para a área de transferência")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de RENAVAM</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere códigos RENAVAM válidos para testes de sistemas automotivos.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar RENAVAM</CardTitle>
                                <CardDescription>
                                    Gera um número de RENAVAM válido com 11 dígitos
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={generateRenavam} className="w-full" size="lg">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar RENAVAM
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Resultado</CardTitle>
                                <CardDescription>
                                    RENAVAM gerado
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {renavam ? (
                                    <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/50">
                                        <div className="text-4xl font-mono font-bold tracking-wider mb-6">
                                            {renavam}
                                        </div>
                                        <Button variant="outline" onClick={() => copyToClipboard(renavam)}>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copiar
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border rounded-lg border-dashed">
                                        <Shield className="h-12 w-12 mb-2 opacity-20" />
                                        <p>Clique em gerar para começar</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de RENAVAM</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <p>
                                    O RENAVAM (Registro Nacional de Veículos Automotores) é um código único de 11 dígitos atribuído a cada veículo registrado no Brasil. Este número é essencial para identificação do veículo em transações, multas e documentação.
                                </p>
                                <h4 className="font-semibold mt-4">Características do RENAVAM:</h4>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li><strong>11 dígitos:</strong> Formato numérico padronizado</li>
                                    <li><strong>Dígito verificador:</strong> Último dígito calculado por algoritmo oficial</li>
                                    <li><strong>Único por veículo:</strong> Cada veículo possui um número exclusivo</li>
                                </ul>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Nota:</strong> Os números gerados são matematicamente válidos mas fictícios, não correspondendo a veículos reais. Use apenas para testes de software.
                                </p>
                            </div>
                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de RENAVAM Online"
                                    description="Gere números de RENAVAM válidos para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    )
}
