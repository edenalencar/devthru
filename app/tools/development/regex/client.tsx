"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Terminal, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/share-buttons"
import { Label } from "@/components/ui/label"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

const COMMON_PATTERNS = [
    { name: "Email", pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$" },
    { name: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)" },
    { name: "Data (DD/MM/AAAA)", pattern: "^\\d{2}\\/\\d{2}\\/\\d{4}$" },
    { name: "CPF", pattern: "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$" },
    { name: "Senha Forte", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$" },
    { name: "Apenas Números", pattern: "^\\d+$" },
    { name: "Sem Espaços", pattern: "^\\S+$" },
]

export function RegexGeneratorPage() {
    const [regex, setRegex] = useState("")
    const [flags, setFlags] = useState("gm")
    const [testString, setTestString] = useState("Teste seu regex aqui.\nEmail: exemplo@teste.com\nData: 29/11/2025")

    let matches: string[] = []
    let error: string | null = null

    if (regex) {
        try {
            const re = new RegExp(regex, flags)
            const found = testString.match(re)
            matches = found ? Array.from(found) : []
        } catch (err) {
            error = (err as Error).message
        }
    }

    const handlePatternClick = (pattern: string) => {
        setRegex(pattern)
    }

    const toggleFlag = (flag: string) => {
        if (flags.includes(flag)) {
            setFlags(flags.replace(flag, ""))
        } else {
            setFlags(flags + flag)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-8 max-w-5xl">
                    <Breadcrumbs items={[{"label":"Ferramentas"},{"label":"Desenvolvimento"},{"label":"Regex"}]} className="mb-6" />
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                            <Terminal className="h-8 w-8" />
                            Gerador e Testador de Regex
                        </h1>
                        <p className="text-muted-foreground">
                            Construa, teste e valide expressões regulares em tempo real
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1fr,300px]">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Expressão Regular</CardTitle>
                                    <CardDescription>
                                        Digite sua regex e selecione as flags
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-2 items-center">
                                        <div className="relative flex-1 font-mono text-lg">
                                            <span className="absolute left-3 top-2.5 text-muted-foreground">/</span>
                                            <Input
                                                value={regex}
                                                onChange={(e) => setRegex(e.target.value)}
                                                className="pl-6 pr-6 font-mono"
                                                placeholder="Digite sua regex..."
                                            />
                                            <span className="absolute right-3 top-2.5 text-muted-foreground">/</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {['g', 'i', 'm'].map((flag) => (
                                                <Button
                                                    key={flag}
                                                    variant={flags.includes(flag) ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => toggleFlag(flag)}
                                                    className="w-8 h-8 p-0 font-mono"
                                                >
                                                    {flag}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    {error && (
                                        <div className="text-sm text-destructive flex items-center gap-2">
                                            <XCircle className="h-4 w-4" />
                                            {error}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Texto de Teste</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={testString}
                                        onChange={(e) => setTestString(e.target.value)}
                                        className="font-mono min-h-[200px]"
                                        placeholder="Digite o texto para testar..."
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Resultados</CardTitle>
                                    <CardDescription>
                                        {matches.length} correspondência(s) encontrada(s)
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {matches.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {matches.map((match, i) => (
                                                <Badge key={i} variant="secondary" className="font-mono text-base px-3 py-1">
                                                    {match}
                                                </Badge>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-muted-foreground text-center py-8">
                                            Nenhuma correspondência encontrada
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Padrões Comuns</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-2">
                                    {COMMON_PATTERNS.map((item) => (
                                        <Button
                                            key={item.name}
                                            variant="outline"
                                            className="justify-start h-auto py-3 px-4 flex flex-col items-start gap-1"
                                            onClick={() => handlePatternClick(item.pattern)}
                                        >
                                            <span className="font-medium">{item.name}</span>
                                            <span className="text-xs text-muted-foreground font-mono truncate w-full text-left">
                                                {item.pattern}
                                            </span>
                                        </Button>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Cheatsheet</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm space-y-2 font-mono">
                                    <div className="flex justify-between"><span>.</span> <span className="text-muted-foreground">Qualquer caractere</span></div>
                                    <div className="flex justify-between"><span>\d</span> <span className="text-muted-foreground">Dígito (0-9)</span></div>
                                    <div className="flex justify-between"><span>\w</span> <span className="text-muted-foreground">Alfanumérico</span></div>
                                    <div className="flex justify-between"><span>\s</span> <span className="text-muted-foreground">Espaço em branco</span></div>
                                    <div className="flex justify-between"><span>^</span> <span className="text-muted-foreground">Início da linha</span></div>
                                    <div className="flex justify-between"><span>$</span> <span className="text-muted-foreground">Fim da linha</span></div>
                                    <div className="flex justify-between"><span>*</span> <span className="text-muted-foreground">0 ou mais</span></div>
                                    <div className="flex justify-between"><span>+</span> <span className="text-muted-foreground">1 ou mais</span></div>
                                    <div className="flex justify-between"><span>?</span> <span className="text-muted-foreground">0 ou 1</span></div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Regex</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Gerador e Testador de Regex é uma ferramenta para construir, testar e depurar expressões regulares em tempo real.
                                Inclui uma biblioteca de padrões comuns para validação de emails, CPFs, datas e URLs, além de uma referência rápida de sintaxe.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> As expressões regulares são processadas pelo motor JavaScript do seu navegador.
                            </p>
                        </CardContent>
                        <div className="pt-4 border-t px-6 pb-6">
                            <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                            <ShareButtons
                                title="Gerador de Regex"
                                description="Construa, teste e valide expressões regulares em tempo real."
                            />
                        </div>
                    </Card>
                </div>
            </main>

        </div>
    )
}
