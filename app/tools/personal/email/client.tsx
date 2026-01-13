"use client"

import { useState, useEffect } from "react"
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
import { Navbar } from "@/components/layout/navbar"
import { ShareButtons } from "@/components/share-buttons"

const domains = [
    "gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "uol.com.br", "bol.com.br", "terra.com.br", "icloud.com"
]

export function EmailGeneratorPage() {
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

    useEffect(() => {
        if (!email) {
            setTimeout(() => handleGenerate(), 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Email</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Gerador de Email cria endereços de email temporários ou fictícios para uso em testes de software e cadastros.
                                Você pode escolher entre provedores comuns ou definir um domínio personalizado.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Estes emails são fictícios e não possuem caixa de entrada real. Para emails temporários funcionais (que recebem mensagens), utilize serviços específicos de &quot;temp mail&quot;.
                            </p>
                            <div className="pt-4 border-t mt-4">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Email"
                                    description="Gere endereços de email temporários ou fictícios."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}
