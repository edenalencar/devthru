"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Copy, Trash2, AlertCircle, ShieldCheck } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { jwtDecode } from "jwt-decode"

import { Navbar } from "@/components/layout/navbar"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export function JwtDebuggerPage() {
    const [token, setToken] = useState("")
    const [header, setHeader] = useState("")
    const [payload, setPayload] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (!token.trim()) {
            setHeader("")
            setPayload("")
            setError("")
            return
        }

        try {
            // Validate basic structure
            const parts = token.split('.')
            if (parts.length !== 3) {
                throw new Error("Token inválido: deve ter 3 partes separadas por ponto.")
            }

            // Decode Header (Part 1)
            const decodedHeader = JSON.parse(atob(parts[0]))
            setHeader(JSON.stringify(decodedHeader, null, 2))

            // Decode Payload (Part 2)
            // Using jwtDecode specifically for payload for robustness, although atob also works
            const decodedPayload = jwtDecode(token)
            setPayload(JSON.stringify(decodedPayload, null, 2))

            setError("")
        } catch (err) {
            setError("Token inválido ou mal formatado.")
            setHeader("")
            setPayload("")
        }
    }, [token])

    const copyToClipboard = (text: string, label: string) => {
        if (!text) return
        navigator.clipboard.writeText(text)
        toast.success(`${label} copiado!`)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Dev Tools" }, { "label": "JWT Debugger" }]} className="mb-6" />
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold tracking-tight">JWT Debugger</h1>
                        <p className="text-muted-foreground text-lg">
                            Decodifique e inspecione JSON Web Tokens (JWT).
                        </p>
                        <Alert variant="default" className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-50">
                            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <AlertTitle>Privacidade Garantida</AlertTitle>
                            <AlertDescription>
                                A decodificação é feita 100% no seu navegador. Seu token nunca é enviado para nossos servidores.
                            </AlertDescription>
                        </Alert>
                    </div>

                    <div className="grid lg:grid-cols-[1fr,1fr] gap-8">
                        {/* Input Column */}
                        <div className="space-y-6">
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle>Encoded Token</CardTitle>
                                    <CardDescription>Cole seu JWT aqui.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Textarea
                                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                        className="min-h-[400px] font-mono text-sm break-all"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setToken("")}
                                            disabled={!token}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Limpar
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={async () => {
                                                const text = await navigator.clipboard.readText()
                                                setToken(text)
                                            }}
                                        >
                                            Colar
                                        </Button>
                                    </div>

                                    {error && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertTitle>Erro</AlertTitle>
                                            <AlertDescription>{error}</AlertDescription>
                                        </Alert>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Output Column */}
                        <div className="space-y-6">
                            {/* Header */}
                            <Card>
                                <CardHeader className="py-3 bg-muted/50">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-base text-red-500 font-mono">HEADER: Algorithm & Token Type</CardTitle>
                                        <Button size="icon" variant="ghost" onClick={() => copyToClipboard(header, "Header")}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="py-4">
                                    <pre className="font-mono text-sm text-red-500 overflow-auto max-h-[200px]">
                                        {header || "..."}
                                    </pre>
                                </CardContent>
                            </Card>

                            {/* Payload */}
                            <Card>
                                <CardHeader className="py-3 bg-muted/50">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-base text-purple-500 font-mono">PAYLOAD: Data</CardTitle>
                                        <Button size="icon" variant="ghost" onClick={() => copyToClipboard(payload, "Payload")}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="py-4">
                                    <pre className="font-mono text-sm text-purple-500 overflow-auto min-h-[200px]">
                                        {payload || "..."}
                                    </pre>
                                </CardContent>
                            </Card>

                            {/* Signature Info */}
                            <Card>
                                <CardHeader className="py-3 bg-muted/50">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-base text-blue-500 font-mono">SIGNATURE</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="py-4 text-sm text-muted-foreground">
                                    <p>
                                        A assinatura verifica se o remetente do JWT é quem diz ser e assegura que a mensagem não foi alterada ao longo do caminho.
                                    </p>
                                    <p className="mt-2 text-xs italic">
                                        *Nota: Não validamos a assinatura aqui pois exigiria sua chave secreta, o que não é seguro fazer no navegador.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <RelatedTools currentToolSlug="jwt-debugger" category="development" />
                </div>
            </main>
        </div>
    )
}
