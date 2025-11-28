"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CopyButton } from "@/components/copy-button"
import { RefreshCw } from "lucide-react"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"

const ddds = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, // SP
    21, 22, 24, // RJ
    27, 28, // ES
    31, 32, 33, 34, 35, 37, 38, // MG
    41, 42, 43, 44, 45, 46, // PR
    47, 48, 49, // SC
    51, 53, 54, 55, // RS
    61, // DF
    62, 64, // GO
    71, 73, 74, 75, 77, // BA
    81, 87, // PE
    85, 88, // CE
    91, 93, 94, // PA
    92, 97, // AM
    98, 99 // MA
]

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function PhoneGeneratorPage() {
    const [phone, setPhone] = useState<string>("")
    const [type, setType] = useState<"mobile" | "landline">("mobile")
    const [formatted, setFormatted] = useState<boolean>(true)
    const { isPro, limit } = useUser()

    const generatePhone = (phoneType: "mobile" | "landline" = type, isFormatted: boolean = formatted): string => {
        const ddd = ddds[Math.floor(Math.random() * ddds.length)]

        let number = ""
        if (phoneType === "mobile") {
            // Mobile: 9XXXX-XXXX
            const part1 = Math.floor(Math.random() * 10000).toString().padStart(4, "0")
            const part2 = Math.floor(Math.random() * 10000).toString().padStart(4, "0")
            number = `9${part1}${part2}`
        } else {
            // Landline: [2-5]XXX-XXXX
            const firstDigit = Math.floor(Math.random() * 4) + 2 // 2 to 5
            const part1 = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
            const part2 = Math.floor(Math.random() * 10000).toString().padStart(4, "0")
            number = `${firstDigit}${part1}${part2}`
        }

        if (isFormatted) {
            const n = number
            if (phoneType === "mobile") {
                return `(${ddd}) ${n.substring(0, 5)}-${n.substring(5)}`
            } else {
                return `(${ddd}) ${n.substring(0, 4)}-${n.substring(4)}`
            }
        }

        return `${ddd}${number}`
    }

    const handleGenerate = () => {
        setPhone(generatePhone())
    }

    if (!phone) {
        handleGenerate()
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Gerador de Telefone</h1>
                        <p className="text-muted-foreground">
                            Gere números de telefone celular e fixo brasileiros para testes.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar Telefone</CardTitle>
                                <CardDescription>Gere um único número de telefone</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <Label>Tipo</Label>
                                        <RadioGroup
                                            defaultValue="mobile"
                                            value={type}
                                            onValueChange={(v) => setType(v as any)}
                                            className="flex space-x-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="mobile" id="mobile" />
                                                <Label htmlFor="mobile">Celular</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="landline" id="landline" />
                                                <Label htmlFor="landline">Fixo</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="formatted"
                                            checked={formatted}
                                            onCheckedChange={setFormatted}
                                        />
                                        <Label htmlFor="formatted">Com formatação</Label>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="flex-1 p-4 bg-muted rounded-lg text-center text-2xl font-mono tracking-wider">
                                        {phone}
                                    </div>
                                    <CopyButton text={phone} />
                                </div>

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Novo Telefone
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Geração em Massa</CardTitle>
                                <CardDescription>Gere múltiplos telefones de uma vez</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BulkGenerator
                                    generatorFn={() => generatePhone(type, formatted)}
                                    label="Telefones"
                                    limit={limit}
                                    isPro={isPro}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
