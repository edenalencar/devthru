'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ShareButtons } from '@/components/share-buttons'
import { RelatedTools } from '@/components/tools/related-tools'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ToolFaqSection } from '@/components/tools/tool-faq-section'
import { countDays } from '@/lib/utils/calculators/dates'

const todayISO = () => {
    const d = new Date()
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10)
}

const fmtDate = (iso: string) => iso.split('-').reverse().join('/')
const plural = (n: number, one: string, many: string) => `${n.toLocaleString('pt-BR')} ${Math.abs(n) === 1 ? one : many}`

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
    return (
        <div className="rounded-xl border bg-card p-4">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="text-2xl font-bold mt-1">{value}</div>
            {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
        </div>
    )
}

export function DayCounterPage() {
    // Datas preenchidas no navegador: a página é estática e "hoje" muda todo dia
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [includeEnd, setIncludeEnd] = useState(false)
    const [includeOptional, setIncludeOptional] = useState(false)

    useEffect(() => {
        const t = todayISO()
        setStart(t)
        setEnd(`${t.slice(0, 4)}-12-31`)
    }, [])

    const result = start && end ? countDays(start, end, { includeEnd, includeOptional }) : null
    const abs = result ? Math.abs(result.totalDays) : 0

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <Breadcrumbs items={[{ label: 'Ferramentas' }, { label: 'Utilidades' }, { label: 'Contador de Dias' }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Contador de Dias entre Datas</h1>
                        <p className="text-muted-foreground">
                            Escolha duas datas e veja quantos dias corridos e dias úteis há entre elas, já descontando fins de semana e feriados nacionais.
                        </p>
                    </div>

                    <Card>
                        <CardContent className="p-6 grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="start">Data inicial</Label>
                                <div className="flex gap-2">
                                    <Input id="start" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
                                    <Button type="button" variant="outline" onClick={() => setStart(todayISO())}>Hoje</Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end">Data final</Label>
                                <div className="flex gap-2">
                                    <Input id="end" type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
                                    <Button type="button" variant="outline" onClick={() => setEnd(todayISO())}>Hoje</Button>
                                </div>
                            </div>
                            <label className="flex items-center gap-2 text-sm sm:col-span-2">
                                <input type="checkbox" className="h-4 w-4" checked={includeEnd} onChange={(e) => setIncludeEnd(e.target.checked)} />
                                Incluir o dia final na contagem
                            </label>
                            <label className="flex items-center gap-2 text-sm sm:col-span-2 -mt-4">
                                <input type="checkbox" className="h-4 w-4" checked={includeOptional} onChange={(e) => setIncludeOptional(e.target.checked)} />
                                Tratar Carnaval e Corpus Christi como dias não úteis
                            </label>
                        </CardContent>
                    </Card>

                    {result && (
                        <section aria-live="polite" className="mt-6 space-y-4">
                            <div className="rounded-xl border-2 border-primary/40 bg-primary/5 p-6 text-center">
                                <div className="text-sm text-muted-foreground">
                                    {result.totalDays < 0 ? 'A data final é anterior à inicial. Diferença de' : `De ${fmtDate(start)} a ${fmtDate(end)}`}
                                </div>
                                <div className="text-4xl font-bold text-primary mt-1">{plural(abs, 'dia', 'dias')}</div>
                                <div className="text-sm text-muted-foreground mt-1">corridos</div>
                            </div>
                            <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                                <Stat label="Dias úteis" value={result.businessDays.toLocaleString('pt-BR')} hint="seg. a sex., sem feriados" />
                                <Stat label="Fins de semana" value={result.weekendDays.toLocaleString('pt-BR')} hint="sábados e domingos" />
                                <Stat label="Semanas" value={result.weeks.toLocaleString('pt-BR')} hint={result.remainingDays ? `e ${plural(result.remainingDays, 'dia', 'dias')}` : 'exatas'} />
                                <Stat
                                    label="Em anos e meses"
                                    value={[result.years && plural(result.years, 'ano', 'anos'), result.months && plural(result.months, 'mês', 'meses')].filter(Boolean).join(' e ') || '—'}
                                    hint={result.days ? `e ${plural(result.days, 'dia', 'dias')}` : undefined}
                                />
                            </div>
                            {result.holidaysOnWeekdays.length > 0 && (
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Feriados descontados ({result.holidaysOnWeekdays.length})</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="text-sm text-muted-foreground grid sm:grid-cols-2 gap-1">
                                            {result.holidaysOnWeekdays.map((h) => (
                                                <li key={h.date}>
                                                    <span className="font-medium text-foreground">{fmtDate(h.date)}</span> · {h.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}
                        </section>
                    )}
                    {start && end && !result && (
                        <p className="mt-6 text-sm text-destructive">Data inválida. Confira o dia, o mês e o ano.</p>
                    )}

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Como a contagem é feita</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                <strong>Dias corridos</strong> são todos os dias do calendário entre as duas datas. Por padrão a data inicial entra na conta e a final não, como acontece ao calcular a idade ou o tempo até um evento: de 1º a 3 de janeiro são 2 dias. Marque &quot;incluir o dia final&quot; quando os dois dias contarem, como numa viagem ou num período de férias.
                            </p>
                            <p>
                                <strong>Dias úteis</strong> são os dias de segunda a sexta-feira que não caem em feriado nacional: Confraternização Universal, Sexta-feira Santa, Tiradentes, Dia do Trabalho, Independência, Nossa Senhora Aparecida, Finados, Proclamação da República, Consciência Negra (a partir de 2024) e Natal. Carnaval e Corpus Christi são pontos facultativos e só são descontados se você marcar a opção. Feriados estaduais e municipais não entram na conta.
                            </p>
                            <p>
                                Para descobrir a data que cai daqui a um certo número de dias, use a <a href="/tools/utilities/deadline-calculator">calculadora de prazo</a>.
                            </p>
                            <div className="pt-4 border-t mt-4 not-prose">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons title="Contador de Dias" description="Conte dias corridos e dias úteis entre duas datas." />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="day-counter" />
                    <RelatedTools currentToolSlug="day-counter" category="utilities" customSlugs={['deadline-calculator', 'severance-calculator', 'percentage-calculator', 'timestamp']} />
                </div>
            </main>
        </div>
    )
}
