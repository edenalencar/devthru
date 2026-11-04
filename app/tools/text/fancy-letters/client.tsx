'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CopyButton } from '@/components/copy-button'
import { ShareButtons } from '@/components/share-buttons'
import { RelatedTools } from '@/components/tools/related-tools'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ToolFaqSection } from '@/components/tools/tool-faq-section'
import { FANCY_STYLES } from '@/lib/utils/fancy-text'

export function FancyLettersPage() {
    const [text, setText] = useState('Letras Diferentes')

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Texto e Conversão" }, { "label": "Letras Diferentes" }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Letras Diferentes para Copiar e Colar</h1>
                        <p className="text-muted-foreground">
                            Digite seu texto e copie a versão com letras bonitas para bio do Instagram, nick de jogo, WhatsApp ou TikTok.
                        </p>
                    </div>

                    <Card className="mb-6">
                        <CardContent className="p-6 space-y-2">
                            <Label htmlFor="fancy-input">Seu texto</Label>
                            <Input
                                id="fancy-input"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Digite seu nome ou frase"
                                className="text-lg py-6"
                                maxLength={300}
                            />
                        </CardContent>
                    </Card>

                    <div className="space-y-3">
                        {FANCY_STYLES.map((style) => {
                            const output = style.transform(text)
                            return (
                                <Card key={style.id}>
                                    <CardContent className="p-4 flex items-center justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground mb-1">{style.name}</p>
                                            <p className="text-xl [overflow-wrap:anywhere]">{output || ' '}</p>
                                        </div>
                                        <CopyButton text={output} className="shrink-0" />
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre as Letras Diferentes</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                As letras diferentes não são uma fonte: são caracteres especiais do padrão Unicode (como os alfabetos
                                matemáticos em negrito, cursiva e gótica). Por isso continuam estilizadas quando você cola o texto em
                                qualquer aplicativo que aceite Unicode, sem instalar nada.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <strong>Dica:</strong> leitores de tela e buscas internas podem não reconhecer esses caracteres. Use-os em
                                nomes, bios e títulos curtos, e mantenha textos importantes com letras normais.
                            </p>
                            <div className="pt-4 border-t mt-4 not-prose">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Letras Diferentes para Copiar e Colar"
                                    description="Gere letras bonitas para Instagram, nicks e WhatsApp."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="fancy-letters" />
                    <RelatedTools currentToolSlug="fancy-letters" category="text" />
                </div>
            </main>
        </div>
    )
}
