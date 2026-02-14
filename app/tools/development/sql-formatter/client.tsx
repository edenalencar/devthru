"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Trash2, Code2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { format } from "sql-formatter"
import { RelatedTools } from "@/components/tools/related-tools"

import { Navbar } from "@/components/layout/navbar"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

type SqlDialect = "sql" | "postgresql" | "mysql" | "mariadb" | "sqlite"

export function SqlFormatterPage() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [dialect, setDialect] = useState<SqlDialect>("sql")

    const handleFormat = () => {
        try {
            if (!input.trim()) return

            const formatted = format(input, {
                language: dialect,
                tabWidth: 2,
                keywordCase: 'upper',
            })
            setOutput(formatted)
        } catch (error) {
            toast.error("Erro ao formatar SQL. Verifique a sintaxe.")
        }
    }

    const copyToClipboard = () => {
        if (!output) return
        navigator.clipboard.writeText(output)
        toast.success("SQL formatado copiado!")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Dev Tools" }, { "label": "SQL Formatter" }]} className="mb-6" />
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold tracking-tight">SQL Formatter / Beautifier</h1>
                        <p className="text-muted-foreground text-lg">
                            Formate suas queries SQL bagunçadas para um formato legível e padronizado.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Editor SQL</CardTitle>
                            <CardDescription>
                                Cole sua query SQL abaixo e clique em Formatar.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col sm:flex-row gap-4 items-end">
                                <div className="space-y-2 flex-1">
                                    <Label>Dialeto SQL</Label>
                                    <Select value={dialect} onValueChange={(v) => setDialect(v as SqlDialect)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o dialeto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sql">Standard SQL</SelectItem>
                                            <SelectItem value="postgresql">PostgreSQL</SelectItem>
                                            <SelectItem value="mysql">MySQL</SelectItem>
                                            <SelectItem value="mariadb">MariaDB</SelectItem>
                                            <SelectItem value="sqlite">SQLite</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleFormat} className="w-full sm:w-auto">
                                    <Code2 className="w-4 h-4 mr-2" />
                                    Formatar SQL
                                </Button>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="input">Input (SQL Bruto)</Label>
                                    <Textarea
                                        id="input"
                                        placeholder="SELECT * FROM users WHERE id = 1..."
                                        className="min-h-[400px] font-mono text-sm"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setInput("")}
                                            disabled={!input}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Limpar
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={async () => {
                                                const text = await navigator.clipboard.readText()
                                                setInput(text)
                                            }}
                                        >
                                            Colar
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="output">Output (SQL Formatado)</Label>
                                    <Textarea
                                        id="output"
                                        readOnly
                                        className="min-h-[400px] font-mono text-sm bg-muted text-primary"
                                        value={output}
                                        placeholder="O resultado aparecerá aqui..."
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={copyToClipboard}
                                            disabled={!output}
                                        >
                                            <Copy className="w-4 h-4 mr-2" />
                                            Copiar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <article className="prose dark:prose-invert max-w-none">
                        <h2>Boas práticas de formatação SQL</h2>
                        <p>
                            Escrever SQL legível é crucial para manutenção e colaboração. Algumas regras que esta ferramenta aplica:
                        </p>
                        <ul>
                            <li><strong>Palavras-chave em Maiúsculo:</strong> SELECT, FROM, WHERE se destacam.</li>
                            <li><strong>Indentação:</strong> Cláusulas aninhadas são indentadas para mostrar hierarquia.</li>
                            <li><strong>Quebras de Linha:</strong>Cada cláusula principal começa em uma nova linha.</li>
                        </ul>
                    </article>
                    <RelatedTools currentToolSlug="sql-formatter" category="development" />
                </div>
            </main>
        </div>
    )
}
