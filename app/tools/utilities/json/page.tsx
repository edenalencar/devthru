"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { validateJSON, formatJSON, minifyJSON, getJSONStats } from "@/lib/utils/generators/json"
import { Braces, CheckCircle2, XCircle } from "lucide-react"
import { toast } from "sonner"

export default function JSONFormatterPage() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [validation, setValidation] = useState<{ isValid: boolean; error?: string; lineNumber?: number } | null>(null)

    const handleFormat = () => {
        if (!input.trim()) {
            toast.error("Digite um JSON para formatar")
            return
        }

        try {
            const formatted = formatJSON(input)
            setOutput(formatted)
            setValidation({ isValid: true })
            toast.success("JSON formatado com sucesso!")
        } catch (error) {
            toast.error("JSON inválido. Não é possível formatar.")
            const result = validateJSON(input)
            setValidation(result)
        }
    }

    const handleMinify = () => {
        if (!input.trim()) {
            toast.error("Digite um JSON para minificar")
            return
        }

        try {
            const minified = minifyJSON(input)
            setOutput(minified)
            setValidation({ isValid: true })
            toast.success("JSON minificado com sucesso!")
        } catch (error) {
            toast.error("JSON inválido. Não é possível minificar.")
            const result = validateJSON(input)
            setValidation(result)
        }
    }

    const handleValidate = () => {
        if (!input.trim()) {
            toast.error("Digite um JSON para validar")
            return
        }

        const result = validateJSON(input)
        setValidation(result)

        if (result.isValid) {
            toast.success("JSON válido!")
        } else {
            toast.error("JSON inválido")
        }
    }

    const stats = input ? getJSONStats(input) : null

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Braces className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">JSON Formatter</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Formate, valide e minifique JSON facilmente.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Input */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Entrada</CardTitle>
                                <CardDescription>
                                    Cole seu JSON aqui
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="input">JSON</Label>
                                    <textarea
                                        id="input"
                                        placeholder='{"nome": "João", "idade": 30}'
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="w-full min-h-64 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-mono"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <Button onClick={handleFormat} className="flex-1">
                                        Formatar
                                    </Button>
                                    <Button onClick={handleMinify} variant="outline" className="flex-1">
                                        Minificar
                                    </Button>
                                    <Button onClick={handleValidate} variant="outline" className="flex-1">
                                        Validar
                                    </Button>
                                </div>

                                {stats && (
                                    <div className="text-xs text-muted-foreground space-y-1">
                                        <p>Linhas: {stats.lines}</p>
                                        <p>Caracteres: {stats.characters}</p>
                                        <p>Tamanho: {stats.bytes} bytes</p>
                                    </div>
                                )}

                                {validation && (
                                    <div className="rounded-lg border p-4">
                                        {validation.isValid ? (
                                            <div className="flex items-center gap-3">
                                                <CheckCircle2 className="h-6 w-6 text-accent" />
                                                <div>
                                                    <p className="font-semibold text-accent">JSON Válido</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Seu JSON está correto
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-start gap-3">
                                                <XCircle className="h-6 w-6 text-destructive mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="font-semibold text-destructive">JSON Inválido</p>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {validation.error}
                                                    </p>
                                                    {validation.lineNumber && (
                                                        <p className="text-sm text-muted-foreground">
                                                            Linha: {validation.lineNumber}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Output */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Saída</CardTitle>
                                <CardDescription>
                                    {output ? "JSON processado" : "O resultado aparecerá aqui"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {output ? (
                                    <div className="space-y-2">
                                        <textarea
                                            value={output}
                                            readOnly
                                            className="w-full min-h-64 rounded-md border border-input bg-muted px-3 py-2 text-sm font-mono"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center py-32 text-muted-foreground">
                                        Clique em "Formatar" ou "Minificar"
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre JSON</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                JSON (JavaScript Object Notation) é um formato leve de troca de dados.
                                É fácil para humanos lerem e escreverem, e fácil para máquinas parsearem e gerarem.
                            </p>
                            <p>
                                <strong>Formatação</strong> torna o JSON mais legível com indentação.
                                <strong>Minificação</strong> remove espaços em branco para reduzir o tamanho.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            
        </div>
    )
}

