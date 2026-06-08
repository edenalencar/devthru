"use client"

import Link from "next/link"

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
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Utilidades" }, { "label": "Gerador de UUID" }]} className="mb-6" />
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
                            <CardTitle>Sobre UUIDs e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    UUID (Universally Unique Identifier) é um identificador de 128 bits padronizado e usado para identificar de forma exclusiva informações em sistemas computacionais sem necessidade de coordenação central.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>O que é um UUID v4 e qual o seu tamanho?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground prose prose-sm max-w-none dark:prose-invert">
                                        <p>
                                            O UUID Versão 4 é um identificador gerado de forma puramente aleatória. Ele possui o tamanho exato de **36 caracteres**, contendo 32 caracteres hexadecimais separados por 4 hifens no formato: <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>.
                                        </p>
                                        <p>
                                            O dígito "4" na terceira seção indica que se trata de uma versão 4, e o caractere "y" na quarta seção é restrito aos valores 8, 9, a ou b.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Existe o risco de colisão ao usar UUID v4?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Na prática, o risco de colisão (gerar dois UUIDs iguais) é matematicamente desprezível. Com 122 bits de aleatoriedade, você precisaria gerar bilhões de UUIDs por segundo durante centenas de anos para ter 50% de chance de uma única colisão. Por isso, são ideais como chaves primárias em bancos de dados distribuídos.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Qual a diferença de UUID v4 para UUID v7?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Diferente do UUID v4 (que é 100% aleatório), o <strong>UUID v7</strong> incorpora um carimbo de data/hora (timestamp) de milissegundos nas primeiras posições. Isso torna o UUID v7 ordenável no tempo (time-ordered), o que melhora consideravelmente o desempenho de indexação em bancos de dados relacionais (evitando a fragmentação do índice B-Tree causada pela inserção aleatória do v4).
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <div className="mt-6 pt-4 border-t">
                                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Guias Relacionados</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/guides/generation/uuid-generator/python" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                                        Como gerar UUID v4 em Python
                                    </Link>
                                    <Link href="/guides/generation/uuid-generator/javascript" className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors">
                                        Como gerar UUID v4 em JavaScript
                                    </Link>
                                    <Link href="/guides/generation/uuid-generator/java" className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">
                                        Como gerar UUID em Java
                                    </Link>
                                    <Link href="/guides/generation/uuid-generator/csharp" className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                                        Como gerar GUID/UUID em C#
                                    </Link>
                                </div>
                            </div>

                            <div className="pt-4 border-t mt-4">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de UUID"
                                    description="Gere UUIDs v4 (Universally Unique Identifiers) online."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="uuid" category="utilities" />
                </div>
            </main>
        </div>
    )
}
