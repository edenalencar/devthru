"use client"

import Link from "next/link"
import { useState, useMemo, useEffect } from "react"
import { sendGTMEvent } from "@/lib/gtm"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"
import { 
  Calculator, 
  Copy, 
  Check, 
  ArrowRight, 
  Globe2, 
  DollarSign, 
  Receipt, 
  Code2, 
  HelpCircle, 
  Building2, 
  Percent, 
  ShieldCheck, 
  AlertTriangle,
  Sparkles,
  ArrowRightLeft
} from "lucide-react"
import { toast } from "sonner"

type CurrencyCode = "USD" | "EUR" | "GBP"
type OperationNature = "ecommerce_services" | "same_ownership" | "availability_other"

const IOF_RATES: Record<OperationNature, { label: string; rate: number; description: string }> = {
  ecommerce_services: { label: "Bens e Serviços no Exterior (E-commerce / SaaS)", rate: 4.38, description: "Alíquota para compras internacionais de bens ou software" },
  same_ownership: { label: "Transferência para Conta do Mesmo Titular", rate: 1.10, description: "Alíquota para envio entre contas do mesmo CPF/CNPJ no exterior" },
  availability_other: { label: "Disponibilidade no Exterior / Outros", rate: 0.38, description: "Alíquota padrão para disponibilidades e remessas diretas" },
}

const PYTHON_VET_CODE = `def calculate_vet_efx(foreign_amount: float, base_rate: float, spread_percent: float, iof_percent: float):
    """
    Calcula o Valor Efetivo Total (VET) e encargos para operações eFX (Regra Banco Central).
    """
    effective_exchange_rate = base_rate * (1 + (spread_percent / 100))
    subtotal_brl = foreign_amount * effective_exchange_rate
    iof_amount = round(subtotal_brl * (iof_percent / 100), 2)
    total_brl = round(subtotal_brl + iof_amount, 2)
    
    # VET = Total Pago em BRL / Valor na Moeda Estrangeira
    vet_per_unit = round(total_brl / foreign_amount, 4)
    
    return {
        "foreign_amount": foreign_amount,
        "base_rate": base_rate,
        "spread_percent": spread_percent,
        "iof_percent": iof_percent,
        "iof_amount_brl": iof_amount,
        "total_brl": total_brl,
        "vet_per_unit": vet_per_unit,
        "is_efx_compliant": foreign_amount <= 10000.00
    }`

const NODE_VET_CODE = `function calculateVetEfx(foreignAmount, baseRate = 5.60, spreadPercent = 2.0, iofPercent = 4.38) {
  const effectiveRate = baseRate * (1 + spreadPercent / 100);
  const subtotalBrl = foreignAmount * effectiveRate;
  const iofAmountBrl = Number((subtotalBrl * (iofPercent / 100)).toFixed(2));
  const totalBrl = Number((subtotalBrl + iofAmountBrl).toFixed(2));

  // VET = Total Pago em BRL / Valor em Moeda Estrangeira
  const vetPerUnit = Number((totalBrl / foreignAmount).toFixed(4));

  return {
    foreignAmount,
    baseRate,
    spreadPercent,
    iofPercent,
    iofAmountBrl,
    totalBrl,
    vetPerUnit,
    isEfxCompliant: foreignAmount <= 10000.00
  };
}`

