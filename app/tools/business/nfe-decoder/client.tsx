"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/copy-button"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"
import { decodeSefazKey, SefazKeyDecoded } from "@/lib/utils/validators/sefaz-key"
import { sendGTMEvent } from "@/lib/gtm"
import { toast } from "sonner"
import { 
    Barcode, 
    CheckCircle2, 
    XCircle, 
    FileText, 
    Building2, 
    Calendar, 
    Layers, 
    Hash, 
    ShieldCheck, 
    ArrowRight,
    Sparkles,
    Copy,
    Code2
} from "lucide-react"
import Link from "next/link"

const SAMPLE_KEYS = [
    { label: "NF-e (SP - Mod 55)", key: "35260812345678000195550010000001231000012345" },
    { label: "NFC-e (RJ - Mod 65)", key: "33260898765432000199650020000054329000056782" },
    { label: "CT-e (PR - Mod 57)", key: "41260811223344000155570010000009871000098764" },
    { label: "MDF-e (MG - Mod 58)", key: "31260855443322000188580010000004561000045677" }
]

const CODE_EXAMPLES = [
    {
        language: "javascript",
        label: "JavaScript / Node.js",
        code: `function decodeSefazKey(rawKey) {
  const clean = String(rawKey).replace(/\\D/g, "");
  if (clean.length < 43) return null;

  const cUf = clean.substring(0, 2);
  const aaMm = clean.substring(2, 6);
  const cnpj = clean.substring(6, 20);
  const mod = clean.substring(20, 22);
  const serie = clean.substring(22, 25);
  const nNf = clean.substring(25, 34);
  const tpEmis = clean.substring(34, 35);
  const cNf = clean.substring(35, 43);
  const providedDv = clean.length === 44 ? parseInt(clean.charAt(43)) : null;

  // Cálculo do Dígito Verificador (Módulo 11)
  let sum = 0;
  let weight = 2;
  for (let i = 42; i >= 0; i--) {
    sum += parseInt(clean.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  const remainder = sum % 11;
  const calculatedDv = (remainder === 0 || remainder === 1) ? 0 : 11 - remainder;

  return {
    cUf,
    anoMes: aaMm,
    cnpj,
    modelo: mod,
    serie: parseInt(serie, 10),
    numero: parseInt(nNf, 10),
    tpEmis,
    codigoNumerico: cNf,
    digitoVerificador: calculatedDv,
    valido: providedDv === calculatedDv
  };
}`
    },
    {
        language: "python",
        label: "Python",
        code: `import re

def decode_sefaz_key(raw_key: str) -> dict:
    clean = re.sub(r'\\D', '', raw_key)
    if len(clean) < 43:
        return {"error": "Chave deve conter pelo menos 43 dígitos"}

    # Cálculo do Dígito Verificador Módulo 11
    weight = 2
    total_sum = 0
    for digit in reversed(clean[:43]):
        total_sum += int(digit) * weight
        weight = 2 if weight == 9 else weight + 1

    remainder = total_sum % 11
    calculated_dv = 0 if remainder in (0, 1) else (11 - remainder)
    provided_dv = int(clean[43]) if len(clean) == 44 else None

    return {
        "uf_ibge": clean[0:2],
        "ano_mes": clean[2:6],
        "cnpj_emitente": clean[6:20],
        "modelo": clean[20:22],
        "serie": int(clean[22:25]),
        "numero": int(clean[25:34]),
        "tipo_emissao": clean[34:35],
        "codigo_numerico": clean[35:43],
        "dv_calculado": calculated_dv,
        "is_valid": provided_dv == calculated_dv if provided_dv is not None else False
    }`
    }
]

