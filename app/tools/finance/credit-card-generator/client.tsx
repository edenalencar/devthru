"use client"

import Link from "next/link"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CreditCard, RefreshCw, Copy } from "lucide-react"
import { generateCreditCard, generateExpiryDate, generateCVV, CARD_BRANDS, CardBrand } from "@/lib/utils/generators/credit-card"
import { toast } from "sonner"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const LUHN_JS_CODE = `function validateLuhn(cardNumber) {
  const cleaned = cardNumber.replace(/\\D/g, "");
  let sum = 0;
  let shouldDouble = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}`;

const LUHN_PYTHON_CODE = `import re

def validate_luhn(card_number: str) -> bool:
    cleaned = re.sub(r'\\D', '', card_number)
    total_sum = 0
    should_double = False

    for digit_char in reversed(cleaned):
        digit = int(digit_char)
        if should_double:
            digit *= 2
            if digit > 9:
                digit -= 9
        total_sum += digit
        should_double = not should_double

    return total_sum % 10 == 0`;

const LUHN_CSHARP_CODE = `using System;
using System.Text.RegularExpressions;

public static class LuhnValidator
{
    public static bool Validate(string cardNumber)
    {
        string cleaned = Regex.Replace(cardNumber ?? "", @"[^\\d]", "");
        int sum = 0;
        bool shouldDouble = false;

        for (int i = cleaned.Length - 1; i >= 0; i--)
        {
            int digit = cleaned[i] - '0';

            if (shouldDouble)
            {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 == 0;
    }
}`;

const LUHN_JAVA_CODE = `public class LuhnValidator {
    public static boolean validate(String cardNumber) {
        if (cardNumber == null) return false;
        String cleaned = cardNumber.replaceAll("[^\\\\d]", "");
        int sum = 0;
        boolean shouldDouble = false;

        for (int i = cleaned.length() - 1; i >= 0; i--) {
            int digit = Character.getNumericValue(cleaned.charAt(i));

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 == 0;
    }
}`;

