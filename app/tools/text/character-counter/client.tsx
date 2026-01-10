'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/navbar'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { countText } from '@/lib/utils/text'

export function CharacterCounterPage() {
    const [text, setText] = useState('')
    const [stats, setStats] = useState({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        lines: 0,
        paragraphs: 0
    })

    useEffect(() => {
        setStats(countText(text))
    }, [text])

    const StatCard = ({ title, value }: { title: string; value: number }) => (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Contador de Caracteres</h1>
                        <p className="text-muted-foreground">
                            Conte caracteres, palavras, linhas e parágrafos do seu texto em tempo real.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
                            <StatCard title="Caracteres" value={stats.characters} />
                            <StatCard title="Sem Espaços" value={stats.charactersNoSpaces} />
                            <StatCard title="Palavras" value={stats.words} />
                            <StatCard title="Linhas" value={stats.lines} />
                            <StatCard title="Parágrafos" value={stats.paragraphs} />
                        </div>

                        <Card>
                            <CardContent className="p-6">
                                <Textarea
                                    placeholder="Digite ou cole seu texto aqui..."
                                    className="min-h-[300px] resize-y text-lg"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Contador de Caracteres</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Contador de Caracteres é uma ferramenta simples e eficiente para analisar seus textos.
                                Ele fornece estatísticas em tempo real sobre o número de caracteres, palavras, linhas e parágrafos,
                                ajudando você a ajustar seu conteúdo para limites específicos de redes sociais ou documentos.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> A contagem é realizada localmente no seu navegador para garantir privacidade e velocidade.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>


        </div>
    )
}
