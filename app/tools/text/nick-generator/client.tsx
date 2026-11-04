'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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
import { NICK_STYLES, NICK_STYLE_IDS, generateNicks, type NickStyle } from '@/lib/utils/generators/nick'
import { FANCY_STYLES } from '@/lib/utils/fancy-text'
import { RefreshCw } from 'lucide-react'

const STYLE_OPTIONS: { id: NickStyle; label: string }[] = [
    ...NICK_STYLE_IDS.map((id) => ({ id, label: NICK_STYLES[id].label })),
    { id: 'aleatorio', label: 'Misturado' },
]
// Estilos de letra com melhor compatibilidade em jogos e apps
const LETTER_STYLES = FANCY_STYLES.filter((s) => ['bold', 'italic', 'script', 'fraktur', 'double-struck', 'small-caps', 'circled', 'monospace'].includes(s.id))

export function NickGeneratorPage() {
    const [style, setStyle] = useState<NickStyle>('gamer')
    const [name, setName] = useState('')
    const [numbers, setNumbers] = useState(true)
    const [letters, setLetters] = useState('none')
    const [nicks, setNicks] = useState<string[]>([])

    const generate = (nextStyle: NickStyle = style) => {
        setNicks(generateNicks({ style: nextStyle, name, numbers }))
    }

    // Gera só no cliente: Math.random no render do servidor causaria erro de hidratação.
    useEffect(() => {
        const id = setTimeout(() => generate(), 0)
        return () => clearTimeout(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const letterStyle = LETTER_STYLES.find((s) => s.id === letters)
    const display = (nick: string) => (letterStyle ? letterStyle.transform(nick) : nick)

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Texto e Conversão" }, { "label": "Gerador de Nicks" }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Gerador de Nicks</h1>
                        <p className="text-muted-foreground">
                            Crie nicks para Free Fire, Roblox, Discord, Instagram e qualquer jogo. Escolha o estilo, use seu nome e aplique letras diferentes.
                        </p>
                    </div>

                    <Card className="mb-6">
                        <CardContent className="p-6 space-y-5">
                            <div className="space-y-2">
                                <Label>Estilo</Label>
                                <div className="flex flex-wrap gap-2">
                                    {STYLE_OPTIONS.map((opt) => (
                                        <Button
                                            key={opt.id}
                                            variant={style === opt.id ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => { setStyle(opt.id); generate(opt.id) }}
                                        >
                                            {opt.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nick-name">Seu nome ou apelido (opcional)</Label>
                                    <Input id="nick-name" value={name} maxLength={20} placeholder="Ex: Lucas" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Letras diferentes</Label>
                                    <Select value={letters} onValueChange={setLetters}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Normal</SelectItem>
                                            {LETTER_STYLES.map((s) => (
                                                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <label className="flex items-center gap-2 text-sm">
                                    <Switch checked={numbers} onCheckedChange={setNumbers} />
                                    Incluir números
                                </label>
                                <Button onClick={() => generate()}>
                                    <RefreshCw className="h-4 w-4" />
                                    Gerar nicks
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {nicks.map((nick) => {
                            const shown = display(nick)
                            return (
                                <Card key={nick}>
                                    <CardContent className="p-4 flex items-center justify-between gap-3">
                                        <span className="text-lg font-medium min-w-0 [overflow-wrap:anywhere]">{shown}</span>
                                        <CopyButton text={shown} className="shrink-0" />
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Como escolher um bom nick</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <ul>
                                <li><strong>Curto e fácil de lembrar:</strong> nicks de até 12 caracteres são mais fáceis de digitar e de achar.</li>
                                <li><strong>Confira o limite do jogo:</strong> o Free Fire aceita até 12 caracteres e alguns jogos recusam símbolos.</li>
                                <li><strong>Evite dados pessoais:</strong> não use sobrenome completo, data de nascimento ou cidade no nick.</li>
                                <li><strong>Quer mais estilo?</strong> Use o <Link href="/tools/text/fancy-letters">gerador de letras diferentes</Link> para transformar qualquer texto.</li>
                            </ul>
                            <div className="pt-4 border-t mt-4 not-prose">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Nicks"
                                    description="Crie nicks para jogos e redes sociais."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="nick-generator" />
                    <RelatedTools currentToolSlug="nick-generator" category="text" customSlugs={['fancy-letters', 'name', 'random-number', 'password']} />
                </div>
            </main>
        </div>
    )
}
