'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { generateSlug } from '@/lib/utils/text'
import { ToolResult } from '@/components/tools/tool-result'

export default function SlugGeneratorPage() {
    const [input, setInput] = useState('')
    const [slug, setSlug] = useState('')

    useEffect(() => {
        setSlug(generateSlug(input))
    }, [input])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2">Gerador de Slug</h1>
                        <p className="text-muted-foreground">
                            Transforme títulos e textos em URLs amigáveis (slugs) otimizadas para SEO.
                        </p>
                    </div>

                    <div className="grid gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Texto Original</CardTitle>
                                <CardDescription>
                                    Digite o título do seu post, produto ou página
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Label htmlFor="input">Título / Texto</Label>
                                    <Input
                                        id="input"
                                        placeholder="Ex: Como criar uma API com Next.js em 2025"
                                        className="text-lg py-6"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {input && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h3 className="text-lg font-semibold ml-1">Resultado</h3>
                                <ToolResult
                                    result={slug}
                                    toolId="slug-generator"
                                    toolName="Gerador de Slug"
                                    successMessage="Slug copiado com sucesso!"
                                />

                                <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                                    <p className="font-semibold mb-1">Como funciona:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Converte tudo para minúsculas</li>
                                        <li>Remove acentos e caracteres especiais (ex: "ç" vira "c", "ã" vira "a")</li>
                                        <li>Substitui espaços por hífens</li>
                                        <li>Remove caracteres não alfanuméricos</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
