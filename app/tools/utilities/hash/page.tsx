"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from "@/components/copy-button"
import { generateAllHashes, type HashAlgorithm } from "@/lib/utils/generators/hash"
import { Binary } from "lucide-react"
import { toast } from "sonner"

export default function HashGeneratorPage() {
    const [input, setInput] = useState("")
    const [hashes, setHashes] = useState<Record<HashAlgorithm, string> | null>(null)
    const [loading, setLoading] = useState(false)

    const handleGenerate = async () => {
        if (!input.trim()) {
            toast.error("Digite um texto para gerar o hash")
            return
        }

        setLoading(true)
        try {
            const result = await generateAllHashes(input)
            setHashes(result)
            toast.success("Hashes gerados com sucesso!")
        } catch (error) {
            toast.error("Erro ao gerar hashes")
        } finally {
            setLoading(false)
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
                            <h1 className="text-4xl font-bold">Gerador de Hash</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere hashes criptográficos SHA-1, SHA-256 e SHA-512 a partir de qualquer texto.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Entrada</CardTitle>
                                <CardDescription>
                                    Digite o texto para gerar os hashes
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="input">Texto</Label>
                                    <Input
                                        id="input"
                                        placeholder="Digite seu texto aqui..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="font-mono"
                                    />
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    className="w-full"
                                    size="lg"
                                    disabled={loading}
                                >
                                    {loading ? "Gerando..." : "Gerar Hashes"}
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Hashes Gerados</CardTitle>
                                <CardDescription>
                                    {hashes ? "Clique para copiar cada hash" : "Os hashes aparecerão aqui"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {hashes ? (
                                    <div className="space-y-4">
                                        {Object.entries(hashes).map(([algorithm, hash]) => (
                                            <div key={algorithm} className="space-y-2">
                                                <Label className="text-sm font-semibold">{algorithm}</Label>
                                                <div className="rounded-lg border bg-muted p-3">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <code className="text-xs font-mono break-all flex-1">
                                                            {hash}
                                                        </code>
                                                        <CopyButton text={hash} className="shrink-0" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        Digite um texto e clique em "Gerar Hashes"
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre Hashes Criptográficos</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                Hashes criptográficos são funções matemáticas que transformam dados de qualquer tamanho
                                em uma string de tamanho fixo. São amplamente usados para:
                            </p>
                            <ul>
                                <li>Verificação de integridade de arquivos</li>
                                <li>Armazenamento seguro de senhas</li>
                                <li>Assinaturas digitais</li>
                                <li>Blockchain e criptomoedas</li>
                            </ul>
                            <p>
                                <strong>SHA-256</strong> e <strong>SHA-512</strong> são considerados seguros para uso em produção.
                                <strong>SHA-1</strong> está obsoleto e não deve ser usado para segurança.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            
        </div>
    )
}

