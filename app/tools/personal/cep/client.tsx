'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CopyButton } from '@/components/copy-button'
import { ShareButtons } from '@/components/share-buttons'
import { RelatedTools } from '@/components/tools/related-tools'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { ToolFaqSection } from '@/components/tools/tool-faq-section'
import { ALL_UFS, CEP_RANGES, UF_NAMES, findUfByCep, generateCep, type UF } from '@/lib/utils/generators/cep'

const MAX_COUNT = 100
const UFS_BY_NAME = [...ALL_UFS].sort((a, b) => UF_NAMES[a].localeCompare(UF_NAMES[b]))

const fmtRange = (n: number) => `${n.toString().padStart(5, '0')}-000`
const fmtRangeEnd = (n: number) => `${n.toString().padStart(5, '0')}-999`

export function CepGeneratorPage() {
    const [uf, setUf] = useState<UF | 'all'>('SP')
    const [count, setCount] = useState('1')
    const [withMask, setWithMask] = useState(true)
    const [ceps, setCeps] = useState<string[]>([])
    const [lookup, setLookup] = useState('')

    const generate = () => {
        const qty = Math.min(Math.max(Math.floor(Number(count)) || 1, 1), MAX_COUNT)
        setCeps(Array.from({ length: qty }, () => generateCep(uf === 'all' ? undefined : uf, withMask)))
    }

    // Gera só no cliente: Math.random no render do servidor causaria erro de hidratação.
    useEffect(() => {
        const id = setTimeout(generate, 0)
        return () => clearTimeout(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const lookupDigits = lookup.replace(/\D/g, '')
    const lookupUf = lookupDigits.length === 8 ? findUfByCep(lookupDigits) : null

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Dados Pessoais" }, { "label": "Gerador de CEP" }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Gerador de CEP Válido</h1>
                        <p className="text-muted-foreground">
                            Gere CEPs dentro da faixa oficial dos Correios para cada estado e descubra a UF de qualquer CEP.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar CEP</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Estado (UF)</Label>
                                    <Select value={uf} onValueChange={(v) => setUf(v as UF | 'all')}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Aleatório (qualquer estado)</SelectItem>
                                            {UFS_BY_NAME.map((code) => (
                                                <SelectItem key={code} value={code}>{UF_NAMES[code]} ({code})</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4 items-end">
                                    <div className="space-y-2">
                                        <Label htmlFor="cep-count">Quantidade</Label>
                                        <Input id="cep-count" type="number" min={1} max={MAX_COUNT} value={count} onChange={(e) => setCount(e.target.value)} />
                                    </div>
                                    <label className="flex items-center gap-2 text-sm pb-2">
                                        <Switch checked={withMask} onCheckedChange={setWithMask} />
                                        Com hífen
                                    </label>
                                </div>
                                <Button onClick={generate} className="w-full">Gerar CEP</Button>

                                {ceps.length > 0 && (
                                    <div className="rounded-lg border bg-muted p-4 flex items-start justify-between gap-4">
                                        <p className={ceps.length === 1 ? 'text-3xl font-bold font-mono' : 'font-mono text-sm whitespace-pre-line'}>
                                            {ceps.join('\n')}
                                        </p>
                                        <CopyButton text={ceps.join('\n')} className="shrink-0" />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Descobrir o estado de um CEP</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cep-lookup">CEP</Label>
                                    <Input
                                        id="cep-lookup"
                                        inputMode="numeric"
                                        placeholder="00000-000"
                                        value={lookup}
                                        onChange={(e) => setLookup(e.target.value)}
                                        maxLength={9}
                                    />
                                </div>
                                {lookupDigits.length === 8 && (
                                    lookupUf ? (
                                        <p className="text-sm">
                                            Este CEP está na faixa de <strong>{UF_NAMES[lookupUf]} ({lookupUf})</strong>.
                                        </p>
                                    ) : (
                                        <p className="text-sm text-destructive">Este CEP está fora das faixas dos Correios.</p>
                                    )
                                )}
                                {lookup && lookupDigits.length !== 8 && (
                                    <p className="text-sm text-muted-foreground">Digite os 8 dígitos do CEP.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Faixas de CEP por estado</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
                                {UFS_BY_NAME.map((code) => (
                                    <div key={code} className="flex justify-between gap-2 border-b py-1">
                                        <span>{UF_NAMES[code]} ({code})</span>
                                        <span className="font-mono text-muted-foreground text-right">
                                            {CEP_RANGES[code].map(([a, b]) => `${fmtRange(a)} a ${fmtRangeEnd(b)}`).join(', ')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de CEP</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O CEP (Código de Endereçamento Postal) tem 8 dígitos. Os 5 primeiros indicam região, sub-região,
                                setor, subsetor e divisor de subsetor; os 3 últimos (sufixo) identificam o logradouro ou a unidade.
                                Os CEPs gerados aqui ficam dentro da faixa oficial de cada estado, com sufixo de 000 a 899, então
                                passam em validações de formato e de UF.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <strong>Atenção:</strong> os CEPs são aleatórios e servem para testes de software. Um CEP dentro da
                                faixa do estado pode não corresponder a um logradouro real; para endereços reais, consulte os Correios.
                            </p>
                            <div className="pt-4 border-t mt-4 not-prose">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de CEP Válido"
                                    description="Gere CEPs válidos por estado para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="cep" />
                    <RelatedTools currentToolSlug="cep" category="personal" customSlugs={['address', 'person', 'phone', 'cpf']} />
                </div>
            </main>
        </div>
    )
}
