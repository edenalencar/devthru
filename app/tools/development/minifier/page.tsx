"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileCode, ArrowRightLeft, Trash2 } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Language = "css" | "json" | "sql" | "html" | "javascript"

export default function MinifierPage() {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [language, setLanguage] = useState<Language>("css")
    const [mode, setMode] = useState<"minify" | "beautify">("minify")
    const [error, setError] = useState<string | null>(null)

    const processCode = () => {
        setError(null)
        if (!input.trim()) {
            setOutput("")
            return
        }

        try {
            let result = ""

            if (mode === "minify") {
                switch (language) {
                    case "json":
                        result = JSON.stringify(JSON.parse(input))
                        break
                    case "css":
                        result = input.replace(/\s+/g, ' ').replace(/{\s+/g, '{').replace(/}\s+/g, '}').replace(/;\s+/g, ';').replace(/\/\*[\s\S]*?\*\//g, '').trim()
                        break
                    case "sql":
                        result = input.replace(/\s+/g, ' ').trim()
                        break
                    case "html":
                        result = input.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim()
                        break
                    case "javascript":
                        // Basic JS minification (remove comments and extra spaces) - NOT production grade
                        result = input
                            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
                            .replace(/\/\/.*/g, '') // Remove line comments
                            .replace(/\s+/g, ' ')
                            .replace(/{\s+/g, '{')
                            .replace(/}\s+/g, '}')
                            .replace(/;\s+/g, ';')
                            .trim()
                        break
                }
            } else {
                // Beautify
                switch (language) {
                    case "json":
                        result = JSON.stringify(JSON.parse(input), null, 2)
                        break
                    case "css":
                        result = input
                            .replace(/{/g, ' {\n  ')
                            .replace(/;/g, ';\n  ')
                            .replace(/}/g, '\n}\n')
                            .replace(/\s+/g, ' ') // Normalize spaces first
                            .replace(/{ /g, '{\n  ')
                            .replace(/; /g, ';\n  ')
                            .replace(/ }/g, '\n}')
                        // A simple regex approach is limited, but sufficient for basic needs
                        // For better results, we'd need a parser
                        break
                    case "sql":
                        // Very basic SQL formatting
                        result = input
                            .replace(/\s+/g, ' ')
                            .replace(/SELECT/gi, '\nSELECT')
                            .replace(/FROM/gi, '\nFROM')
                            .replace(/WHERE/gi, '\nWHERE')
                            .replace(/AND/gi, '\n  AND')
                            .replace(/OR/gi, '\n  OR')
                            .replace(/ORDER BY/gi, '\nORDER BY')
                            .replace(/GROUP BY/gi, '\nGROUP BY')
                            .replace(/INSERT INTO/gi, '\nINSERT INTO')
                            .replace(/VALUES/gi, '\nVALUES')
                            .replace(/UPDATE/gi, '\nUPDATE')
                            .replace(/SET/gi, '\nSET')
                            .replace(/DELETE/gi, '\nDELETE')
                            .trim()
                        break
                    case "html":
                        // Basic HTML formatting (indentation)
                        let pad = 0;
                        result = input.replace(/>\s*</g, '><').replace(/</g, '\n<').split('\n').map(node => {
                            let indent = 0;
                            if (node.match(/.+<\/\w[^>]*>$/)) {
                                indent = 0;
                            } else if (node.match(/^<\/\w/)) {
                                if (pad !== 0) pad -= 1;
                            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                                indent = 1;
                            } else {
                                indent = 0;
                            }
                            const padding = new Array(pad * 2).fill(' ').join('');
                            pad += indent;
                            return padding + node;
                        }).join('\n').trim();
                        break
                    case "javascript":
                        // Very basic JS formatting
                        result = input
                            .replace(/{/g, ' {\n  ')
                            .replace(/;/g, ';\n')
                            .replace(/}/g, '\n}\n')
                        break
                }
            }
            setOutput(result)
        } catch (err) {
            setError("Erro ao processar código. Verifique se a sintaxe está correta.")
            console.error(err)
        }
    }

    const clearAll = () => {
        setInput("")
        setOutput("")
        setError(null)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-8 max-w-5xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                            <FileCode className="h-8 w-8" />
                            Minificador de Código
                        </h1>
                        <p className="text-muted-foreground">
                            Minifique ou formate código CSS, JSON, SQL e HTML
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <Card>
                            <CardHeader className="pb-4">
                                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="space-y-1">
                                            <Label>Linguagem</Label>
                                            <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                                                <SelectTrigger className="w-[150px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="css">CSS</SelectItem>
                                                    <SelectItem value="json">JSON</SelectItem>
                                                    <SelectItem value="html">HTML</SelectItem>
                                                    <SelectItem value="sql">SQL</SelectItem>
                                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1">
                                            <Label>Modo</Label>
                                            <Tabs value={mode} onValueChange={(v) => setMode(v as "minify" | "beautify")}>
                                                <TabsList>
                                                    <TabsTrigger value="minify">Minificar</TabsTrigger>
                                                    <TabsTrigger value="beautify">Beautify</TabsTrigger>
                                                </TabsList>
                                            </Tabs>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 w-full md:w-auto">
                                        <Button variant="outline" onClick={clearAll} className="flex-1 md:flex-none">
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Limpar
                                        </Button>
                                        <Button onClick={processCode} className="flex-1 md:flex-none">
                                            <ArrowRightLeft className="h-4 w-4 mr-2" />
                                            Processar
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Entrada</Label>
                                    <Textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="font-mono min-h-[400px] text-sm"
                                        placeholder={`Cole seu código ${language.toUpperCase()} aqui...`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center h-6">
                                        <Label>Saída</Label>
                                        {output && <CopyButton text={output} />}
                                    </div>
                                    <Textarea
                                        readOnly
                                        value={output}
                                        className="font-mono min-h-[400px] text-sm bg-muted"
                                        placeholder="O resultado aparecerá aqui..."
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {error && (
                            <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-center">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Minificador de Código</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Minificador de Código ajuda a reduzir o tamanho de arquivos CSS, JSON, SQL, HTML e JavaScript removendo espaços desnecessários, comentários e quebras de linha.
                                Também oferece a função de "Beautify" para tornar códigos minificados legíveis novamente.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> O processamento é feito inteiramente no seu navegador. Nenhum código é enviado para servidores externos.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}