export function CreditCardGeneratorPage() {
    const [brand, setBrand] = useState<CardBrand>('visa')
    const [cardData, setCardData] = useState<{ number: string, expiry: string, cvv: string } | null>(null)

    const handleGenerate = () => {
        const number = generateCreditCard(brand)
        const expiry = generateExpiryDate()
        const cvv = generateCVV(brand)
        setCardData({ number, expiry, cvv })
    }

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        toast.success(`${label} copiado!`)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Dados Financeiros" }, { "label": "Cartão de Crédito" }]} className="mb-6" />
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de Cartão de Crédito</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere números de cartão de crédito válidos para testes (algoritmo de Luhn).
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Controls */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuração</CardTitle>
                                <CardDescription>
                                    Escolha a bandeira do cartão
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="brand">Bandeira</Label>
                                    <Select value={brand} onValueChange={(v) => setBrand(v as CardBrand)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CARD_BRANDS.map(b => (
                                                <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button onClick={handleGenerate} className="w-full" size="lg">
                                    <RefreshCw className="mr-2 h-4 w-4" /> Gerar Cartão
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Result */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Cartão Gerado</CardTitle>
                                <CardDescription>
                                    Dados fictícios válidos para teste
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {cardData ? (
                                    <div className="space-y-6">
                                        <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-xl aspect-[1.586/1] flex flex-col justify-between max-w-sm mx-auto">
                                            <div className="flex justify-between items-start">
                                                <div className="text-xs opacity-75">Bank Name</div>
                                                <div className="font-bold uppercase tracking-wider">{CARD_BRANDS.find(b => b.id === brand)?.name}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-12 h-8 bg-yellow-500/20 rounded flex items-center justify-center border border-yellow-500/30">
                                                    <div className="w-8 h-5 border border-yellow-500/50 rounded-sm"></div>
                                                </div>
                                                <div className="text-2xl font-mono tracking-widest drop-shadow-md">
                                                    {cardData.number.match(/.{1,4}/g)?.join(' ')}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <div className="text-[10px] opacity-75 uppercase">Card Holder</div>
                                                    <div className="font-medium tracking-wide">JOHN DOE</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] opacity-75 uppercase">Expires</div>
                                                    <div className="font-mono">{cardData.expiry}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                                                <div className="flex-1">
                                                    <Label className="text-xs text-muted-foreground">Número</Label>
                                                    <div className="font-mono font-medium">{cardData.number}</div>
                                                </div>
                                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(cardData.number, "Número")}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                                                    <div className="flex-1">
                                                        <Label className="text-xs text-muted-foreground">Validade</Label>
                                                        <div className="font-mono font-medium">{cardData.expiry}</div>
                                                    </div>
                                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(cardData.expiry, "Validade")}>
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                                                    <div className="flex-1">
                                                        <Label className="text-xs text-muted-foreground">CVV</Label>
                                                        <div className="font-mono font-medium">{cardData.cvv}</div>
                                                    </div>
                                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(cardData.cvv, "CVV")}>
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 text-muted-foreground">
                                        <CreditCard className="h-16 w-16 mb-4 opacity-20" />
                                        <p>Clique em gerar para ver o cartão</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                                {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Cartão de Crédito e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    Entender como o <strong>número de cartão de crédito é uma ferramenta</strong> fundamental nos testes de checkout ajuda a prevenir falhas em produção. Nossa <strong>ferramenta gera</strong> dados fictícios completos para homologação, simulando bandeiras populares de mercado para testar seus sistemas em <strong>diferentes cenários</strong>.
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Importante:</strong> Nenhum dos <strong>números são gerados</strong> para realizar <strong>transações reais</strong>. A proposta de <strong>usar um gerador</strong> é apenas facilitar a simulação de pagamentos simulados no seu gateway de teste local ou sandbox (como Stripe, Adyen, Mercado Pago).
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Para que serve esta ferramenta de geração de cartões?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground space-y-2">
                                        <p>
                                            Ela permite <strong>gerar cartões</strong> com dados fictícios para fins de testes. O desenvolvedor <strong>pode gerar</strong> dados simulando bandeiras como <strong>visa mastercard</strong> ou <strong>american express</strong> para validar se as integrações respondem corretamente aos formatos exigidos.
                                        </p>
                                        <p>
                                            Os dados gerados vêm <strong>formatados corretamente</strong> segundo a estrutura lógica e comprimento de <strong>cada bandeira</strong>, assegurando que os campos de validação de formulários (como número do cartão, CVV e data de expiração) passem em testes sintáticos locais.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>O que é o Algoritmo de Luhn?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        O algoritmo de Luhn (também conhecido como fórmula &quot;módulo 10&quot;) é uma fórmula de soma de verificação simples usada para validar uma variedade de números de identificação, como números de cartões de crédito. A maioria das bandeiras de cartões (Visa, Mastercard, Discover, Amex) adota esse algoritmo para evitar erros acidentais de digitação.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>O gerador fornece dados completos de cobrança?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Sim. Além de gerar o número do cartão estruturalmente correto, nossa ferramenta fornece um nome de portador fictício (John Doe), data de expiração futura válida e código de segurança (CVV) compatível com a bandeira selecionada. Isso é ideal para testar formulários que exigem o fluxo completo de pagamento e validações de endereço de faturamento (Billing Address).
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: LUHN_JS_CODE },
                                        { language: "python", label: "Python", code: LUHN_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: LUHN_CSHARP_CODE },
                                        { language: "java", label: "Java", code: LUHN_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <h3 className="text-sm font-medium text-muted-foreground mb-3">Guias Relacionados</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Link href="/guides/validation/credit-card-generator/python" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                                        Algoritmo de Luhn em Python
                                    </Link>
                                    <Link href="/guides/validation/credit-card-generator/javascript" className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors">
                                        Algoritmo de Luhn em JavaScript
                                    </Link>
                                    <Link href="/guides/validation/credit-card-generator/java" className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">
                                        Algoritmo de Luhn em Java
                                    </Link>
                                    <Link href="/guides/validation/credit-card-generator/csharp" className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                                        Algoritmo de Luhn em C#
                                    </Link>
                                </div>
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Cartão de Crédito"
                                    description="Gere cartões de crédito fictícios válidos para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="credit-card-generator" category="finance" />
                </div>
            </main>

        </div>
    )
}
