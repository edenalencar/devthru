'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShareButtons } from '@/components/share-buttons'
import { RelatedTools } from '@/components/tools/related-tools'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ToolFaqSection } from '@/components/tools/tool-faq-section'
import { parseBrazilianNumber as parse, percentage } from '@/lib/utils/calculators/everyday'

const fmt = (n: number) => n.toLocaleString('pt-BR', { maximumFractionDigits: 4 })

interface RowProps {
    id: string
    before: string
    middle: string
    after?: string
    initial: [string, string]
    compute: (x: number, y: number) => number
    suffix?: string
}

function CalcRow({ id, before, middle, after, initial, compute, suffix = '' }: RowProps) {
    const [x, setX] = useState(initial[0])
    const [y, setY] = useState(initial[1])
    const nx = parse(x)
    const ny = parse(y)
    let result = '—'
    if (nx !== null && ny !== null) {
        try {
            result = `${fmt(compute(nx, ny))}${suffix}`
        } catch {
            result = '—'
        }
    }

    return (
        <Card>
            <CardContent className="p-4 flex flex-wrap items-center gap-2 text-base">
                <span>{before}</span>
                <Input aria-label={`${id} valor 1`} inputMode="decimal" value={x} onChange={(e) => setX(e.target.value)} className="w-28" />
                <span>{middle}</span>
                <Input aria-label={`${id} valor 2`} inputMode="decimal" value={y} onChange={(e) => setY(e.target.value)} className="w-28" />
                {after && <span>{after}</span>}
                <span className="font-semibold">= <span className="text-primary text-lg">{result}</span></span>
            </CardContent>
        </Card>
    )
}

export function PercentageCalculatorPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Utilidades" }, { "label": "Calculadora de Porcentagem" }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Calculadora de Porcentagem</h1>
                        <p className="text-muted-foreground">
                            Escolha o cálculo e preencha os valores. O resultado aparece na hora.
                        </p>
                    </div>

                    <div className="grid gap-3">
                        <CalcRow id="pct-of" before="Quanto é" middle="% de" initial={['15', '200']} compute={percentage.of} />
                        <CalcRow id="pct-ratio" before="O valor" middle="é qual % de" initial={['30', '200']} compute={percentage.ratio} suffix="%" />
                        <CalcRow id="pct-change" before="De" middle="para" after="variou" initial={['80', '100']} compute={percentage.change} suffix="%" />
                        <CalcRow id="pct-increase" before="Valor" middle="com aumento de (%)" initial={['200', '10']} compute={percentage.increase} />
                        <CalcRow id="pct-decrease" before="Valor" middle="com desconto de (%)" initial={['200', '10']} compute={percentage.decrease} />
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Fórmulas de porcentagem</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <ul>
                                <li><strong>X% de Y:</strong> (X × Y) ÷ 100. Ex.: 15% de 200 = 30.</li>
                                <li><strong>X é quantos % de Y:</strong> (X ÷ Y) × 100. Ex.: 30 é 15% de 200.</li>
                                <li><strong>Variação percentual:</strong> ((novo − antigo) ÷ antigo) × 100. Ex.: de 80 para 100 = +25%.</li>
                                <li><strong>Aumento:</strong> Y × (1 + X/100). <strong>Desconto:</strong> Y × (1 − X/100).</li>
                            </ul>
                            <div className="pt-4 border-t mt-4 not-prose">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Calculadora de Porcentagem"
                                    description="Calcule porcentagem, aumento, desconto e variação percentual."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="percentage-calculator" />
                    <RelatedTools currentToolSlug="percentage-calculator" category="utilities" customSlugs={['rule-of-three', 'number-to-words', 'random-number', 'deadline-calculator']} />
                </div>
            </main>
        </div>
    )
}
