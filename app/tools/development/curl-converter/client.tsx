"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/copy-button"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { ToolFaqSection } from "@/components/tools/tool-faq-section"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"
import { 
    parseCurl, 
    generateFetchCode, 
    generateAxiosCode, 
    generatePythonCode, 
    generateGoCode, 
    generatePhpCode 
} from "@/lib/utils/curl-parser"
import { sendGTMEvent } from "@/lib/gtm"
import { toast } from "sonner"
import { 
    Terminal, 
    Code2, 
    ArrowRight, 
    Sparkles, 
    Check, 
    Layers,
    Globe,
    Cpu
} from "lucide-react"
import Link from "next/link"

const SAMPLE_CURLS = [
    {
        label: "POST JSON com Auth",
        cmd: `curl -X POST https://api.exemplo.com/v1/usuarios \\
  -H "Authorization: Bearer seu_token_jwt_aqui" \\
  -H "Content-Type: application/json" \\
  -d '{"nome": "DevThru", "email": "contato@devthru.com", "ativo": true}'`
    },
    {
        label: "GET Simples com Query",
        cmd: `curl -X GET "https://api.exemplo.com/v1/produtos?categoria=eletronicos&limite=10" \\
  -H "Accept: application/json"`
    },
    {
        label: "PUT com Headers Customizados",
        cmd: `curl -X PUT https://api.exemplo.com/v1/configuracoes \\
  -H "X-Api-Key: minhavaliosaapikey123" \\
  -H "Content-Type: application/json" \\
  -d '{"tema": "dark", "notificacoes": true}'`
    }
]

type TargetLang = "fetch" | "axios" | "python" | "go" | "php"

const TARGET_LANGS: { id: TargetLang; label: string; badge: string }[] = [
    { id: "fetch", label: "JavaScript (Fetch)", badge: "Web / Node" },
    { id: "axios", label: "JavaScript (Axios)", badge: "TypeScript" },
    { id: "python", label: "Python (Requests)", badge: "Python 3" },
    { id: "go", label: "Go (net/http)", badge: "Golang" },
    { id: "php", label: "PHP (cURL)", badge: "PHP 8+" },
]

const CODE_EXAMPLES = [
    {
        language: "javascript",
        label: "Como testar Fetch no Node.js",
        code: `// Fetch nativo a partir do Node.js 18+
const res = await fetch("https://api.exemplo.com/v1/status");
const data = await res.json();
console.log(data);`
    },
    {
        language: "python",
        label: "Como testar Requests no Python",
        code: `import requests

res = requests.get("https://api.exemplo.com/v1/status")
print(res.status_code, res.json())`
    }
]