export function VetEfxCalculatorPage() {
  const [foreignAmountStr, setForeignAmountStr] = useState<string>("100")
  const [currency, setCurrency] = useState<CurrencyCode>("USD")
  const [operationNature, setOperationNature] = useState<OperationNature>("ecommerce_services")
  const [baseRateStr, setBaseRateStr] = useState<string>("5.60")
  const [spreadPercentStr, setSpreadPercentStr] = useState<string>("2.0")
  const [copiedJson, setCopiedJson] = useState<boolean>(false)

  // Cálculos dinâmicos
  const calculations = useMemo(() => {
    const foreignAmount = Math.max(0, parseFloat(foreignAmountStr.replace(",", ".")) || 0)
    const baseRate = Math.max(0, parseFloat(baseRateStr.replace(",", ".")) || 0)
    const spreadPercent = Math.max(0, parseFloat(spreadPercentStr.replace(",", ".")) || 0)
    const iofPercent = IOF_RATES[operationNature].rate

    const rateWithSpread = baseRate * (1 + spreadPercent / 100)
    const spreadAmountBrl = foreignAmount * baseRate * (spreadPercent / 100)
    const subtotalBrl = foreignAmount * rateWithSpread
    const iofAmountBrl = (subtotalBrl * iofPercent) / 100
    const totalBrl = subtotalBrl + iofAmountBrl

    // VET = Total em BRL / Valor na Moeda Estrangeira
    const vetPerUnit = foreignAmount > 0 ? totalBrl / foreignAmount : 0
    const isEfxCompliant = foreignAmount <= 10000.00

    const mockApiResponse = {
      event: "fx_quote.calculated",
      timestamp: "2026-07-22T10:00:00.000Z",
      bacen_regulation: {
        normative: "Resolução BCB 148/277/561",
        efx_category: "Prestador de Serviços de Pagamento Internacional",
        simplified_efx_eligible: isEfxCompliant,
        limit_threshold_usd: 10000.00
      },
      quote: {
        currency_code: currency,
        foreign_amount: foreignAmount,
        base_rate_ptax: baseRate,
        spread_percentage: spreadPercent,
        effective_rate_with_spread: Number(rateWithSpread.toFixed(4)),
        iof_percentage: iofPercent,
        iof_amount_brl: Number(iofAmountBrl.toFixed(2)),
        spread_amount_brl: Number(spreadAmountBrl.toFixed(2)),
        total_payable_brl: Number(totalBrl.toFixed(2)),
        vet_per_unit_brl: Number(vetPerUnit.toFixed(4))
      }
    }

    return {
      foreignAmount,
      baseRate,
      spreadPercent,
      iofPercent,
      rateWithSpread,
      spreadAmountBrl,
      subtotalBrl,
      iofAmountBrl,
      totalBrl,
      vetPerUnit,
      isEfxCompliant,
      mockApiResponse
    }
  }, [foreignAmountStr, currency, operationNature, baseRateStr, spreadPercentStr])

  // GA4 / GTM Analytics Event
  useEffect(() => {
    if (calculations.foreignAmount > 0) {
      sendGTMEvent({
        event: "tool_interaction",
        tool_name: "vet-efx-calculator",
        tool_action: "calculate_vet",
        tool_category: "finance",
        foreign_amount: calculations.foreignAmount,
        currency,
        operation_nature: operationNature
      })
    }
  }, [calculations.foreignAmount, currency, operationNature])

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val)
  }

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(calculations.mockApiResponse, null, 2))
    setCopiedJson(true)
    toast.success("Payload JSON da cotação eFX copiado com sucesso!")
    sendGTMEvent({
      event: "tool_interaction",
      tool_name: "vet-efx-calculator",
      tool_action: "copy_json",
      tool_category: "finance"
    })
    setTimeout(() => setCopiedJson(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Breadcrumbs items={[{ label: "Finanças", href: "/tools/finance" }, { label: "Simulador VET & eFX Cambial" }]} />

      {/* Hero Header */}
      <div className="flex flex-col space-y-3 mb-8 text-center md:text-left border-b pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 text-xs font-semibold w-fit mx-auto md:mx-0">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Regulamentação Banco Central (BCB)</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Simulador & Calculadora de VET & eFX Cambial
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-3xl">
          Calcule em tempo real o <strong className="font-semibold text-foreground">VET (Valor Efetivo Total)</strong>, alíquotas de <strong className="font-semibold text-foreground">IOF</strong> e Spread para operações de pagamentos internacionais e eFX de acordo com as normas do Banco Central.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 mb-12">
        {/* Formulário de Parâmetros (Esquerda) */}
        <Card className="lg:col-span-6 shadow-md border-border/80">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Parâmetros da Operação Cambial</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Informe o valor da transação e os encargos para calcular o VET oficial exigido pelo BACEN.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Moeda e Valor */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2 sm:col-span-1">
                <Label className="text-xs font-semibold">Moeda</Label>
                <Select value={currency} onValueChange={(v) => setCurrency(v as CurrencyCode)}>
                  <SelectTrigger className="text-xs font-bold">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($ Dólar)</SelectItem>
                    <SelectItem value="EUR">EUR (€ Euro)</SelectItem>
                    <SelectItem value="GBP">GBP (£ Libra)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="foreignAmount" className="text-xs font-semibold">
                  Valor em {currency}
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-sm text-muted-foreground font-semibold">
                    {currency === "USD" ? "$" : currency === "EUR" ? "€" : "£"}
                  </span>
                  <Input
                    id="foreignAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={foreignAmountStr}
                    onChange={(e) => setForeignAmountStr(e.target.value)}
                    className="pl-8 text-base font-semibold"
                    placeholder="100.00"
                  />
                </div>
              </div>
            </div>

            {/* Natureza da Operação / IOF */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Natureza da Operação (Alíquota IOF)</Label>
              <Select value={operationNature} onValueChange={(v) => setOperationNature(v as OperationNature)}>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecommerce_services">
                    E-commerce / Serviços no Exterior (IOF {IOF_RATES.ecommerce_services.rate}%)
                  </SelectItem>
                  <SelectItem value="same_ownership">
                    Mesmo Titular no Exterior (IOF {IOF_RATES.same_ownership.rate}%)
                  </SelectItem>
                  <SelectItem value="availability_other">
                    Disponibilidade / Outros (IOF {IOF_RATES.availability_other.rate}%)
                  </SelectItem>
                </SelectContent>
              </Select>
              <span className="text-[11px] text-muted-foreground block">
                {IOF_RATES[operationNature].description}
              </span>
            </div>

            {/* Cotação Base & Spread */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
              <div className="space-y-1.5">
                <Label htmlFor="baseRate" className="text-xs font-semibold flex items-center gap-1">
                  <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Câmbio PTAX (R$)</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-xs text-muted-foreground font-bold">R$</span>
                  <Input
                    id="baseRate"
                    type="number"
                    step="0.01"
                    value={baseRateStr}
                    onChange={(e) => setBaseRateStr(e.target.value)}
                    className="pl-8 text-xs font-mono"
                    placeholder="5.60"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="spreadPercent" className="text-xs font-semibold flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-purple-600" />
                  <span>Spread / Margem (%)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="spreadPercent"
                    type="number"
                    step="0.1"
                    value={spreadPercentStr}
                    onChange={(e) => setSpreadPercentStr(e.target.value)}
                    className="pr-7 text-xs font-mono"
                    placeholder="2.0"
                  />
                  <span className="absolute right-2.5 top-2 text-xs text-muted-foreground font-bold">%</span>
                </div>
              </div>
            </div>

            {/* Alerta Regulatório de Limite eFX (US$ 10k) */}
            <div className={`p-3.5 rounded-lg text-xs flex items-start space-x-2.5 border ${
              calculations.isEfxCompliant 
                ? "bg-emerald-50/80 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200" 
                : "bg-amber-50/80 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-200"
            }`}>
              {calculations.isEfxCompliant ? (
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="leading-relaxed">
                <strong>{calculations.isEfxCompliant ? "Operação Elegível para eFX Simplificado:" : "Atenção (Acima do Limite eFX):"}</strong>{" "}
                {calculations.isEfxCompliant 
                  ? "Transação até US$ 10.000,00 enquadra-se na prestação simplificada eFX sem contrato formal de câmbio." 
                  : "Operações acima de US$ 10.000,00 exigem contrato de câmbio tradicional e registro formal no SISBACEN."}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados & VET (Direita) */}
        <Card className="lg:col-span-6 shadow-md border-border/80 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Resultado do VET Oficial</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 font-mono font-semibold">
                IOF: {calculations.iofPercent}%
              </span>
            </CardTitle>
            <CardDescription className="text-xs">
              Valor Efetivo Total calculado segundo a fórmula oficial do Banco Central.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            {/* Destaque do VET */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 text-center">
              <span className="text-xs text-blue-800 dark:text-blue-300 font-bold uppercase tracking-wider block">
                Valor Efetivo Total (VET)
              </span>
              <span className="text-3xl md:text-4xl font-black text-blue-900 dark:text-blue-100 font-mono mt-1 block">
                {formatBRL(calculations.vetPerUnit)} <span className="text-sm font-normal text-muted-foreground">/ {currency}</span>
              </span>
              <span className="text-[11px] text-muted-foreground mt-1 block">
                (Fórmula oficial BACEN: Total em R$ dividido pelo valor em {currency})
              </span>
            </div>

            {/* Resumo Financeiro */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-muted/50 border border-border/60">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
                  Total Final a Pagar (BRL)
                </span>
                <span className="text-lg font-bold text-foreground font-mono mt-0.5 block">
                  {formatBRL(calculations.totalBrl)}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-muted/50 border border-border/60">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
                  Imposto Retido (IOF)
                </span>
                <span className="text-lg font-bold text-rose-600 dark:text-rose-400 font-mono mt-0.5 block">
                  {formatBRL(calculations.iofAmountBrl)}
                </span>
              </div>
            </div>

            {/* Detalhamento dos Componentes do Câmbio */}
            <div className="space-y-2 pt-2 border-t text-xs">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Câmbio Comercial Base (PTAX):</span>
                <span className="font-mono font-medium text-foreground">{formatBRL(calculations.baseRate)}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Câmbio com Spread ({calculations.spreadPercent}%):</span>
                <span className="font-mono font-medium text-foreground">{formatBRL(calculations.rateWithSpread)}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Valor do Spread / Margem:</span>
                <span className="font-mono font-medium text-foreground">{formatBRL(calculations.spreadAmountBrl)}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Subtotal sem IOF:</span>
                <span className="font-mono font-medium text-foreground">{formatBRL(calculations.subtotalBrl)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção Dev Tools: Mock Webhook/API JSON */}
      <Card className="mb-12 shadow-md border-border/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Payload JSON de Resposta de API Cambial / eFX</span>
            </span>
            <Button size="sm" variant="outline" onClick={handleCopyJson} className="h-8 text-xs gap-1.5">
              {copiedJson ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedJson ? "Copiado!" : "Copiar JSON"}</span>
            </Button>
          </CardTitle>
          <CardDescription className="text-xs">
            Estrutura de dados simulada de resposta de cotação eFX para utilizar em mocks de checkout cross-border e testes de integração.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto border border-zinc-800 leading-relaxed max-h-80 overflow-y-auto">
            {JSON.stringify(calculations.mockApiResponse, null, 2)}
          </pre>
        </CardContent>
      </Card>

      {/* Accordion de Códigos de Exemplo */}
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-600" />
          <span>Exemplos de Implementação de Cálculo em Código</span>
        </h2>
        <Accordion type="single" collapsible className="w-full" defaultValue="code-examples">
          <CodeExamplesAccordion
            examples={[
              {
                language: "python",
                label: "Python",
                code: PYTHON_VET_CODE
              },
              {
                language: "javascript",
                label: "Node.js / JS",
                code: NODE_VET_CODE
              }
            ]}
          />
        </Accordion>
      </div>

      {/* FAQ & Artigos Relacionados */}
      <div className="mb-12 space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span>Perguntas Frequentes sobre VET e Regulamentação eFX</span>
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm font-semibold">
              O que é o VET (Valor Efetivo Total) exigido pelo Banco Central?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
              O <strong>Valor Efetivo Total (VET)</strong> representa o custo total em Reais de cada unidade de moeda estrangeira comprada ou vendida, englobando a taxa de câmbio comercial, as tarifas/spread da instituição e o IOF incidente. O Banco Central torna obrigatória a exibição clara do VET ao cliente antes da finalização de qualquer operação de câmbio ou eFX.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm font-semibold">
              O que é uma prestadora eFX e quem pode atuar?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
              As prestadoras <strong>eFX (Electronic Foreign Exchange)</strong> são instituições autorizadas pelo Banco Central a realizar serviços de pagamento internacional, como viabilização de compras em sites estrangeiros, transferências unilaterais e envio de remessas sem a necessidade de celebração de um contrato formal de câmbio tradicional para valores de até US$ 10.000,00.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm font-semibold">
              Qual a alíquota atual do IOF para e-commerce e serviços no exterior?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
              Para aquisição de bens e serviços no exterior via e-commerce/SaaS, a alíquota padrão do IOF é de <strong>4,38%</strong> (seguindo o cronograma de redução gradual do governo). Para transferências de disponibilidade no exterior entre contas do mesmo titular, a alíquota é de <strong>1,10%</strong>, e para demais remessas padrão é de <strong>0,38%</strong>.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="pt-4 border-t space-y-4">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
              Artigos e Guias Relacionados:
            </span>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog/normativa-efx-bacen-guia-desenvolvedor-pagamentos-internacionais"
                className="text-xs px-2.5 py-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium inline-flex items-center gap-1.5"
              >
                <span>📖 Artigo: Normativa eFX do Banco Central para Desenvolvedores</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
              Compartilhe esta ferramenta:
            </span>
            <ShareButtons title="Simulador de VET & eFX Cambial - DevThru" />
          </div>
        </div>
      </div>

      <RelatedTools currentToolSlug="vet-efx-calculator" category="finance" />
    </div>
  )
}
