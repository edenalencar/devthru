'use client'

import { useMemo, useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/copy-button'
import { ShareButtons } from '@/components/share-buttons'
import { RelatedTools } from '@/components/tools/related-tools'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ToolFaqSection } from '@/components/tools/tool-faq-section'
import { currencyToWords, integerToWords, parseBrazilianNumber } from '@/lib/utils/calculators/everyday'

type Mode = 'number' | 'currency'

export function NumberToWordsPage() {
    const [input, setInput] = useState('1.250,99')
    const [mode, setMode] = useState<Mode>('currency')

    const { output, error } = useMemo(() => {
        const n = parseBrazilianNumber(input)
        if (n === null) return { output: '', error: input.trim() ? 'Digite um número válido.' : '' }
        try {
            if (mode === 'currency') return { output: currencyToWords(n), error: '' }
            if (!Number.isInteger(n)) return { output: '', error: 'Para números com casas decimais, use o modo Reais.' }
            return { output: integerToWords(n), error: '' }
        } catch {
            return { output: '', error: 'O limite é 999 trilhões.' }
        }
    }, [input, mode])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Conversores" }, { "label": "Número por Extenso" }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Número por Extenso</h1>
                        <p className="text-muted-foreground">
                            Escreva números e valores em reais por extenso, seguindo as regras do português do Brasil.
                        </p>
                    </div>

                    <Card className="mb-6">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <Button variant={mode === 'currency' ? 'default' : 'outline'} onClick={() => setMode('currency')}>
                                    Reais (R$)
                                </Button>
                                <Button variant={mode === 'number' ? 'default' : 'outline'} onClick={() => setMode('number')}>
                                    Número
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="number-input">{mode === 'currency' ? 'Valor em reais' : 'Número inteiro'}</Label>
                                <Input
                                    id="number-input"
                                    inputMode="decimal"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={mode === 'currency' ? 'Ex: 1.250,99' : 'Ex: 1234'}
                                    className="text-lg py-6"
                                />
                            </div>
                            {error && <p className="text-sm text-destructive">{error}</p>}
                            {output && (
                                <div className="rounded-lg border bg-muted p-4 flex items-start justify-between gap-4">
                                    <p className="text-lg font-medium first-letter:uppercase">{output}</p>
                                    <CopyButton text={output} className="shrink-0" />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Como escrever números por extenso</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <ul>
                                <li>Use <strong>“e”</strong> entre centenas, dezenas e unidades: 345 = trezentos <em>e</em> quarenta <em>e</em> cinco.</li>
                                <li>“Mil” não leva “um” antes: 1.000 = mil; 1.100 = mil <em>e</em> cem.</li>
                                <li>100 é <strong>cem</strong>; de 101 a 199 usa-se <strong>cento</strong>: 150 = cento e cinquenta.</li>
                                <li>Milhões exatos em dinheiro levam “de”: R$ 1.000.000,00 = um milhão <em>de</em> reais.</li>
                                <li>Em cheques e contratos, o valor por extenso prevalece sobre o numérico em caso de divergência.</li>
                            </ul>
                            <div className="pt-4 border-t mt-4 not-prose">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Número por Extenso Online"
                                    description="Escreva números e valores em reais por extenso."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="number-to-words" />
                    <RelatedTools currentToolSlug="number-to-words" category="converters" />
                </div>
            </main>
        </div>
    )
}
