"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CopyButton } from "@/components/copy-button"
import { encodeBase64, decodeBase64 } from "@/lib/utils/generators/base64"
import { Binary } from "lucide-react"
import { toast } from "sonner"
import { ShareButtons } from "@/components/share-buttons"

export function Base64Page() {
    const [encodeInput, setEncodeInput] = useState("")
    const [encodeOutput, setEncodeOutput] = useState("")
    const [decodeInput, setDecodeInput] = useState("")
    const [decodeOutput, setDecodeOutput] = useState("")

    const handleEncode = () => {
        if (!encodeInput.trim()) {
            toast.error("Digite um texto para codificar")
            return
        }

        try {
            const result = encodeBase64(encodeInput)
            setEncodeOutput(result)
            toast.success("Texto codificado com sucesso!")
        } catch (error) {
            toast.error("Erro ao codificar")
        }
    }

    const handleDecode = () => {
        if (!decodeInput.trim()) {
            toast.error("Digite um Base64 para decodificar")
            return
        }

        try {
            const result = decodeBase64(decodeInput)
            setDecodeOutput(result)
            toast.success("Base64 decodificado com sucesso!")
        } catch (error) {
            toast.error("Base64 inválido ou corrompido")
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Binary className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Base64 Encoder/Decoder</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Codifique texto para Base64 ou decodifique Base64 para texto.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Encoder */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Codificar (Encode)</CardTitle>
                                <CardDescription>
                                    Converta texto para Base64
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="encode-input">Texto para codificar</Label>
                                    <textarea
                                        id="encode-input"
                                        placeholder="Digite seu texto aqui..."
                                        value={encodeInput}
                                        onChange={(e) => setEncodeInput(e.target.value)}
                                        className="w-full min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    />
                                </div>

                                <Button onClick={handleEncode} className="w-full" size="lg">
                                    Codificar
                                </Button>

                                {encodeOutput && (
                                    <div className="space-y-2">
                                        <Label>Resultado (Base64)</Label>
                                        <div className="rounded-lg border bg-muted p-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <code className="text-sm font-mono break-all flex-1">
                                                    {encodeOutput}
                                                </code>
                                                <CopyButton text={encodeOutput} className="shrink-0" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Decoder */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Decodificar (Decode)</CardTitle>
                                <CardDescription>
                                    Converta Base64 para texto
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="decode-input">Base64 para decodificar</Label>
                                    <textarea
                                        id="decode-input"
                                        placeholder="Cole o Base64 aqui..."
                                        value={decodeInput}
                                        onChange={(e) => setDecodeInput(e.target.value)}
                                        className="w-full min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-mono"
                                    />
                                </div>

                                <Button onClick={handleDecode} className="w-full" size="lg" variant="outline">
                                    Decodificar
                                </Button>

                                {decodeOutput && (
                                    <div className="space-y-2">
                                        <Label>Resultado (Texto)</Label>
                                        <div className="rounded-lg border bg-muted p-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm flex-1 whitespace-pre-wrap">
                                                    {decodeOutput}
                                                </p>
                                                <CopyButton text={decodeOutput} className="shrink-0" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre Base64</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                Base64 é um método de codificação que converte dados binários em texto ASCII.
                                É amplamente usado para:
                            </p>
                            <ul>
                                <li>Enviar dados binários por email</li>
                                <li>Incorporar imagens em HTML/CSS (Data URLs)</li>
                                <li>Armazenar dados complexos em JSON</li>
                                <li>Transmitir dados em APIs REST</li>
                            </ul>
                            <p className="text-sm text-muted-foreground">
                                <strong>Nota:</strong> Base64 NÃO é criptografia. É apenas uma codificação e pode ser
                                facilmente revertida. Não use para proteger informações sensíveis.
                            </p>
                        </CardContent>
                        <div className="pt-4 border-t px-6 pb-6">
                            <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                            <ShareButtons
                                title="Base64 Encoder/Decoder"
                                description="Codifique e decodifique Base64 para texto e vice-versa."
                            />
                        </div>
                    </Card>
                </div>
            </main>


        </div>
    )
}
