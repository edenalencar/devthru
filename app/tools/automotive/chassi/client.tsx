"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Car, RefreshCw, Copy } from "lucide-react"
import { toast } from "sonner"
import { ShareButtons } from "@/components/share-buttons"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export function ChassiGeneratorPage() {
    const [chassis, setChassis] = useState("")

    const generateChassis = () => {
        // WMI (World Manufacturer Identifier) - 3 chars
        // Using common Brazilian WMIs for realism
        const wmis = ["9BW", "9BD", "9BG", "93H", "936", "935", "9BF", "94D"]
        const wmi = wmis[Math.floor(Math.random() * wmis.length)]

        // VDS (Vehicle Descriptor Section) - 6 chars (Euclidean random)
        const alphaNum = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789"
        let vds = ""
        for (let i = 0; i < 5; i++) {
            vds += alphaNum[Math.floor(Math.random() * alphaNum.length)]
        }
        // 9th digit is check digit (placeholder for now)
        const checkDigitPlaceholder = "0"

        // VIS (Vehicle Identifier Section) - 8 chars
        // 10th char is Year Code (L=2020, M=2021, N=2022, P=2023, R=2024, S=2025)
        const yearCodes = "LMNPRS"
        const yearCode = yearCodes[Math.floor(Math.random() * yearCodes.length)]

        // 11th char is Plant Code
        const plantCode = alphaNum[Math.floor(Math.random() * alphaNum.length)]

        // 12th-17th are sequential numbers
        let sequential = ""
        for (let i = 0; i < 6; i++) {
            sequential += Math.floor(Math.random() * 10).toString()
        }

        const vis = yearCode + plantCode + sequential

        // Calculate Check Digit (9th position)
        const values: { [key: string]: number } = {
            'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
            'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9, 'S': 2,
            'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9,
            '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
        }

        const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]

        const tempVin = wmi + vds + checkDigitPlaceholder + vis
        let sum = 0
        for (let i = 0; i < 17; i++) {
            if (i === 8) continue // Skip check digit position in sum
            const char = tempVin[i]
            sum += values[char] * weights[i]
        }

        const remainder = sum % 11
        let checkDigit = ""
        if (remainder === 10) checkDigit = "X"
        else checkDigit = remainder.toString()

        const finalVin = wmi + vds + checkDigit + vis
        setChassis(finalVin)
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
                    <Breadcrumbs items={[{"label":"Ferramentas"},{"label":"Automotivo"},{"label":"Chassi"}]} className="mb-6" />
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Car className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de Chassi</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere códigos de chassi (VIN) válidos para testes de sistemas automotivos.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar Chassi (VIN)</CardTitle>
                                <CardDescription>
                                    Gera um código VIN válido de 17 caracteres seguindo o padrão internacional
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={generateChassis} className="w-full" size="lg">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Chassi
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Resultado</CardTitle>
                                <CardDescription>
                                    Chassi gerado
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {chassis ? (
                                    <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/50">
                                        <div className="text-3xl font-mono font-bold tracking-wider mb-6 break-all text-center">
                                            {chassis}
                                        </div>
                                        <Button variant="outline" onClick={() => copyToClipboard(chassis)}>
                                            <Copy className="mr-2 h-4 w-4" />
                                            Copiar
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border rounded-lg border-dashed">
                                        <Car className="h-12 w-12 mb-2 opacity-20" />
                                        <p>Clique em gerar para começar</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Chassi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <p>
                                    O número de chassi, também conhecido como VIN (Vehicle Identification Number), é um código único de 17 caracteres que identifica cada veículo fabricado no mundo. Este gerador cria códigos VIN válidos seguindo o padrão internacional ISO 3779.
                                </p>
                                <h4 className="font-semibold mt-4">Estrutura do VIN:</h4>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li><strong>WMI (1-3):</strong> Identificador do fabricante mundial</li>
                                    <li><strong>VDS (4-9):</strong> Descrição do veículo (modelo, motor, etc.)</li>
                                    <li><strong>VIS (10-17):</strong> Identificador do veículo (ano, planta, sequência)</li>
                                </ul>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Nota:</strong> Os códigos gerados são matematicamente válidos mas fictícios, não correspondendo a veículos reais. Use apenas para testes de software.
                                </p>
                            </div>
                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Chassi Online"
                                    description="Gere códigos de chassi (VIN) válidos para testes."
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
