'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShareButtons } from '@/components/share-buttons'
import { RelatedTools } from '@/components/tools/related-tools'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ToolFaqSection } from '@/components/tools/tool-faq-section'
import { parseBrazilianNumber } from '@/lib/utils/calculators/everyday'
import { calculateSeverance, type NoticeType, type SeveranceReason } from '@/lib/utils/calculators/severance'

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const fmtDate = (iso: string) => iso.split('-').reverse().join('/')
const selectClass =
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

const REASONS: { value: SeveranceReason; label: string }[] = [
    { value: 'sem_justa_causa', label: 'Demissão sem justa causa' },
    { value: 'pedido_demissao', label: 'Pedido de demissão' },
    { value: 'acordo', label: 'Acordo entre as partes (art. 484-A)' },
    { value: 'justa_causa', label: 'Demissão por justa causa' },
]

export function SeveranceCalculatorPage() {
    const [salary, setSalary] = useState('3.000,00')
    const [admission, setAdmission] = useState('2023-03-01')
    const [exit, setExit] = useState('')
    const [reason, setReason] = useState<SeveranceReason>('sem_justa_causa')
    const [notice, setNotice] = useState<NoticeType>('indenizado')
    const [vested, setVested] = useState('0')
    const [fgts, setFgts] = useState('')

    // A página é estática: a data de saída padrão (hoje) é preenchida no navegador
    useEffect(() => {
        const d = new Date()
        setExit(new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10))
    }, [])

    // Opções de aviso válidas para cada motivo
    const noticeOptions: { value: NoticeType; label: string }[] =
        reason === 'pedido_demissao'
            ? [
                  { value: 'trabalhado', label: 'Cumprido (ou dispensado pela empresa)' },
                  { value: 'nao_cumprido', label: 'Não cumprido' },
              ]
            : reason === 'justa_causa'
              ? []
              : [
                    { value: 'indenizado', label: 'Indenizado (não trabalhado)' },
                    { value: 'trabalhado', label: 'Trabalhado' },
                ]
    const effectiveNotice = noticeOptions.some((o) => o.value === notice) ? notice : noticeOptions[0]?.value ?? 'trabalhado'

    const salaryN = parseBrazilianNumber(salary)
    const fgtsN = fgts.trim() ? parseBrazilianNumber(fgts) : null
    const result =
        salaryN && exit
            ? calculateSeverance({
                  salary: salaryN,
                  admission,
                  exit,
                  reason,
                  notice: effectiveNotice,
                  vestedVacationPeriods: Number(vested),
                  fgtsBalance: fgtsN,
              })
            : null

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <Breadcrumbs items={[{ label: 'Ferramentas' }, { label: 'Dados Financeiros' }, { label: 'Calculadora de Rescisão' }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Calculadora de Rescisão Trabalhista</h1>
                        <p className="text-muted-foreground">
                            Simule as verbas da rescisão pela CLT: saldo de salário, aviso prévio, 13º, férias com 1/3 e multa do FGTS, para cada motivo de saída.
                        </p>
                    </div>

                    <Card>
                        <CardContent className="p-6 grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="salary">Último salário bruto (R$)</Label>
                                <Input id="salary" inputMode="decimal" value={salary} onChange={(e) => setSalary(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reason">Motivo da saída</Label>
                                <select id="reason" className={selectClass} value={reason} onChange={(e) => setReason(e.target.value as SeveranceReason)}>
                                    {REASONS.map((r) => (
                                        <option key={r.value} value={r.value}>{r.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="admission">Data de admissão</Label>
                                <Input id="admission" type="date" value={admission} onChange={(e) => setAdmission(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="exit">Último dia trabalhado</Label>
                                <Input id="exit" type="date" value={exit} onChange={(e) => setExit(e.target.value)} />
                            </div>
                            {noticeOptions.length > 0 && (
                                <div className="space-y-2">
                                    <Label htmlFor="notice">Aviso prévio</Label>
                                    <select id="notice" className={selectClass} value={effectiveNotice} onChange={(e) => setNotice(e.target.value as NoticeType)}>
                                        {noticeOptions.map((o) => (
                                            <option key={o.value} value={o.value}>{o.label}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="vested">Férias vencidas não tiradas</Label>
                                <select id="vested" className={selectClass} value={vested} onChange={(e) => setVested(e.target.value)}>
                                    <option value="0">Nenhuma</option>
                                    <option value="1">1 período</option>
                                    <option value="2">2 períodos</option>
                                </select>
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="fgts">Saldo do FGTS (opcional)</Label>
                                <Input id="fgts" inputMode="decimal" placeholder="Veja no app FGTS; sem ele a multa é estimada" value={fgts} onChange={(e) => setFgts(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    {result ? (
                        <section aria-live="polite" className="mt-6 space-y-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Verbas rescisórias (valores brutos)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <table className="w-full text-sm">
                                        <tbody>
                                            {result.items.map((i) => (
                                                <tr key={i.key} className="border-b last:border-0">
                                                    <td className="py-2 pr-2">
                                                        <div className="font-medium">{i.label}</div>
                                                        <div className="text-xs text-muted-foreground">{i.detail}</div>
                                                    </td>
                                                    <td className={`py-2 text-right whitespace-nowrap font-medium ${i.value < 0 ? 'text-destructive' : ''}`}>{brl(i.value)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className="pt-3 font-semibold">Total bruto da rescisão</td>
                                                <td className="pt-3 text-right text-xl font-bold text-primary whitespace-nowrap">{brl(result.total)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </CardContent>
                            </Card>

                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-xl border bg-card p-4">
                                    <div className="text-sm text-muted-foreground">Multa do FGTS{result.fgts.rate ? ` (${result.fgts.rate * 100}%)` : ''}</div>
                                    <div className="text-2xl font-bold mt-1">{brl(result.fgts.fine)}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {result.fgts.rate === 0 ? 'Não há multa neste motivo' : result.fgts.estimated ? 'Estimada: informe o saldo para o valor exato' : 'Depositada na conta do FGTS'}
                                    </div>
                                </div>
                                <div className="rounded-xl border bg-card p-4">
                                    <div className="text-sm text-muted-foreground">FGTS e seguro-desemprego</div>
                                    <div className="text-sm font-medium mt-1">{result.fgts.withdrawal}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {result.unemploymentInsurance ? 'Pode ter direito ao seguro-desemprego' : 'Sem direito ao seguro-desemprego'}
                                    </div>
                                </div>
                                <div className="rounded-xl border bg-card p-4">
                                    <div className="text-sm text-muted-foreground">Tempo de casa</div>
                                    <div className="text-2xl font-bold mt-1">{result.serviceYears} {result.serviceYears === 1 ? 'ano' : 'anos'}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {result.projectedEnd !== exit ? `Contrato projetado até ${fmtDate(result.projectedEnd)}` : `Aviso de ${result.noticeDays} dias`}
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Simulação com base na CLT. Os valores não descontam INSS e Imposto de Renda e não consideram horas extras, adicionais, comissões, médias de variáveis, adiantamento do 13º nem regras de convenção coletiva. Confira o termo de rescisão com o RH ou com o sindicato.
                            </p>
                        </section>
                    ) : (
                        <p className="mt-6 text-sm text-muted-foreground">Preencha o salário e datas válidas (a saída precisa ser depois da admissão).</p>
                    )}

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Como cada verba é calculada</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <ul>
                                <li><strong>Saldo de salário:</strong> salário ÷ 30 × dias trabalhados no mês da saída.</li>
                                <li><strong>Aviso prévio indenizado:</strong> 30 dias mais 3 por ano completo de empresa, até 90 dias (Lei 12.506/2011). Ele também conta como tempo de serviço, o que pode aumentar o 13º e as férias.</li>
                                <li><strong>13º proporcional:</strong> salário ÷ 12 × meses do ano com 15 dias ou mais trabalhados.</li>
                                <li><strong>Férias:</strong> as vencidas valem um salário cada; as proporcionais, salário ÷ 12 × meses do período aquisitivo atual. Sobre o total entra o terço constitucional.</li>
                                <li><strong>Multa do FGTS:</strong> 40% do saldo na demissão sem justa causa e 20% no acordo.</li>
                            </ul>
                            <p>
                                No <strong>pedido de demissão</strong> não há aviso indenizado nem multa do FGTS, e a empresa pode descontar até um salário se o aviso não for cumprido. Na <strong>justa causa</strong> ficam só o saldo de salário e as férias vencidas com 1/3. No <strong>acordo</strong> (art. 484-A), o aviso indenizado e a multa são pagos pela metade, e o saque do FGTS fica limitado a 80%.
                            </p>
                            <p>
                                Para contar o tempo entre a admissão e a saída, use o <a href="/tools/utilities/day-counter">contador de dias</a>.
                            </p>
                            <div className="pt-4 border-t mt-4 not-prose">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons title="Calculadora de Rescisão" description="Simule saldo de salário, aviso prévio, 13º, férias e multa do FGTS." />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="severance-calculator" />
                    <RelatedTools currentToolSlug="severance-calculator" category="finance" customSlugs={['day-counter', 'tax-calculator', 'percentage-calculator', 'deadline-calculator']} />
                </div>
            </main>
        </div>
    )
}