export function NfeDecoderPage() {
    const [inputKey, setInputKey] = useState("")
    const [decoded, setDecoded] = useState<SefazKeyDecoded | null>(null)

    const handleInputChange = (value: string) => {
        setInputKey(value)
        const result = decodeSefazKey(value)
        setDecoded(result)
        
        if (result && result.isValidLength) {
            sendGTMEvent({
                event: "tool_interaction",
                tool_name: "nfe-decoder",
                tool_action: "decode_key",
                tool_category: "business"
            })
        }
    }

    const clearInput = () => {
        setInputKey("")
        setDecoded(null)
    }

    const loadSample = (sample: string) => {
        handleInputChange(sample)
        toast.success("Chave de exemplo carregada!")
    }

    const copyJson = () => {
        if (!decoded) return
        navigator.clipboard.writeText(JSON.stringify(decoded, null, 2))
        toast.success("JSON estruturado copiado com sucesso!")
        sendGTMEvent({
            event: "tool_interaction",
            tool_name: "nfe-decoder",
            tool_action: "copy_json",
            tool_category: "business"
        })
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-8">
                <div className="container mx-auto px-4 max-w-5xl space-y-6">
                    <Breadcrumbs
                        items={[
                            { label: "Ferramentas", href: "/tools" },
                            { label: "Negócios", href: "/tools/business" },
                            { label: "Decodificador de Chave SEFAZ" }
                        ]}
                    />

                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                <Barcode className="w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Decodificador de Chave SEFAZ</h1>
                                <p className="text-muted-foreground text-sm">
                                    Desmembre e valide chaves de acesso de 44 dígitos de NF-e, NFC-e, CT-e e MDF-e com cálculo de Módulo 11.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Input Principal */}
                    <Card className="border-border/60 shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <span>Insira a Chave de Acesso (44 dígitos)</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Cole o código numérico com ou sem espaços e pontuação.
                                    </CardDescription>
                                </div>
                                <div className="flex flex-wrap gap-1.5 items-center">
                                    <span className="text-xs text-muted-foreground mr-1">Exemplos:</span>
                                    {SAMPLE_KEYS.map((s) => (
                                        <Button
                                            key={s.label}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => loadSample(s.key)}
                                            className="h-7 text-xs px-2.5"
                                        >
                                            {s.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="relative">
                                <Input
                                    value={inputKey}
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    placeholder="Ex: 35260812345678000195550010000001231000012345"
                                    className="font-mono text-base tracking-wider py-6 pr-32"
                                />
                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                                    {inputKey && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearInput}
                                            className="h-6 text-[11px] px-1.5 text-muted-foreground hover:text-foreground"
                                        >
                                            Limpar
                                        </Button>
                                    )}
                                    <Badge variant="secondary" className="font-mono text-xs">
                                        {inputKey.replace(/\D/g, '').length} / 44
                                    </Badge>
                                </div>
                            </div>

                            {/* Status de Validação */}
                            {decoded && (
                                <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-muted/50 border">
                                    <div className="flex items-center gap-2.5">
                                        {decoded.isValidDv ? (
                                            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1 py-1 px-3">
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span>Chave Válida (DV Correto)</span>
                                            </Badge>
                                        ) : decoded.isValidLength ? (
                                            <Badge variant="destructive" className="gap-1 py-1 px-3">
                                                <XCircle className="w-4 h-4" />
                                                <span>Dígito Verificador Inválido (Esperado: {decoded.calculatedDv}, Informado: {decoded.providedDv})</span>
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1 py-1 px-3">
                                                <Sparkles className="w-4 h-4" />
                                                <span>Preenchendo Chave ({decoded.rawKey.length} dígitos)...</span>
                                            </Badge>
                                        )}
                                        <span className="text-xs text-muted-foreground hidden sm:inline">
                                            {decoded.model.name} • {decoded.uf.state} • Série {decoded.series} • Nº {decoded.number.formatted}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={copyJson}
                                            className="h-8 text-xs gap-1.5"
                                        >
                                            <Code2 className="w-3.5 h-3.5" />
                                            <span>Copiar JSON</span>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Estado Vazio Quando Nenhuma Chave foi Inserida */}
                    {!decoded && (
                        <Card className="border-border/60 border-dashed bg-muted/10 p-8 text-center shadow-none">
                            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                                <Barcode className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-base mb-1">Nenhuma chave de acesso inserida</h3>
                            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                                Cole uma chave de 44 dígitos no campo acima ou clique em um dos exemplos rápidos para inspecionar os blocos e validar o dígito verificador.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {SAMPLE_KEYS.map((s) => (
                                    <Button
                                        key={s.label}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => loadSample(s.key)}
                                        className="text-xs gap-1.5 h-8"
                                    >
                                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                                        <span>Testar com {s.label}</span>
                                    </Button>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Resultado Desmembrado */}
                    {decoded && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Card 1: Informações do Documento */}
                            <Card className="border-border/60 shadow-sm">
                                <CardHeader className="pb-3 border-b bg-muted/20">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-primary" />
                                        <span>Identificação do Documento Fiscal</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 space-y-3.5">
                                    <div className="flex items-center justify-between border-b pb-2.5">
                                        <div className="space-y-0.5">
                                            <span className="text-xs text-muted-foreground block">Modelo do Documento</span>
                                            <span className="font-semibold text-sm flex items-center gap-2">
                                                <Badge variant="outline" className="font-mono bg-primary/5 text-primary border-primary/20">
                                                    Mod {decoded.model.code}
                                                </Badge>
                                                <span>{decoded.model.name}</span>
                                            </span>
                                            <span className="text-xs text-muted-foreground block">{decoded.model.description}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 border-b pb-2.5">
                                        <div>
                                            <span className="text-xs text-muted-foreground block">Série</span>
                                            <span className="font-mono font-medium text-sm">{decoded.series}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted-foreground block">Número da Nota</span>
                                            <span className="font-mono font-medium text-sm">{decoded.number.formatted}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 border-b pb-2.5">
                                        <div>
                                            <span className="text-xs text-muted-foreground block">Estado Emissor (UF)</span>
                                            <span className="font-medium text-sm flex items-center gap-1.5">
                                                <Badge variant="secondary" className="font-mono text-xs">{decoded.uf.code}</Badge>
                                                <span>{decoded.uf.name} ({decoded.uf.state})</span>
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted-foreground block">Mês / Ano de Emissão</span>
                                            <span className="font-medium text-sm flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                                                <span>{decoded.yearMonth.formatted}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-0.5">
                                        <span className="text-xs text-muted-foreground block">Tipo de Emissão</span>
                                        <span className="font-medium text-sm flex items-center gap-1.5">
                                            <Badge variant="outline" className="font-mono text-xs">Tipo {decoded.emissionType.code}</Badge>
                                            <span>{decoded.emissionType.name}</span>
                                        </span>
                                        <span className="text-xs text-muted-foreground block">{decoded.emissionType.description}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Card 2: Emitente e Segurança */}
                            <Card className="border-border/60 shadow-sm">
                                <CardHeader className="pb-3 border-b bg-muted/20">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-primary" />
                                        <span>Dados do Emitente & Validação</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 space-y-3.5">
                                    <div className="flex items-center justify-between border-b pb-2.5">
                                        <div className="space-y-0.5">
                                            <span className="text-xs text-muted-foreground block">CNPJ do Emitente</span>
                                            <span className="font-mono font-semibold text-base">{decoded.cnpj.formatted}</span>
                                        </div>
                                        <CopyButton text={decoded.cnpj.raw} />
                                    </div>

                                    <div className="flex items-center justify-between border-b pb-2.5">
                                        <div className="space-y-0.5">
                                            <span className="text-xs text-muted-foreground block">Código Numérico Aleatório (cNF)</span>
                                            <span className="font-mono font-medium text-sm text-muted-foreground">{decoded.numericCode}</span>
                                        </div>
                                        <CopyButton text={decoded.numericCode} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 border-b pb-2.5">
                                        <div>
                                            <span className="text-xs text-muted-foreground block">Dígito Informado</span>
                                            <span className={`font-mono font-bold text-base ${decoded.isValidDv ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                                                {decoded.providedDv !== -1 ? decoded.providedDv : '-'}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted-foreground block">Dígito Calculado (Módulo 11)</span>
                                            <span className="font-mono font-bold text-base text-primary">
                                                {decoded.calculatedDv}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-1">
                                        <div className="space-y-0.5">
                                            <span className="text-xs text-muted-foreground block">Chave Formatada em Blocos</span>
                                            <span className="font-mono text-xs text-muted-foreground break-all">{decoded.formattedKey}</span>
                                        </div>
                                        <CopyButton text={decoded.rawKey} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Implementação em Código */}
                    <Accordion type="single" collapsible className="w-full">
                        <CodeExamplesAccordion examples={CODE_EXAMPLES} />
                    </Accordion>

                    {/* FAQ */}
                    <Card className="border-border/60">
                        <CardHeader>
                            <CardTitle className="text-xl">Perguntas Frequentes sobre Chaves de Acesso SEFAZ</CardTitle>
                            <CardDescription>
                                Tire suas dúvidas sobre a composição e validação de chaves de documentos fiscais.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="faq-1">
                                    <AccordionTrigger>Como é formada a chave de acesso de 44 dígitos da SEFAZ?</AccordionTrigger>
                                    <AccordionContent className="space-y-2 text-muted-foreground text-sm">
                                        <p>A chave é uma concatenação rigorosa de 8 blocos de informação:</p>
                                        <ol className="list-decimal pl-5 space-y-1">
                                            <li><strong className="text-foreground">cUF (2 dígitos):</strong> Código IBGE do estado emissor (ex: 35 para SP).</li>
                                            <li><strong className="text-foreground">AAMM (4 dígitos):</strong> Ano e mês da emissão da nota fiscal.</li>
                                            <li><strong className="text-foreground">CNPJ (14 dígitos):</strong> Cadastro Nacional da Pessoa Jurídica da empresa emissora.</li>
                                            <li><strong className="text-foreground">Modelo (2 dígitos):</strong> 55 para NF-e, 65 para NFC-e, 57 para CT-e e 58 para MDF-e.</li>
                                            <li><strong className="text-foreground">Série (3 dígitos):</strong> Série do documento fiscal (001 a 999).</li>
                                            <li><strong className="text-foreground">Número da Nota (9 dígitos):</strong> Sequencial da nota no emissor.</li>
                                            <li><strong className="text-foreground">Tipo de Emissão (1 dígito):</strong> Normal (1) ou modalidades de contingência (2 a 9).</li>
                                            <li><strong className="text-foreground">Código Numérico (8 dígitos):</strong> Código aleatório para dificultar a adivinhação de chaves.</li>
                                            <li><strong className="text-foreground">Dígito Verificador (1 dígito):</strong> Checksum calculado com o algoritmo Módulo 11.</li>
                                        </ol>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="faq-2">
                                    <AccordionTrigger>Como funciona o cálculo do Dígito Verificador (Módulo 11)?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm">
                                        Multiplica-se cada um dos 43 primeiros dígitos da direita para a esquerda por uma sequência de pesos de 2 a 9 (reiniciando em 2 ao atingir 9). Soma-se todos os produtos e divide-se por 11. Se o resto da divisão for 0 ou 1, o dígito verificador é 0. Nos demais casos, o DV é 11 menos o resto.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="faq-3">
                                    <AccordionTrigger>Esta ferramenta consulta dados diretamente no servidor da SEFAZ?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm">
                                        Não. Este decodificador faz a análise estática e sintática da string de 44 dígitos diretamente no seu navegador, sem expor chaves ou dados de sua empresa para servidores externos.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>

                    {/* Rodapé e Links Relacionados */}
                    <div className="pt-4 border-t space-y-4">
                        <div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                                Artigos e Guias Fiscais Relacionados:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href="/blog/como-testar-fluxos-nfe-cte-mdfe-homologacao"
                                    className="text-xs px-2.5 py-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium inline-flex items-center gap-1.5"
                                >
                                    <span>📖 Como Testar Emissão de NF-e, CT-e e MDF-e em Homologação SEFAZ</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                                <Link
                                    href="/blog/split-payment-reforma-tributaria-guia-desenvolvedor"
                                    className="text-xs px-2.5 py-1.5 bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium inline-flex items-center gap-1.5"
                                >
                                    <span>📖 Split Payment na Reforma Tributária para Devs</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                                Compartilhe esta ferramenta:
                            </span>
                            <ShareButtons title="Decodificador de Chave de Acesso SEFAZ - DevThru" />
                        </div>
                    </div>

                    <RelatedTools currentToolSlug="nfe-decoder" category="business" />
                </div>
            </main>
        </div>
    )
}
