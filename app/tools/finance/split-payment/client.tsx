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
  ShieldCheck, 
  Building2, 
  Receipt, 
  Code2, 
  PieChart, 
  HelpCircle, 
  Wallet,
  Landmark,
  Sparkles
} from "lucide-react"
import { toast } from "sonner"

type PaymentMethod = "pix" | "credit_card" | "debit_card" | "boleto"
type OperationType = "b2c" | "b2b"

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, { label: string; feeEst: string }> = {
  pix: { label: "Pix (Liquidação Instantânea)", feeEst: "Taxa média 0.99%" },
  credit_card: { label: "Cartão de Crédito", feeEst: "Taxa média 2.49%" },
  debit_card: { label: "Cartão de Débito", feeEst: "Taxa média 1.29%" },
  boleto: { label: "Boleto Bancário", feeEst: "Taxa fixa R$ 2,50" },
}

const PYTHON_SPLIT_CODE = `def calculate_split_payment(amount: float, ibs_rate: float = 17.7, cbs_rate: float = 8.8):
    """
    Calcula a retenção de IBS e CBS no Split Payment (Reforma Tributária).
    """
    ibs_amount = round(amount * (ibs_rate / 100), 2)
    cbs_amount = round(amount * (cbs_rate / 100), 2)
    total_tax = round(ibs_amount + cbs_amount, 2)
    net_seller_amount = round(amount - total_tax, 2)
    
    return {
        "gross_amount": amount,
        "ibs_tax": ibs_amount,
        "cbs_tax": cbs_amount,
        "total_tax_split": total_tax,
        "net_seller_amount": net_seller_amount
    }`

const NODE_SPLIT_CODE = `function calculateSplitPayment(grossAmount, ibsRate = 17.7, cbsRate = 8.8) {
  const ibsTax = Number((grossAmount * (ibsRate / 100)).toFixed(2));
  const cbsTax = Number((grossAmount * (cbsRate / 100)).toFixed(2));
  const totalTaxSplit = Number((ibsTax + cbsTax).toFixed(2));
  const netSellerAmount = Number((grossAmount - totalTaxSplit).toFixed(2));

  return {
    grossAmount,
    splitPayment: {
      ibsTax,
      cbsTax,
      totalTaxSplit,
    },
    netSellerAmount
  };
}`

