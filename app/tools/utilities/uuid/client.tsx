"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from "@/components/copy-button"
import { generateUUID, generateMultipleUUIDs } from "@/lib/utils/generators/uuid"
import { Hash } from "lucide-react"
import { ConfigurationManager } from "@/components/tools/configuration-manager"

export function UUIDGeneratorPage() {
    const [generatedUUIDs, setGeneratedUUIDs] = useState<string[]>([])
    const [quantity, setQuantity] = useState(1)

    const handleGenerate = () => {
        if (quantity === 1) {
            setGeneratedUUIDs([generateUUID()])
        } else {
            setGeneratedUUIDs(generateMultipleUUIDs(quantity))
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Hash className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de UUID</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere identificadores únicos universais (UUID v4) para seus projetos.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Configurações</CardTitle>
                                <CardDescription>
                                    Personalize a geração de UUIDs
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Quantidade</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Gere de 1 a 100 UUIDs de uma vez
                                    </p>
                                </div>

                                <Button onClick={handleGenerate} className="w-full" size="lg">
                                    Gerar UUID{quantity > 1 ? "s" : ""}
                                </Button>

                                <ConfigurationManager
                                    toolId="uuid-generator"
                                    currentConfig={{ quantity }}
                                    onLoadConfig={(config) => {
                                        if (config.quantity !== undefined) {
                                            setQuantity(config.quantity)
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Resultado</CardTitle>
                                <CardDescription>
                                    {generatedUUIDs.length > 0
                                        ? `${generatedUUIDs.length} UUID${generatedUUIDs.length > 1 ? "s" : ""} gerado${generatedUUIDs.length > 1 ? "s" : ""}`
                                        : "Clique em gerar para criar UUIDs"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {generatedUUIDs.length > 0 ? (
                                    <div className="space-y-3">
                                        <div className="flex justify-end">
                                            <CopyButton text={generatedUUIDs.join("\n")} />
                                        </div>
                                        <div className="rounded-lg border bg-muted p-4 max-h-96 overflow-y-auto">
                                            <div className="space-y-2 font-mono text-sm">
                                                {generatedUUIDs.map((uuid, index) => (
                                                    <div key={index} className="flex items-center justify-between group">
                                                        <code>{uuid}</code>
                                                        <CopyButton text={uuid} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        Nenhum UUID gerado ainda
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre UUIDs</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                UUID (Universally Unique Identifier) é um identificador de 128 bits usado para identificar
                                informações em sistemas computacionais. Esta ferramenta gera UUIDs versão 4, que são
                                gerados aleatoriamente.
                            </p>
                            <p>
                                <strong>Formato:</strong> xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
                            </p>
                            <p className="text-sm text-muted-foreground">
                                UUIDs v4 têm uma probabilidade extremamente baixa de colisão, tornando-os ideais para
                                identificadores únicos em bancos de dados, APIs e sistemas distribuídos.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>


        </div>
    )
}
