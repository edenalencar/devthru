"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, RefreshCw, Copy } from "lucide-react"
import { toast } from "sonner"

export default function RenavamChassisPage() {
    const [renavam, setRenavam] = useState("")
    const [chassis, setChassis] = useState("")

    // --- RENAVAM Logic ---
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

    // --- Chassis (VIN) Logic ---
    const generateChassis = () => {
        // 1. WMI (World Manufacturer Identifier) - 3 chars
        // Using common Brazilian WMIs for realism
        const wmis = ["9BW", "9BD", "9BG", "93H", "936", "935", "9BF", "94D"]
        const wmi = wmis[Math.floor(Math.random() * wmis.length)]

        // 2. VDS (Vehicle Descriptor Section) - 6 chars (Euclidean random)
        const alphaNum = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789"
        let vds = ""
        for (let i = 0; i < 5; i++) {
            vds += alphaNum[Math.floor(Math.random() * alphaNum.length)]
        }
        // 9th digit is check digit (placeholder for now)
        const checkDigitPlaceholder = "0"

        // 3. VIS (Vehicle Identifier Section) - 8 chars
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
        // Values: 0-9=0-9, A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, J=1, K=2, L=3, M=4, N=5, P=7, R=9, S=2, T=3, U=4, V=5, W=6, X=7, Y=8, Z=9
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
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de RENAVAM e Chassis</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere códigos válidos de RENAVAM e Chassis (VIN) para testes de sistemas automotivos.
                        </p>
                    </div>

                    <Tabs defaultValue="renavam" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                            <TabsTrigger value="renavam">RENAVAM</TabsTrigger>
                            <TabsTrigger value="chassis">Chassis (VIN)</TabsTrigger>
                        </TabsList>

                        {/* RENAVAM Tab */}
                        <TabsContent value="renavam">
                            <div className="grid gap-8 lg:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Gerar RENAVAM</CardTitle>
                                        <CardDescription>
                                            Gera um número de RENAVAM válido (11 dígitos)
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
                        </TabsContent>

                        {/* Chassis Tab */}
                        <TabsContent value="chassis">
                            <div className="grid gap-8 lg:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Gerar Chassis (VIN)</CardTitle>
                                        <CardDescription>
                                            Gera um código VIN válido (17 caracteres)
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button onClick={generateChassis} className="w-full" size="lg">
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            Gerar Chassis
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Resultado</CardTitle>
                                        <CardDescription>
                                            Chassis gerado
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
                                                <Shield className="h-12 w-12 mb-2 opacity-20" />
                                                <p>Clique em gerar para começar</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <Footer />
        </div>
    )
}