export function SplitPaymentCalculatorPage() {
  const [grossAmountStr, setGrossAmountStr] = useState<string>("1000")
  const [ibsRateStr, setIbsRateStr] = useState<string>("17.7")
  const [cbsRateStr, setCbsRateStr] = useState<string>("8.8")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix")
  const [operationType, setOperationType] = useState<OperationType>("b2c")
  const [copiedJson, setCopiedJson] = useState<boolean>(false)

  // Cálculos dinâmicos
  const calculations = useMemo(() => {
    const amount = Math.max(0, parseFloat(grossAmountStr.replace(",", ".")) || 0)
    const ibsRate = Math.max(0, parseFloat(ibsRateStr.replace(",", ".")) || 0)
    const cbsRate = Math.max(0, parseFloat(cbsRateStr.replace(",", ".")) || 0)

    const ibsTax = (amount * ibsRate) / 100
    const cbsTax = (amount * cbsRate) / 100
    const totalTaxSplit = ibsTax + cbsTax
    const netSellerAmount = Math.max(0, amount - totalTaxSplit)
    
    const effectiveTaxRate = amount > 0 ? (totalTaxSplit / amount) * 100 : 0
    const netPercent = amount > 0 ? (netSellerAmount / amount) * 100 : 0
    const ibsPercent = amount > 0 ? (ibsTax / amount) * 100 : 0
    const cbsPercent = amount > 0 ? (cbsTax / amount) * 100 : 0

    const mockWebhookPayload = {
      event: "payment.settled_with_split",
      timestamp: "2026-07-21T18:00:00.000Z",
      transaction: {
        id: "tx_split_7x892a",
        payment_method: paymentMethod,
        operation_type: operationType,
        gross_amount: amount,
        currency: "BRL"
      },
      split_payment_retention: {
        split_active: true,
        reforma_tributaria_schema: "RTC_v1.0",
        ibs: {
          rate_percentage: ibsRate,
          retained_amount: Number(ibsTax.toFixed(2)),
          destination: "uf_municipio_cofres_publicos"
        },
        cbs: {
          rate_percentage: cbsRate,
          retained_amount: Number(cbsTax.toFixed(2)),
          destination: "uniao_receita_federal"
        },
        total_tax_retained: Number(totalTaxSplit.toFixed(2))
      },
      settlement_destination: {
        seller_net_payout: Number(netSellerAmount.toFixed(2)),
        status: "PAID_NET"
      }
    }

    return {
      amount,
      ibsRate,
      cbsRate,
      ibsTax,
      cbsTax,
      totalTaxSplit,
      netSellerAmount,
      effectiveTaxRate,
      netPercent,
      ibsPercent,
      cbsPercent,
      mockWebhookPayload
    }
  }, [grossAmountStr, ibsRateStr, cbsRateStr, paymentMethod, operationType])

  useEffect(() => {
    if (calculations.amount > 0) {
      sendGTMEvent({
        event: "tool_interaction",
        tool_name: "split-payment",
        tool_action: "calculate_split",
        tool_category: "finance",
        gross_amount: calculations.amount,
        payment_method: paymentMethod,
      })
    }
  }, [calculations.amount, paymentMethod, operationType])

  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val)
  }

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(calculations.mockWebhookPayload, null, 2))
    setCopiedJson(true)
    toast.success("Payload JSON do Split Payment copiado com sucesso!")
    sendGTMEvent({
      event: "tool_interaction",
      tool_name: "split-payment",
      tool_action: "copy_json",
      tool_category: "finance",
    })
    setTimeout(() => setCopiedJson(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Breadcrumbs
        items={[{ label: "Finanças", href: "/tools/finance" }, { label: "Simulador de Split Payment" }]}
        className="mb-6"
      />

      {/* Hero Header */}
      <div className="flex flex-col space-y-3 mt-4 mb-8 text-center md:text-left border-b pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Simulador & Calculadora de Split Payment
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-3xl">
          Calcule em tempo real a retenção automática de <strong className="font-semibold text-foreground">IBS</strong> (Estadual/Municipal) e <strong className="font-semibold text-foreground">CBS</strong> (Federal) no ato da liquidação financeira (Pix, Cartão, Boleto) e saiba o repasse líquido no caixa da sua empresa.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 mb-12">
        {/* Formulário de Parâmetros (Esquerda) */}
        <Card className="lg:col-span-6 shadow-md border-border/80">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Parâmetros da Transação</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Informe o valor da venda e as alíquotas estimadas para simular o Split Payment no pagamento.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Valor Bruto */}
            <div className="space-y-2">
              <Label htmlFor="grossAmount" className="text-xs font-semibold">
                Valor Bruto da Venda / Faturamento (R$)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm text-muted-foreground font-semibold">R$</span>
                <Input
                  id="grossAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={grossAmountStr}
                  onChange={(e) => setGrossAmountStr(e.target.value)}
                  className="pl-10 text-base font-semibold"
                  placeholder="1000,00"
                />
              </div>
            </div>

            {/* Meio de Pagamento & Operação */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Meio de Pagamento</Label>
                <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">Pix (Instantâneo)</SelectItem>
                    <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                    <SelectItem value="debit_card">Cartão de Débito</SelectItem>
                    <SelectItem value="boleto">Boleto Bancário</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold">Tipo de Operação</Label>
                <Select value={operationType} onValueChange={(v) => setOperationType(v as OperationType)}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="b2c">B2C (Consumidor Final)</SelectItem>
                    <SelectItem value="b2b">B2B (Entre Empresas)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Alíquotas de IBS e CBS */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
              <div className="space-y-1.5">
                <Label htmlFor="ibsRate" className="text-xs font-semibold flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>IBS (Estadual/Mun.)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="ibsRate"
                    type="number"
                    step="0.1"
                    value={ibsRateStr}
                    onChange={(e) => setIbsRateStr(e.target.value)}
                    className="pr-7 text-xs font-mono"
                  />
                  <span className="absolute right-2.5 top-2 text-xs text-muted-foreground font-bold">%</span>
                </div>
                <span className="text-[10px] text-muted-foreground">Estimativa ~17.7%</span>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cbsRate" className="text-xs font-semibold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>CBS (Federal)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="cbsRate"
                    type="number"
                    step="0.1"
                    value={cbsRateStr}
                    onChange={(e) => setCbsRateStr(e.target.value)}
                    className="pr-7 text-xs font-mono"
                  />
                  <span className="absolute right-2.5 top-2 text-xs text-muted-foreground font-bold">%</span>
                </div>
                <span className="text-[10px] text-muted-foreground">Estimativa ~8.8%</span>
              </div>
            </div>

            <div className="p-3 bg-muted/40 rounded-lg text-[11px] text-muted-foreground leading-relaxed flex items-start space-x-2 border border-border/40">
              <HelpCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>
                <strong>Como funciona no Split Payment:</strong> O banco/adquirente retém {calculations.effectiveTaxRate.toFixed(1)}% do total e transfere direto ao Fisco, depositando apenas a diferença na conta do vendedor.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Resultados & Distribuição Visual (Direita) */}
        <Card className="lg:col-span-6 shadow-md border-border/80 flex flex-col justify-between">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Resultado da Liquidação</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 font-mono font-semibold">
                Alíquota Efetiva: {calculations.effectiveTaxRate.toFixed(2)}%
              </span>
            </CardTitle>
            <CardDescription className="text-xs">
              Divisão automática dos valores entre a conta da sua empresa e os cofres públicos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            {/* Cards de Métricas */}
            <div className="grid grid-cols-2 gap-3">
              {/* Repasse Líquido */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800 flex flex-col justify-between">
                <span className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Caixa do Vendedor</span>
                </span>
                <span className="text-xl md:text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono mt-1">
                  {formatBRL(calculations.netSellerAmount)}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {calculations.netPercent.toFixed(1)}% do valor total
                </span>
              </div>

              {/* Imposto Total Retido */}
              <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 dark:bg-rose-950/30 dark:border-rose-800 flex flex-col justify-between">
                <span className="text-[11px] text-rose-800 dark:text-rose-300 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Receipt className="w-3.5 h-3.5" />
                  <span>Imposto Retido (Fisco)</span>
                </span>
                <span className="text-xl md:text-2xl font-extrabold text-rose-700 dark:text-rose-400 font-mono mt-1">
                  {formatBRL(calculations.totalTaxSplit)}
                </span>
                <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">
                  {calculations.effectiveTaxRate.toFixed(1)}% de retenção
                </span>
              </div>
            </div>

            {/* Detalhamento de IBS e CBS */}
            <div className="space-y-2.5 pt-2 border-t">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                  <Landmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>IBS Retido (Estadual / Municipal):</span>
                </span>
                <span className="font-mono font-bold text-foreground">{formatBRL(calculations.ibsTax)}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>CBS Retida (Federal):</span>
                </span>
                <span className="font-mono font-bold text-foreground">{formatBRL(calculations.cbsTax)}</span>
              </div>
            </div>

            {/* Barra Proporcional Gráfica */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[10px] font-semibold text-muted-foreground">
                <span>Distribuição da Transação</span>
                <span>100%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden flex shadow-inner">
                <div
                  className="bg-emerald-500 transition-all duration-300"
                  style={{ width: `${calculations.netPercent}%` }}
                  title={`Caixa Líquido: ${calculations.netPercent.toFixed(1)}%`}
                />
                <div
                  className="bg-blue-500 transition-all duration-300"
                  style={{ width: `${calculations.ibsPercent}%` }}
                  title={`IBS: ${calculations.ibsPercent.toFixed(1)}%`}
                />
                <div
                  className="bg-purple-500 transition-all duration-300"
                  style={{ width: `${calculations.cbsPercent}%` }}
                  title={`CBS: ${calculations.cbsPercent.toFixed(1)}%`}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Líquido ({calculations.netPercent.toFixed(0)}%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> IBS ({calculations.ibsPercent.toFixed(0)}%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> CBS ({calculations.cbsPercent.toFixed(0)}%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção Dev Tools: Mock Webhook JSON & Exemplos de Código */}
      <Card className="mb-12 shadow-md border-border/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Payload JSON de Exemplo para Testes (Dev Tools & Webhook)</span>
            </span>
            <Button size="sm" variant="outline" onClick={handleCopyJson} className="h-8 text-xs gap-1.5">
              {copiedJson ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedJson ? "Copiado!" : "Copiar JSON"}</span>
            </Button>
          </CardTitle>
          <CardDescription className="text-xs">
            Use esta estrutura de dados simulada para testar o parse de retornos financeiros e conciliações em ERPs, e-commerces e webhooks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto border border-zinc-800 leading-relaxed max-h-80 overflow-y-auto">
            {JSON.stringify(calculations.mockWebhookPayload, null, 2)}
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
                code: PYTHON_SPLIT_CODE
              },
              {
                language: "javascript",
                label: "Node.js / JS",
                code: NODE_SPLIT_CODE
              }
            ]}
          />
        </Accordion>
      </div>

      {/* FAQ & Artigos Relacionados */}
      <div className="mb-12 space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span>Perguntas Frequentes sobre Split Payment</span>
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-sm font-semibold">
              O que é o Split Payment na Reforma Tributária?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
              O Split Payment é o mecanismo em que o imposto (IBS + CBS) é separado e recolhido automaticamente pelos bancos, credenciadoras de cartão ou arranjos de pagamento no exato momento da liquidação financeira da transação.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-sm font-semibold">
              Qual a diferença entre IBS e CBS?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
              O <strong>IBS (Imposto sobre Bens e Serviços)</strong> substitui o ICMS estadual e o ISS municipal. Já a <strong>CBS (Contribuição sobre Bens e Serviços)</strong> substitui o PIS e a COFINS federais.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-sm font-semibold">
              Como o Split Payment afeta o desenvolvimento de ERPs e E-commerces?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
              Os sistemas precisarão ajustar os fluxos de conciliação bancária: a conta da empresa não receberá mais o valor bruto da venda para depois pagar a guia de imposto. O valor que entra na conta será o líquido, exigindo integração de webhooks e relatórios detalhados de retenção da adquirente.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-sm font-semibold">
              Como testar a retenção em ambiente de desenvolvimento (Staging)?
            </AccordionTrigger>
            <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
              Recomendamos utilizar o payload JSON simulado gerado nesta ferramenta para criar testes unitários e testes de integração de conciliação bancária na sua aplicação.
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
                href="/blog/split-payment-reforma-tributaria-guia-desenvolvedor"
                className="text-xs px-2.5 py-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium inline-flex items-center gap-1.5"
              >
                <span>📖 Artigo: Split Payment na Reforma Tributária para Devs</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
              Compartilhe esta ferramenta:
            </span>
            <ShareButtons title="Simulador de Split Payment (IBS/CBS) - DevThru" />
          </div>
        </div>
      </div>

      <RelatedTools currentToolSlug="split-payment" category="finance" />
    </div>
  )
}
