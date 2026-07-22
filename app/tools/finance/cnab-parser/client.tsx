"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { FileText, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Copy, Check, Upload, RefreshCw, Landmark, HelpCircle, Code2 } from "lucide-react"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Link from "next/link"
import { sendGTMEvent } from "@/lib/gtm"

// Bancos FEBRABAN Conhecidos
const BANCOS: Record<string, string> = {
  "001": "Banco do Brasil",
  "033": "Santander",
  "104": "Caixa Econômica Federal",
  "237": "Bradesco",
  "341": "Itaú Unibanco",
  "748": "Sicredi",
  "756": "Sicoob",
  "041": "Banrisul",
  "070": "BRB",
  "422": "Safra"
}

// Ocorrências CNAB Frequentes
const OCORRENCIAS: Record<string, { label: string; status: "success" | "warning" | "danger" | "info" }> = {
  "02": { label: "Entrada Confirmada", status: "info" },
  "03": { label: "Entrada Rejeitada", status: "danger" },
  "06": { label: "Liquidação (Título Pago)", status: "success" },
  "09": { label: "Baixa Automatizada", status: "warning" },
  "10": { label: "Baixado Conforme Instrução", status: "warning" },
  "14": { label: "Vencimento Alterado", status: "info" },
  "19": { label: "Confirmação de Recebimento de Instrução de Protesto", status: "warning" }
}

// Geradores de Exemplos Práticos Garantidos (padEnd previne cortes de whitespace por IDE formatters)
const getSampleCnab240 = (): string => {
  const lines = [
    "001000003000000002130700000100000000000123456789000199EMPRESA EXEMPLO TECNOLOGIA LTDA BANCO DO BRASIL S.A.             12207261855000000108400000".padEnd(240, " "),
    "001000110010000021307000001000000000000123456789000199EMPRESA EXEMPLO TECNOLOGIA LTDA                                       0000000122072600000001".padEnd(240, " "),
    "0010001300001P 000012345670100000000001234567891217 00000000000012345678000000000000150500000000000000000000000000000220726000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000".padEnd(240, " "),
    "0010001300002Q 00011111111111111JOAO DA SILVA                             AV PAULISTA 1000                             BELA VISTA      01310100SAO PAULO       SP0000000000000000".padEnd(240, " "),
    "0010001500000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000".padEnd(240, " "),
    "00199999900000100000500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000".padEnd(240, " ")
  ]
  return lines.join("\n")
}

const getSampleCnab400 = (): string => {
  const line1 = ("02RETORNO01COBRANCA       00000000000000123456EMPRESA EXEMPLO LTDA       341BANCO ITAU S.A.220726" + "0".repeat(15) + "000001").padEnd(394, " ") + "000001"
  const line2 = ("10201234567890000000000123456789  0000012345678        00000000000000000000000000000010622072600000012345678341" + "0".repeat(50) + "0000000123456").padEnd(394, " ") + "000002"
  const line3 = ("9201341").padEnd(394, " ") + "000003"

  return [line1, line2, line3].join("\n")
}

const CODE_JS = `// Exemplo em TypeScript para extrair o Tipo de Registro e Banco de um CNAB
export function parseCnabHeader(linha: string) {
  const isCnab240 = linha.length === 240;
  const isCnab400 = linha.length === 400;

  if (!isCnab240 && !isCnab400) {
    throw new Error("Comprimento de linha inválido para padrão CNAB.");
  }

  if (isCnab240) {
    return {
      padrao: "CNAB 240",
      banco: linha.slice(0, 3),
      lote: linha.slice(3, 7),
      tipoRegistro: linha.slice(7, 8),
      nomeEmpresa: linha.slice(72, 102).trim()
    };
  } else {
    return {
      padrao: "CNAB 400",
      banco: linha.slice(76, 79),
      tipoArquivo: linha.slice(2, 9), // REMESSA ou RETORNO
      nomeEmpresa: linha.slice(46, 76).trim()
    };
  }
}`

const CODE_PYTHON = `# Exemplo em Python para fatiar registros posicionais do CNAB 400
def extrair_detalhe_cnab400(linha: str) -> dict:
    if len(linha) != 400:
        raise ValueError("Linha deve possuir exatamente 400 caracteres")
        
    return {
        "tipo_registro": linha[0:1],
        "nosso_numero": linha[62:70].strip(),
        "carteira": linha[107:108],
        "ocorrencia": linha[108:110],
        "data_ocorrencia": f"{linha[110:112]}/{linha[112:114]}/20{linha[114:116]}",
        "valor_pago_reais": int(linha[253:266] or 0) / 100.0
    }`