export function CurlConverterPage() {
    const [curlInput, setCurlInput] = useState(SAMPLE_CURLS[0].cmd)
    const [selectedLang, setSelectedLang] = useState<TargetLang>("fetch")

    const parsed = useMemo(() => {
        return parseCurl(curlInput)
    }, [curlInput])

    const generatedCode = useMemo(() => {
        switch (selectedLang) {
            case "fetch":
                return generateFetchCode(parsed)
            case "axios":
                return generateAxiosCode(parsed)
            case "python":
                return generatePythonCode(parsed)
            case "go":
                return generateGoCode(parsed)
            case "php":
                return generatePhpCode(parsed)
            default:
                return generateFetchCode(parsed)
        }
    }, [parsed, selectedLang])

    const handleInputChange = (val: string) => {
        setCurlInput(val)
        sendGTMEvent({
            event: "tool_interaction",
            tool_name: "curl-converter",
            tool_action: "input_curl",
            tool_category: "development"
        })
    }

    const handleLangSelect = (lang: TargetLang) => {
        setSelectedLang(lang)
        sendGTMEvent({
            event: "tool_interaction",
            tool_name: "curl-converter",
            tool_action: `select_${lang}`,
            tool_category: "development"
        })
    }

    const loadSample = (cmd: string) => {
        setCurlInput(cmd)
        toast.success("Comando cURL de exemplo carregado!")
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-8">
                <div className="container mx-auto px-4 max-w-5xl space-y-6">
                    <Breadcrumbs
                        items={[
                            { label: "Ferramentas" },
                            { label: "Dev Tools" },
                            { label: "Conversor de cURL" }
                        ]}
                    />

                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                <Terminal className="w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Conversor de cURL para Código</h1>
                                <p className="text-muted-foreground text-sm">
                                    Transforme comandos cURL copiados do DevTools ou Postman em código pronto para Fetch, Axios, Python, Go e PHP.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Editor de Entrada */}
                    <Card className="border-border/60 shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <CardTitle className="text-lg">Cole o comando cURL</CardTitle>
                                    <CardDescription>
                                        Suporta métodos HTTP, cabeçalhos (-H), payloads (-d) e autenticação (-u ou Bearer).
                                    </CardDescription>
                                </div>
                                <div className="flex flex-wrap gap-1.5 items-center">
                                    <span className="text-xs text-muted-foreground mr-1">Exemplos:</span>
                                    {SAMPLE_CURLS.map((s) => (
                                        <Button
                                            key={s.label}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => loadSample(s.cmd)}
                                            className="h-7 text-xs px-2.5"
                                        >
                                            {s.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Textarea
                                value={curlInput}
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder="curl -X POST https://api.exemplo.com/v1/recurso -H 'Content-Type: application/json' -d '{&quot;chave&quot;:&quot;valor&quot;}'"
                                rows={5}
                                className="font-mono text-xs sm:text-sm bg-muted/20"
                            />

                            {/* Detalhes da Requisição Detectada */}
                            <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-lg bg-muted/40 border text-xs">
                                <Badge variant="secondary" className="font-mono font-bold">
                                    {parsed.method}
                                </Badge>
                                <span className="font-mono text-muted-foreground truncate max-w-[280px] sm:max-w-md">
                                    {parsed.url}
                                </span>
                                <div className="ml-auto flex items-center gap-2 text-muted-foreground">
                                    <span>{Object.keys(parsed.headers).length} cabeçalhos</span>
                                    {parsed.body && <Badge variant="outline" className="text-[10px]">com Body</Badge>}
                                    {parsed.auth && <Badge variant="outline" className="text-[10px]">Auth</Badge>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Seletor de Linguagens & Resultado */}
                    <Card className="border-border/60 shadow-sm">
                        <CardHeader className="pb-3 border-b bg-muted/10">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex flex-wrap gap-1.5">
                                    {TARGET_LANGS.map((lang) => (
                                        <Button
                                            key={lang.id}
                                            variant={selectedLang === lang.id ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleLangSelect(lang.id)}
                                            className="h-8 text-xs font-medium"
                                        >
                                            <span>{lang.label}</span>
                                        </Button>
                                    ))}
                                </div>

                                <CopyButton text={generatedCode} />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="relative">
                                <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono bg-zinc-950 text-zinc-100 dark:bg-black rounded-b-lg max-h-[480px]">
                                    <code>{generatedCode}</code>
                                </pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Implementação em Código */}

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Conversor de cURL para Código</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <p>
                                    O Conversor de cURL transforma um comando cURL em código pronto para usar em JavaScript (Fetch e Axios), Python (Requests), Go (net/http) e PHP. Ele interpreta o método HTTP, a URL, os cabeçalhos (-H), o corpo da requisição (-d) e a autenticação, o que acelera a reprodução de chamadas copiadas do navegador ou da documentação de uma API.
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Nota:</strong> A conversão acontece no seu navegador e o comando não é enviado a nenhum servidor. Revise o código gerado e troque credenciais por variáveis de ambiente antes de usá-lo em produção.
                                </p>
                            </div>
                            <div className="pt-4 border-t space-y-4">
                                <div>
                                    <Label className="text-sm text-muted-foreground mb-2 block">Artigos e Ferramentas Relacionadas:</Label>
                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            href="/tools/development/jwt-debugger"
                                            className="text-xs px-2.5 py-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium inline-flex items-center gap-1.5"
                                        >
                                            <span>⚙️ Debugger e Inspetor de JWT</span>
                                            <ArrowRight className="w-3 h-3" />
                                        </Link>
                                        <Link
                                            href="/blog/como-formatar-e-validar-grandes-arquivos-json-sem-travamentos"
                                            className="text-xs px-2.5 py-1.5 bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium inline-flex items-center gap-1.5"
                                        >
                                            <span>📖 Como Formatar e Validar Grandes Payloads JSON</span>
                                            <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                    <ShareButtons title="Conversor de cURL para Código - DevThru" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <ToolFaqSection toolSlug="curl-converter">
                        <CodeExamplesAccordion examples={CODE_EXAMPLES} />
                    </ToolFaqSection>
                    <RelatedTools currentToolSlug="curl-converter" category="development" />
                </div>
            </main>
        </div>
    )
}
