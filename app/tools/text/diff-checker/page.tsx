'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { diffChars, diffWords, diffLines, Change } from 'diff'

export default function DiffCheckerPage() {
    const [original, setOriginal] = useState('')
    const [modified, setModified] = useState('')
    const [diffResult, setDiffResult] = useState<Change[] | null>(null)
    const [mode, setMode] = useState<'chars' | 'words' | 'lines'>('words')

    const handleCompare = () => {
        let result: Change[]
        switch (mode) {
            case 'chars':
                result = diffChars(original, modified)
                break
            case 'words':
                result = diffWords(original, modified)
                break
            case 'lines':
                result = diffLines(original, modified)
                break
        }
        setDiffResult(result)
    }

    const clearAll = () => {
        setOriginal('')
        setModified('')
        setDiffResult(null)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Comparador de Texto (Diff)</h1>
                            <p className="text-muted-foreground">
                                Compare dois textos e visualize as diferenças (adições e remoções).
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
                            <Button
                                variant={mode === 'chars' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setMode('chars')}
                            >
                                Caracteres
                            </Button>
                            <Button
                                variant={mode === 'words' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setMode('words')}
                            >
                                Palavras
                            </Button>
                            <Button
                                variant={mode === 'lines' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setMode('lines')}
                            >
                                Linhas
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2 mb-8">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle>Texto Original</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    placeholder="Cole o texto original aqui..."
                                    className="min-h-[300px] font-mono text-sm resize-none"
                                    value={original}
                                    onChange={(e) => setOriginal(e.target.value)}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle>Texto Modificado</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    placeholder="Cole o texto modificado aqui..."
                                    className="min-h-[300px] font-mono text-sm resize-none"
                                    value={modified}
                                    onChange={(e) => setModified(e.target.value)}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex justify-center gap-4 mb-8">
                        <Button variant="outline" onClick={clearAll} size="lg">
                            Limpar Tudo
                        </Button>
                        <Button onClick={handleCompare} size="lg" disabled={!original && !modified}>
                            Comparar Textos
                        </Button>
                    </div>

                    {diffResult && (
                        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <CardHeader>
                                <CardTitle>Resultado da Comparação</CardTitle>
                                <CardDescription>
                                    <span className="inline-flex items-center mr-4">
                                        <span className="w-3 h-3 bg-red-200 dark:bg-red-900/50 mr-2 rounded-sm"></span>
                                        Removido
                                    </span>
                                    <span className="inline-flex items-center">
                                        <span className="w-3 h-3 bg-green-200 dark:bg-green-900/50 mr-2 rounded-sm"></span>
                                        Adicionado
                                    </span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-muted/30 p-6 rounded-lg font-mono text-sm whitespace-pre-wrap break-words border">
                                    {diffResult.map((part, index) => {
                                        const color = part.added
                                            ? 'bg-green-200 dark:bg-green-900/50 text-green-900 dark:text-green-100'
                                            : part.removed
                                                ? 'bg-red-200 dark:bg-red-900/50 text-red-900 dark:text-red-100 decoration-slice'
                                                : 'text-foreground'

                                        return (
                                            <span key={index} className={`${color} ${part.removed ? 'line-through opacity-70' : ''}`}>
                                                {part.value}
                                            </span>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
