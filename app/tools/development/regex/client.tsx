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
import { RelatedTools } from "@/components/tools/related-tools"
import { Label } from "@/components/ui/label"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Dev Tools" }, { "label": "Regex" }]} className="mb-6" />
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
                            <CardTitle>Sobre o Gerador de Regex e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    O Gerador e Testador de Regex é uma ferramenta projetada para construir, testar e depurar expressões regulares (Regex) em tempo real diretamente no seu navegador.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Qual a diferença entre os seletores `.+` e `.*` no Regex?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground prose prose-sm max-w-none dark:prose-invert">
                                        <p>
                                            Ambos são quantificadores usados combinando o caractere ponto (<code>.</code> - que representa qualquer caractere) com um quantificador de repetição:
                                        </p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li><strong><code>.+</code> (Um ou mais):</strong> O sinal de adição (<code>+</code>) exige que ocorra <strong>pelo menos um</strong> caractere correspondente. A busca falhará se a linha estiver vazia.</li>
                                            <li><strong><code>.*</code> (Zero ou mais):</strong> O asterisco (<code>*</code>) permite que ocorra <strong>qualquer quantidade</strong> de caracteres correspondentes, incluindo **nenhuma** (zero). Ele corresponderá a linhas vazias.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>O que fazem as flags `g`, `i` e `m` no Regex?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        <ul className="list-disc pl-4 space-y-2">
                                            <li><strong><code>g</code> (Global):</strong> Procura todas as correspondências no texto de entrada em vez de parar após encontrar a primeira ocorrência.</li>
                                            <li><strong><code>i</code> (Case Insensitive):</strong> Ignora a diferença entre letras maiúsculas e minúsculas durante a busca (ex: <code>/abc/i</code> encontrará "ABC").</li>
                                            <li><strong><code>m</code> (Multiline):</strong> Faz com que os caracteres de início (<code>^</code>) e fim (<code>$</code>) correspondam ao início e fim de cada linha individual do texto, e não apenas ao início e fim do texto completo.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <p className="text-sm text-muted-foreground mt-4 pt-4 border-t">
                                <strong>Nota de segurança:</strong> Nossos testes rodam 100% do lado do cliente (Client-Side) no motor JavaScript do seu próprio navegador. Suas expressões e dados de teste nunca são enviados ao servidor.
                            </p>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Regex"
                                    description="Construa, teste e valide expressões regulares em tempo real."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="regex" category="development" />
                </div>
            </main>

        </div>
    )
}
