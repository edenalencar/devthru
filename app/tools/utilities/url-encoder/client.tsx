"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Trash2, ArrowRightLeft } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Navbar } from "@/components/layout/navbar"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export function UrlEncoderPage() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [mode, setMode] = useState<"encode" | "decode">("encode")

    const handleConvert = () => {
        try {
            if (mode === "encode") {
                setOutput(encodeURIComponent(input))
            } else {
                setOutput(decodeURIComponent(input))
            }
        } catch (error) {
            setOutput("Erro ao decodificar URL inválida")
        }
    }

    const copyToClipboard = () => {
        if (!output) return
        navigator.clipboard.writeText(output)
        toast.success("Resultado copiado!")
    }

    const pasteFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText()
            setInput(text)
        } catch (error) {
            toast.error("Erro ao colar da área de transferência")
        }
    }

    const switchMode = () => {
        setMode(prev => prev === "encode" ? "decode" : "encode")
        // Swap input/output for convenience
        if (output) {
            setInput(output)
            setOutput("")
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8 max-w-4xl">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Utilidades" }, { "label": "URL Encoder" }]} className="mb-6" />
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold tracking-tight">URL Encoder / Decoder</h1>
                        <p className="text-muted-foreground text-lg">
                            Codifique ou decodifique URLs para garantir que elas sejam seguras para transmissão via internet.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Converter</CardTitle>
                            <CardDescription>
                                Cole seu texto abaixo para {mode === "encode" ? "codificar" : "decodificar"}.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="input">Entrada</Label>
                                    <Textarea
                                        id="input"
                                        placeholder={mode === "encode" ? "Cole a URL aqui..." : "Cole a URL codificada aqui..."}
                                        className="min-h-[200px] font-mono text-sm"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => setInput("")} disabled={!input}>
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Limpar
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={pasteFromClipboard}>
                                            Colar
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="output">Saída</Label>
                                    <Textarea
                                        id="output"
                                        readOnly
                                        className="min-h-[200px] font-mono text-sm bg-muted text-primary"
                                        value={output}
                                        placeholder="O resultado aparecerá aqui..."
                                    />
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!output}>
                                            <Copy className="w-4 h-4 mr-2" />
                                            Copiar
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 border-t">
                                <Button size="lg" onClick={handleConvert} className="w-full sm:w-auto min-w-[200px]">
                                    {mode === "encode" ? "Codificar (Encode)" : "Decodificar (Decode)"}
                                </Button>
                                <Button size="lg" variant="outline" onClick={switchMode} className="w-full sm:w-auto">
                                    <ArrowRightLeft className="w-4 h-4 mr-2" />
                                    Alternar Modo (Encode → Decode)
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <article className="prose dark:prose-invert max-w-none">
                        <h2>O que é URL Encoding?</h2>
                        <p>
                            URL encoding (ou Percent-encoding) é um mecanismo para codificar informações em uma Uniform Resource Identifier (URI).
                            Caracteres que não são permitidos em uma URL devem ser convertidos para um formato permitido.
                        </p>
                        <h3>Quando usar?</h3>
                        <ul>
                            <li>Ao passar parâmetros via GET que contêm espaços ou caracteres especiais.</li>
                            <li>Ao construir URLs dinamicamente em suas aplicações.</li>
                            <li>Para garantir que dados sensíveis à formatação (como JSON) cheguem intactos ao servidor.</li>
                        </ul>
                    </article>
                </div>
            </main>
        </div>
    )
}
