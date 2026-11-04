'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { CopyButton } from '@/components/copy-button'
import { ShareButtons } from '@/components/share-buttons'
import { RelatedTools } from '@/components/tools/related-tools'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ToolFaqSection } from '@/components/tools/tool-faq-section'
import { generateRandomNumbers, parseBrazilianNumber } from '@/lib/utils/calculators/everyday'

const MAX_COUNT = 1000

export function RandomNumberPage() {
    const [min, setMin] = useState('1')
    const [max, setMax] = useState('100')
    const [count, setCount] = useState('1')
    const [unique, setUnique] = useState(true)
    const [sort, setSort] = useState(false)
    const [numbers, setNumbers] = useState<number[]>([])
    const [error, setError] = useState('')

    const generate = () => {
        try {
            const [nMin, nMax, nCount] = [parseBrazilianNumber(min), parseBrazilianNumber(max), parseBrazilianNumber(count)]
            if (nMin === null || nMax === null || nCount === null) throw new RangeError('Preencha mínimo, máximo e quantidade')
            const qty = Math.min(nCount, MAX_COUNT)
            setNumbers(generateRandomNumbers({ min: nMin, max: nMax, count: qty, unique, sort }))
            setError('')
        } catch (e) {
            setNumbers([])
            setError((e as Error).message)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Utilidades" }, { "label": "Número Aleatório" }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Gerador de Número Aleatório</h1>
                        <p className="text-muted-foreground">
                            Sorteie números inteiros em qualquer intervalo, com ou sem repetição.
                        </p>
                    </div>

                    <Card className="mb-6">
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="rand-min">Mínimo</Label>
                                    <Input id="rand-min" type="number" value={min} onChange={(e) => setMin(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="rand-max">Máximo</Label>
                                    <Input id="rand-max" type="number" value={max} onChange={(e) => setMax(e.target.value)} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="rand-count">Quantidade</Label>
                                    <Input id="rand-count" type="number" min={1} max={MAX_COUNT} value={count} onChange={(e) => setCount(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-6">
                                <label className="flex items-center gap-2 text-sm">
                                    <Switch checked={unique} onCheckedChange={setUnique} />
                                    Sem repetição
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <Switch checked={sort} onCheckedChange={setSort} />
                                    Ordenar resultado
                                </label>
                            </div>
                            <Button size="lg" onClick={generate} className="w-full sm:w-auto">Sortear</Button>

                            {error && <p className="text-sm text-destructive">{error}</p>}
                            {numbers.length > 0 && (
                                <div className="rounded-lg border bg-muted p-4 flex items-start justify-between gap-4">
                                    <p className={numbers.length === 1 ? 'text-5xl font-bold' : 'text-lg font-mono break-words'}>
                                        {numbers.join(', ')}
                                    </p>
                                    <CopyButton text={numbers.join(', ')} className="shrink-0" />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Número Aleatório</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                Os números são sorteados com <code>crypto.getRandomValues</code>, o gerador criptográfico do navegador,
                                sem o viés do <code>Math.random</code>. Cada número do intervalo tem a mesma chance de sair, e nada é enviado
                                para servidores.
                            </p>
                            <div className="pt-4 border-t mt-4 not-prose">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Número Aleatório"
                                    description="Sorteie números aleatórios em qualquer intervalo."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="random-number" />
                    <RelatedTools currentToolSlug="random-number" category="utilities" customSlugs={['password', 'uuid', 'percentage-calculator', 'rule-of-three']} />
                </div>
            </main>
        </div>
    )
}
