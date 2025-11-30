"use client"

import { useState } from "react"
import { z } from "zod"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

// Common disposable email domains
const DISPOSABLE_DOMAINS = [
    "mailinator.com", "yopmail.com", "tempmail.com", "guerrillamail.com",
    "10minutemail.com", "throwawaymail.com", "getairmail.com"
]

// Reserved domains for documentation and testing
const RESERVED_DOMAINS = [
    "example.com", "example.org", "example.net",
    "test.com", "teste.com", "local.com", "localhost"
]

export default function EmailValidatorPage() {
    const [email, setEmail] = useState("")
    const [result, setResult] = useState<{ isValid: boolean, isDisposable: boolean, message: string } | null>(null)

    const validateEmail = () => {
        if (!email) {
            setResult(null)
            return
        }

        // Zod Validation
        const emailSchema = z.string().email()
        const validationResult = emailSchema.safeParse(email)

        if (!validationResult.success) {
            setResult({ isValid: false, isDisposable: false, message: "Formato de email inválido" })
            return
        }

        // Disposable Check
        const domain = email.split('@')[1].toLowerCase()
        if (DISPOSABLE_DOMAINS.includes(domain)) {
            setResult({ isValid: true, isDisposable: true, message: "Email temporário detectado" })
            return
        }

        // Reserved Domain Check
        if (RESERVED_DOMAINS.includes(domain)) {
            setResult({ isValid: true, isDisposable: true, message: "Domínio reservado/teste detectado" })
            return
        }

        setResult({ isValid: true, isDisposable: false, message: "Email válido" })
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Validador de Email</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Verifique se um endereço de email é válido e se não é temporário.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Input Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Validar Email</CardTitle>
                                <CardDescription>
                                    Digite o email para verificar
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Endereço de Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="exemplo@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <Button onClick={validateEmail} className="w-full" size="lg">
                                    Validar
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Result Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Resultado</CardTitle>
                                <CardDescription>
                                    Análise do email informado
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {result ? (
                                    <div className={`rounded-lg border p-6 flex items-start gap-4 ${!result.isValid ? "bg-red-50 border-red-200 dark:bg-red-950/20" :
                                        result.isDisposable ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20" :
                                            "bg-green-50 border-green-200 dark:bg-green-950/20"
                                        }`}>
                                        {!result.isValid ? (
                                            <XCircle className="h-6 w-6 text-red-600 shrink-0" />
                                        ) : result.isDisposable ? (
                                            <AlertTriangle className="h-6 w-6 text-yellow-600 shrink-0" />
                                        ) : (
                                            <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                                        )}

                                        <div>
                                            <h3 className={`font-bold text-lg ${!result.isValid ? "text-red-700" :
                                                result.isDisposable ? "text-yellow-700" :
                                                    "text-green-700"
                                                }`}>
                                                {!result.isValid ? "Inválido" :
                                                    result.isDisposable ? "Email Temporário" :
                                                        "Válido"}
                                            </h3>
                                            <p className="text-muted-foreground mt-1">
                                                {result.message}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 text-muted-foreground">
                                        <Mail className="h-16 w-16 mb-4 opacity-20" />
                                        <p>Aguardando validação...</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
