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
import { parseBrazilianNumber as parse, ruleOfThree } from '@/lib/utils/calculators/everyday'

const fmt = (n: number) => n.toLocaleString('pt-BR', { maximumFractionDigits: 6 })

export function RuleOfThreePage() {
    const [a, setA] = useState('2')
    const [b, setB] = useState('10')
    const [c, setC] = useState('5')
    const [inverse, setInverse] = useState(false)

    const result = useMemo(() => {
        const [na, nb, nc] = [parse(a), parse(b), parse(c)]
        if (na === null || nb === null || nc === null) return null
        try {
            const x = ruleOfThree(na, nb, nc, inverse)
            const steps = inverse
                ? `X = (${fmt(na)} × ${fmt(nb)}) ÷ ${fmt(nc)} = ${fmt(x)}`
                : `X = (${fmt(nb)} × ${fmt(nc)}) ÷ ${fmt(na)} = ${fmt(x)}`
            return { x, steps, error: '' }
        } catch (e) {
            return { x: null, steps: '', error: (e as Error).message }
        }
    }, [a, b, c, inverse])

    const field = (id: string, label: string, value: string, set: (v: string) => void) => (
        <div className="space-y-1 min-w-0">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} inputMode="decimal" value={value} onChange={(e) => set(e.target.value)} className="text-lg" />
        </div>
    )

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Utilidades" }, { "label": "Regra de 3" }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Calculadora de Regra de 3</h1>
                        <p className="text-muted-foreground">
                            Preencha três valores e descubra o quarto. Funciona para regra de três simples direta e inversa.
                        </p>
                    </div>

                    <Card className="mb-6">
                        <CardContent className="p-6 space-y-6">
                            <div className="flex flex-wrap gap-2">
                                <Button variant={!inverse ? 'default' : 'outline'} onClick={() => setInverse(false)}>
                                    Diretamente proporcional
                                </Button>
                                <Button variant={inverse ? 'default' : 'outline'} onClick={() => setInverse(true)}>
                                    Inversamente proporcional
                                </Button>
                            </div>

                            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
                                {field('rule-a', 'A', a, setA)}
                                <span className="pb-2 text-muted-foreground">está para</span>
                                {field('rule-b', 'B', b, setB)}
                                {field('rule-c', 'C', c, setC)}
                                <span className="pb-2 text-muted-foreground">está para</span>
                                <div className="space-y-1 min-w-0">
                                    <Label>X</Label>
                                    <div className="h-10 rounded-md border bg-muted px-3 flex items-center text-lg font-semibold">
                                        {result?.x != null ? fmt(result.x) : '?'}
                                    </div>
                                </div>
                            </div>

                            {result?.error && <p className="text-sm text-destructive">{result.error}</p>}
                            {result?.x != null && (
                                <div className="rounded-lg border bg-muted p-4 flex items-center justify-between gap-4">
                                    <p className="font-mono text-sm break-all">{result.steps}</p>
                                    <CopyButton text={fmt(result.x)} className="shrink-0" />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Como fazer regra de 3</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                <strong>Direta:</strong> quando uma grandeza aumenta e a outra também. Exemplo: se 2 kg custam R$ 10, quanto
                                custam 5 kg? Multiplique cruzado: X = (10 × 5) ÷ 2 = R$ 25.
                            </p>
                            <p>
                                <strong>Inversa:</strong> quando uma grandeza aumenta e a outra diminui. Exemplo: 4 pedreiros levam 6 dias
                                para uma obra; quantos dias levam 8 pedreiros? X = (4 × 6) ÷ 8 = 3 dias.
                            </p>
                            <div className="pt-4 border-t mt-4 not-prose">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Calculadora de Regra de 3"
                                    description="Calcule regra de três simples direta e inversa."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="rule-of-three" />
                    <RelatedTools currentToolSlug="rule-of-three" category="utilities" customSlugs={['percentage-calculator', 'random-number', 'deadline-calculator', 'number-to-words']} />
                </div>
            </main>
        </div>
    )
}
