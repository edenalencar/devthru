"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToolResult } from "@/components/tools/tool-result"
import { RefreshCw } from "lucide-react"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"

const domains = [
    "gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "uol.com.br", "bol.com.br", "terra.com.br", "icloud.com"
]

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function EmailGeneratorPage() {
    const [email, setEmail] = useState<string>("")
    const [customDomain, setCustomDomain] = useState<string>("")
    const [domainType, setDomainType] = useState<string>("random")
    const { isPro, limit } = useUser()

    const generateEmail = (type: string = domainType, custom: string = customDomain): string => {
        const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
        const usernameLength = Math.floor(Math.random() * 10) + 6
        let username = ""
        for (let i = 0; i < usernameLength; i++) {
            username += chars[Math.floor(Math.random() * chars.length)]
        }

        let domain = ""
        if (type === "custom" && custom) {
            domain = custom
        } else {
            domain = domains[Math.floor(Math.random() * domains.length)]
        }

        return `${username}@${domain}`
    }

    const handleGenerate = () => {
        setEmail(generateEmail())
    }

    if (!email) {
        handleGenerate()
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Gerador de Email</h1>
                        <p className="text-muted-foreground">
                            Gere endereços de email temporários ou fictícios para testes.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar Email</CardTitle>
                                <CardDescription>Gere um único endereço de email</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Domínio</Label>
                                        <Select value={domainType} onValueChange={setDomainType}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione o tipo de domínio" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="random">Aleatório (Comuns)</SelectItem>
                                                <SelectItem value="custom">Personalizado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {domainType === "custom" && (
                                        <div className="space-y-2">
                                            <Label htmlFor="custom-domain">Domínio Personalizado</Label>
                                            <Input
                                                id="custom-domain"
                                                placeholder="exemplo.com"
                                                value={customDomain}
                                                onChange={(e) => setCustomDomain(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>

                                {email && (
                                    <ToolResult
                                        result={email}
                                        toolId="email"
                                        toolName="Email"
                                        input={{ domainType, customDomain }}
                                        successMessage="Email gerado com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Novo Email
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Geração em Massa</CardTitle>
                                <CardDescription>
                                    {getPlanLimitMessage(limit)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BulkGenerator
                                    generatorFn={() => generateEmail(domainType, customDomain)}
                                    label="Emails"
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
