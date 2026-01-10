"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from "@/components/copy-button"
import { generateLoremIpsum } from "@/lib/utils/generators/lorem"
import { Type } from "lucide-react"
import { ConfigurationManager } from "@/components/tools/configuration-manager"

export function LoremIpsumPage() {
    const [text, setText] = useState("")
    const [type, setType] = useState<"words" | "sentences" | "paragraphs">("paragraphs")
    const [count, setCount] = useState(3)

    const handleGenerate = () => {
        const generated = generateLoremIpsum(type, count)
        setText(generated)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Type className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador Lorem Ipsum</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere texto placeholder para seus projetos e mockups.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Configurações</CardTitle>
                                <CardDescription>
                                    Personalize o texto gerado
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Tipo de Texto</Label>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="paragraphs"
                                                name="type"
                                                checked={type === "paragraphs"}
                                                onChange={() => setType("paragraphs")}
                                                className="h-4 w-4"
                                            />
                                            <Label htmlFor="paragraphs">Parágrafos</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="sentences"
                                                name="type"
                                                checked={type === "sentences"}
                                                onChange={() => setType("sentences")}
                                                className="h-4 w-4"
                                            />
                                            <Label htmlFor="sentences">Sentenças</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="words"
                                                name="type"
                                                checked={type === "words"}
                                                onChange={() => setType("words")}
                                                className="h-4 w-4"
                                            />
                                            <Label htmlFor="words">Palavras</Label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="count">
                                        Quantidade de {type === "paragraphs" ? "Parágrafos" : type === "sentences" ? "Sentenças" : "Palavras"}
                                    </Label>
                                    <Input
                                        id="count"
                                        type="number"
                                        min="1"
                                        max="100"
                                        value={count}
                                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                                    />
                                </div>

                                <Button onClick={handleGenerate} className="w-full" size="lg">
                                    Gerar Texto
                                </Button>

                                <ConfigurationManager
                                    toolId="lorem-ipsum"
                                    currentConfig={{ type, count }}
                                    onLoadConfig={(config) => {
                                        if (config.type) setType(config.type)
                                        if (config.count) setCount(config.count)
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Texto Gerado</CardTitle>
                                <CardDescription>
                                    {text ? `${text.split(" ").length} palavras geradas` : "Clique em gerar para criar texto"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {text ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-end">
                                            <CopyButton text={text} />
                                        </div>
                                        <div className="rounded-lg border bg-muted p-6 max-h-96 overflow-y-auto">
                                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                                {type === "paragraphs" ? (
                                                    text.split("\n\n").map((paragraph, index) => (
                                                        <p key={index}>{paragraph}</p>
                                                    ))
                                                ) : (
                                                    <p>{text}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        Nenhum texto gerado ainda
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre Lorem Ipsum</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                Lorem Ipsum é um texto placeholder usado na indústria de design e tipografia desde os anos 1500.
                                É usado para preencher espaços em layouts e mockups antes do conteúdo final estar disponível.
                            </p>
                            <p>
                                <strong>Casos de uso:</strong>
                            </p>
                            <ul>
                                <li>Mockups de websites e aplicativos</li>
                                <li>Protótipos de design</li>
                                <li>Testes de tipografia e layout</li>
                                <li>Demonstrações de produtos</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>


        </div>
    )
}