export function CnabParserPage() {
  const [content, setContent] = useState("")
  const [copied, setCopied] = useState(false)

  // Handlers
  const handleParse = (text: string) => {
    setContent(text)
    sendGTMEvent({
      event: "tool_interaction",
      tool_name: "cnab-parser",
      tool_action: "generate_result",
      tool_category: "finance"
    })
  }

  const handleCopy = () => {
    if (!content) return
    navigator.clipboard.writeText(content)
    setCopied(true)
    sendGTMEvent({
      event: "tool_interaction",
      tool_name: "cnab-parser",
      tool_action: "copy_result",
      tool_category: "finance"
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      if (text) handleParse(text)
    }
    reader.readAsText(file, "latin1")
  }

  // Parse Logic
  const lines = content.split(/\r?\n/).filter(l => l.length > 0)
  const firstLine = lines[0] || ""
  
  let detectedType = "Desconhecido"
  if (firstLine.length === 240) detectedType = "CNAB 240 (240 colunas)"
  else if (firstLine.length === 400) detectedType = "CNAB 400 (400 colunas)"

  // Detect Banco
  let bankCode = ""
  if (firstLine.length === 240) bankCode = firstLine.slice(0, 3)
  else if (firstLine.length === 400) bankCode = firstLine.slice(76, 79)
  
  const bankName = BANCOS[bankCode] || (bankCode ? `Banco Código ${bankCode}` : "Não identificado")

  // Check invalid line lengths
  const invalidLines = lines.filter(l => l.length !== 240 && l.length !== 400)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl space-y-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Finanças", href: "/tools/finance" },
            { label: "Leitor e Decodificador de CNAB" }
          ]}
        />

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Leitor e Decodificador de CNAB Online
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Decodifique, inspecione e valide arquivos de <strong>Remessa (.rem)</strong> e <strong>Retorno (.ret)</strong> bancários em segundos. Identifique posições de colunas, ocorrências de erro e falhas de alinhamento.
          </p>
        </div>

        {/* Main Workspace Card */}
        <Card className="border-border shadow-sm">
          <CardHeader className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-500" />
                  Cole o Arquivo CNAB ou Escolha um Exemplo
                </CardTitle>
                <CardDescription>
                  Suporta arquivos de remessa e retorno dos principais bancos brasileiros.
                </CardDescription>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleParse(getSampleCnab240())}
                  className="text-xs gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Exemplo CNAB 240
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleParse(getSampleCnab400())}
                  className="text-xs gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Exemplo CNAB 400
                </Button>

                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Subir Arquivo</span>
                  <input
                    type="file"
                    accept=".rem,.ret,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="cnab-text" className="text-xs font-medium text-muted-foreground">
                  Conteúdo do Arquivo Posicional:
                </Label>
                {content && (
                  <span className="text-xs text-muted-foreground">
                    {lines.length} {lines.length === 1 ? 'linha' : 'linhas'} detectadas
                  </span>
                )}
              </div>
              <textarea
                id="cnab-text"
                rows={7}
                value={content}
                onChange={(e) => handleParse(e.target.value)}
                placeholder="Cole aqui o conteúdo de um arquivo de Remessa ou Retorno CNAB (240 ou 400 caracteres por linha)..."
                className="w-full rounded-lg border border-input bg-muted/30 p-3 font-mono text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* General File Diagnostics Summary */}
            {content && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-border bg-card space-y-1">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block">Padrão Detectado</span>
                  <div className="text-sm font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>{detectedType}</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border bg-card space-y-1">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block">Banco Emissor</span>
                  <div className="text-sm font-bold flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-blue-500" />
                    <span>{bankName}</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border bg-card space-y-1">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block">Validação de Tamanho</span>
                  <div className="text-sm font-bold flex items-center gap-2">
                    {invalidLines.length === 0 ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">100% Válido ({lines[0]?.length || 0} cols)</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span className="text-amber-600 dark:text-amber-400">{invalidLines.length} linha(s) fora do padrão</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Line-by-Line Detailed Inspector */}
            {content && lines.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    Inspeção Estrutural por Linha
                  </h3>
                  <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs gap-1.5">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copiado!" : "Copiar Texto"}</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  {lines.map((line, idx) => {
                    const is240 = line.length === 240
                    const is400 = line.length === 400
                    const isInvalid = !is240 && !is400

                    let regTypeLabel = "Registro Generico"
                    let badgeColor = "bg-muted text-muted-foreground"

                    if (is240) {
                      const regType = line.slice(7, 8)
                      if (regType === '0') { regTypeLabel = "Header de Arquivo (Tipo 0)"; badgeColor = "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"; }
                      else if (regType === '1') { regTypeLabel = "Header de Lote (Tipo 1)"; badgeColor = "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"; }
                      else if (regType === '3') {
                        const seg = line.slice(13, 14)
                        regTypeLabel = `Detalhe - Segmento ${seg} (Tipo 3)`
                        badgeColor = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      }
                      else if (regType === '5') { regTypeLabel = "Trailer de Lote (Tipo 5)"; badgeColor = "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"; }
                      else if (regType === '9') { regTypeLabel = "Trailer de Arquivo (Tipo 9)"; badgeColor = "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300"; }
                    } else if (is400) {
                      const regType = line.slice(0, 1)
                      if (regType === '0') { regTypeLabel = "Header do Arquivo (Tipo 0)"; badgeColor = "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"; }
                      else if (regType === '1') {
                        const ocorrencia = line.slice(108, 110)
                        const ocInfo = OCORRENCIAS[ocorrencia]?.label ? ` [Ocorrência ${ocorrencia}: ${OCORRENCIAS[ocorrencia].label}]` : ""
                        regTypeLabel = `Detalhe Titulo/Cobranca (Tipo 1)${ocInfo}`
                        badgeColor = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      }
                      else if (regType === '9') { regTypeLabel = "Trailer do Arquivo (Tipo 9)"; badgeColor = "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300"; }
                    }

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-lg border text-xs space-y-2 ${
                          isInvalid
                            ? "border-destructive/50 bg-destructive/5"
                            : "border-border bg-muted/20"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-muted-foreground">Linha #{idx + 1}</span>
                            <span className={`px-2 py-0.5 rounded font-medium ${badgeColor}`}>
                              {regTypeLabel}
                            </span>
                          </div>
                          <span className={`font-mono text-[11px] ${isInvalid ? "text-destructive font-bold" : "text-muted-foreground"}`}>
                            {line.length} colunas {isInvalid && `(esperado 240 ou 400)`}
                          </span>
                        </div>

                        <div className="font-mono bg-background p-2.5 rounded border border-border overflow-x-auto whitespace-pre text-[11px] leading-relaxed text-foreground select-all">
                          {line}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Code Examples Section */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-500" />
              Exemplos de Código para Desenvolvedores
            </CardTitle>
            <CardDescription>
              Aprenda a fatiar e parsear arquivos CNAB posicionais em Node.js e Python.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <CodeExamplesAccordion
                examples={[
                  { language: "javascript", label: "TypeScript / Node.js", code: CODE_JS },
                  { language: "python", label: "Python", code: CODE_PYTHON }
                ]}
              />
            </Accordion>
          </CardContent>
        </Card>

        {/* FAQ & Social Sharing Section */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-500" />
              Perguntas Frequentes (FAQ)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="faq-1">
                <AccordionTrigger className="text-sm font-medium">
                  Como identificar se um arquivo é CNAB 240 ou CNAB 400?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  A forma mais direta é medindo a quantidade de caracteres de cada linha. No <strong>CNAB 240</strong>, todas as linhas possuem exatamente 240 caracteres. No <strong>CNAB 400</strong>, cada linha possui exatamente 400 caracteres.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2">
                <AccordionTrigger className="text-sm font-medium">
                  O que significa o código de ocorrência nos arquivos de retorno?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  O código de ocorrência indica qual ação foi efetuada pelo banco sobre o título. Por exemplo: o código <strong>06</strong> indica que o boleto foi pago (liquidado), o código <strong>02</strong> indica entrada confirmada e o código <strong>03</strong> sinaliza que a remessa foi rejeitada devido a algum erro cadastral.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3">
                <AccordionTrigger className="text-sm font-medium">
                  Meus dados bancários são salvos nos servidores do DevThru?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Não.</strong> Todo o processo de leitura e decodificação do arquivo CNAB é executado exclusivamente no seu navegador via JavaScript client-side. Nenhum dado do seu arquivo é enviado para servidores externos.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Related Articles & Shared Footer Component */}
            <div className="pt-4 border-t space-y-4">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                  Artigos e Guias Relacionados no Blog:
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/blog/cnab-240-vs-cnab-400-diferencas-e-estrutura-posicional"
                    className="text-xs px-2.5 py-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium inline-flex items-center gap-1.5"
                  >
                    <span>📖 Guia: CNAB 240 vs CNAB 400</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <Link
                    href="/blog/como-parsear-e-validar-arquivos-cnab-remessa-e-retorno-nodejs-python"
                    className="text-xs px-2.5 py-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium inline-flex items-center gap-1.5"
                  >
                    <span>📖 Tutorial: Parsear CNAB em Node.js e Python</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <Link
                    href="/blog/como-gerar-massa-de-dados-cnab-para-testes-em-staging"
                    className="text-xs px-2.5 py-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium inline-flex items-center gap-1.5"
                  >
                    <span>📖 QA: Massa de Dados CNAB para Staging</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                  Compartilhe esta ferramenta:
                </span>
                <ShareButtons title="Leitor e Decodificador de CNAB (CNAB 240 / 400) - DevThru" />
              </div>
            </div>

            <RelatedTools currentToolSlug="cnab-parser" category="finance" />
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
