"use client"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Barcode, Download, Printer } from "lucide-react"
import { toPng } from "html-to-image"
import jsPDF from "jspdf"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const BOLETO_JS_CODE = `function validateBoletoLd(linhaDigitavel) {
  const cleaned = linhaDigitavel.replace(/[^0-9]/g, "");
  if (cleaned.length !== 47 && cleaned.length !== 48) return false;
  
  const block = cleaned.substring(0, 9);
  let sum = 0;
  let multiplier = 2;
  for (let i = block.length - 1; i >= 0; i--) {
    let result = parseInt(block[i], 10) * multiplier;
    if (result > 9) result = Math.floor(result / 10) + (result % 10);
    sum += result;
    multiplier = multiplier === 2 ? 1 : 2;
  }
  const rest = sum % 10;
  const calculatedDv = rest === 0 ? 0 : 10 - rest;
  const originalDv = parseInt(cleaned[9], 10);
  
  return calculatedDv === originalDv;
}`;

const BOLETO_PYTHON_CODE = `def validate_boleto_ld(linha_digitavel: str) -> bool:
    cleaned = "".join(filter(str.isdigit, linha_digitavel))
    if len(cleaned) not in (47, 48):
        return False
        
    block = cleaned[0:9]
    total_sum = 0
    multiplier = 2
    for char in reversed(block):
        result = int(char) * multiplier
        if result > 9:
            result = (result // 10) + (result % 10)
        total_sum += result
        multiplier = 1 if multiplier == 2 else 2
        
    rest = total_sum % 10
    calculated_dv = 0 if rest == 0 else 10 - rest
    original_dv = int(cleaned[9])
    
    return calculated_dv == original_dv`;

const BOLETO_CSHARP_CODE = `using System;
using System.Text.RegularExpressions;

public static class BoletoValidator
{
    public static bool ValidateLd(string linhaDigitavel)
    {
        string cleaned = Regex.Replace(linhaDigitavel ?? "", @"[^0-9]", "");
        if (cleaned.Length != 47 && cleaned.Length != 48) return false;

        string block = cleaned.Substring(0, 9);
        int sum = 0;
        int multiplier = 2;
        for (int i = block.Length - 1; i >= 0; i--)
        {
            int result = (block[i] - '0') * multiplier;
            if (result > 9) result = (result / 10) + (result % 10);
            sum += result;
            multiplier = multiplier == 2 ? 1 : 2;
        }

        int rest = sum % 10;
        int calculatedDv = rest == 0 ? 0 : 10 - rest;
        int originalDv = cleaned[9] - '0';

        return calculatedDv == originalDv;
    }
}`;

const BOLETO_JAVA_CODE = `public class BoletoValidator {
    public static boolean validateLd(String linhaDigitavel) {
        if (linhaDigitavel == null) return false;
        String cleaned = linhaDigitavel.replaceAll("[^0-9]", "");
        if (cleaned.length() != 47 && cleaned.length() != 48) return false;

        String block = cleaned.substring(0, 9);
        int sum = 0;
        int multiplier = 2;
        for (int i = block.length() - 1; i >= 0; i--) {
            int result = Character.getNumericValue(block.charAt(i)) * multiplier;
            if (result > 9) result = (result / 10) + (result % 10);
            sum += result;
            multiplier = multiplier == 2 ? 1 : 2;
        }

        int rest = sum % 10;
        int calculatedDv = rest == 0 ? 0 : Character.getNumericValue(cleaned.charAt(9));

        return calculatedDv == Character.getNumericValue(cleaned.charAt(9));
    }
}`;

export function BoletoGeneratorPage() {
    const [beneficiary, setBeneficiary] = useState("Empresa Exemplo LTDA")
    const [payer, setPayer] = useState("Fulano de Tal")
    const [value, setValue] = useState("150,00")
    const [dueDate, setDueDate] = useState("2025-12-31")
    const [barcodeNumber, setBarcodeNumber] = useState("23790.50400 44123.456789 01000.654321 1 87650000015000")

    const boletoRef = useRef<HTMLDivElement>(null)

    const [barcodeLines, setBarcodeLines] = useState<{ width: string, opacity: number }[]>([])

    useEffect(() => {
        setTimeout(() => {
            setBarcodeLines(Array.from({ length: 50 }).map(() => ({
                width: Math.random() > 0.5 ? '4px' : '2px',
                opacity: Math.random() > 0.1 ? 1 : 0
            })))
        }, 0)
    }, [])

    const handleDownload = async () => {
        if (!boletoRef.current) return

        try {
            const dataUrl = await toPng(boletoRef.current, { pixelRatio: 2 })
            const pdf = new jsPDF("p", "mm", "a4")
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const imgProps = pdf.getImageProperties(dataUrl)
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

            pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight)
            pdf.save("boleto-mock.pdf")
        } catch (error) {
            console.error("Error generating PDF:", error)
        }
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 print:p-0">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full print:p-0 print:max-w-none">
                    {/* Header - Hidden on print */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Dados Financeiros" }, { "label": "Gerador de Boleto" }]} className="mb-6" />
                    <div className="mb-8 print:hidden">
                        <div className="flex items-center gap-3 mb-4">
                            <Barcode className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de Boleto (Mock)</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere um boleto bancário visual para testes de interface e impressão.
                            <span className="block font-bold text-red-500 mt-2">
                                ATENÇÃO: Este boleto é fictício e NÃO deve ser pago.
                            </span>
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3 print:block">
                        {/* Controls - Hidden on print */}
                        <Card className="lg:col-span-1 print:hidden h-fit">
                            <CardHeader>
                                <CardTitle>Dados do Boleto</CardTitle>
                                <CardDescription>
                                    Preencha os dados para gerar o mock
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="beneficiary">Beneficiário</Label>
                                    <Input id="beneficiary" value={beneficiary} onChange={(e) => setBeneficiary(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="payer">Pagador</Label>
                                    <Input id="payer" value={payer} onChange={(e) => setPayer(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="value">Valor (R$)</Label>
                                    <Input id="value" value={value} onChange={(e) => setValue(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dueDate">Vencimento</Label>
                                    <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="barcode">Linha Digitável</Label>
                                    <Input id="barcode" value={barcodeNumber} onChange={(e) => setBarcodeNumber(e.target.value)} />
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button onClick={handleDownload} className="flex-1" variant="outline">
                                        <Download className="mr-2 h-4 w-4" /> PDF
                                    </Button>
                                    <Button onClick={handlePrint} className="flex-1" variant="outline">
                                        <Printer className="mr-2 h-4 w-4" /> Print
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Preview */}
                        <div className="lg:col-span-2 print:w-full">
                            <div ref={boletoRef} className="bg-white p-8 border rounded-lg shadow-sm print:border-0 print:shadow-none min-h-[600px] text-black">
                                {/* Boleto Header */}
                                <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="font-bold text-2xl italic">BANCO MOCK</div>
                                        <div className="border-l-2 border-black pl-4 text-xl font-bold">999-9</div>
                                    </div>
                                    <div className="text-lg font-mono tracking-wider">
                                        {barcodeNumber}
                                    </div>
                                </div>

                                {/* Boleto Body */}
                                <div className="grid grid-cols-4 border border-black">
                                    <div className="col-span-3 border-r border-black p-1">
                                        <div className="text-[10px] uppercase text-gray-600">Local de Pagamento</div>
                                        <div className="text-sm">PAGÁVEL EM QUALQUER BANCO ATÉ O VENCIMENTO</div>
                                    </div>
                                    <div className="col-span-1 p-1 bg-gray-50">
                                        <div className="text-[10px] uppercase text-gray-600">Vencimento</div>
                                        <div className="text-sm font-bold text-right">{dueDate.split('-').reverse().join('/')}</div>
                                    </div>

                                    <div className="col-span-3 border-r border-t border-black p-1">
                                        <div className="text-[10px] uppercase text-gray-600">Beneficiário</div>
                                        <div className="text-sm">{beneficiary}</div>
                                    </div>
                                    <div className="col-span-1 border-t border-black p-1">
                                        <div className="text-[10px] uppercase text-gray-600">Agência/Código Beneficiário</div>
                                        <div className="text-sm text-right">1234/56789-0</div>
                                    </div>

                                    <div className="col-span-1 border-r border-t border-black p-1">
                                        <div className="text-[10px] uppercase text-gray-600">Data Documento</div>
                                        <div className="text-sm">29/11/2025</div>
                                    </div>
                                    <div className="col-span-1 border-r border-t border-black p-1">
                                        <div className="text-[10px] uppercase text-gray-600">Número Documento</div>
                                        <div className="text-sm">123456</div>
                                    </div>
                                    <div className="col-span-1 border-r border-t border-black p-1">
                                        <div className="text-[10px] uppercase text-gray-600">Espécie Doc.</div>
                                        <div className="text-sm">DM</div>
                                    </div>
                                    <div className="col-span-1 border-t border-black p-1">
                                        <div className="text-[10px] uppercase text-gray-600">Aceite</div>
                                        <div className="text-sm text-right">N</div>
                                    </div>

                                    <div className="col-span-1 border-r border-t border-black p-1">
                                        <div className="text-[10px] uppercase text-gray-600">Data Processamento</div>
                                        <div className="text-sm">29/11/2025</div>
                                    </div>
                                    <div className="col-span-2 border-r border-t border-black p-1">
                                        <div className="text-[10px] uppercase text-gray-600">Carteira / Nosso Número</div>
                                        <div className="text-sm">09 / 12345678901-2</div>
                                    </div>
                                    <div className="col-span-1 border-t border-black p-1 bg-gray-50">
                                        <div className="text-[10px] uppercase text-gray-600">Valor do Documento</div>
                                        <div className="text-sm font-bold text-right">R$ {value}</div>
                                    </div>

                                    <div className="col-span-3 border-r border-t border-black p-1 min-h-[100px]">
                                        <div className="text-[10px] uppercase text-gray-600">Instruções</div>
                                        <div className="text-sm mt-1">
                                            <p>SR. CAIXA, NÃO RECEBER APÓS O VENCIMENTO.</p>
                                            <p>JUROS DE MORA DE R$ 1,00 AO DIA.</p>
                                            <p>PROTESTAR APÓS 5 DIAS DO VENCIMENTO.</p>
                                        </div>
                                    </div>
                                    <div className="col-span-1 border-t border-black">
                                        <div className="p-1 border-b border-black">
                                            <div className="text-[10px] uppercase text-gray-600">(-) Desconto / Abatimento</div>
                                            <div className="text-sm text-right">&nbsp;</div>
                                        </div>
                                        <div className="p-1 border-b border-black">
                                            <div className="text-[10px] uppercase text-gray-600">(-) Outras Deduções</div>
                                            <div className="text-sm text-right">&nbsp;</div>
                                        </div>
                                        <div className="p-1 border-b border-black">
                                            <div className="text-[10px] uppercase text-gray-600">(+) Mora / Multa</div>
                                            <div className="text-sm text-right">&nbsp;</div>
                                        </div>
                                        <div className="p-1">
                                            <div className="text-[10px] uppercase text-gray-600">(=) Valor Cobrado</div>
                                            <div className="text-sm text-right">&nbsp;</div>
                                        </div>
                                    </div>

                                    <div className="col-span-4 border-t border-black p-1">
                                        <div className="text-[10px] uppercase text-gray-600">Pagador</div>
                                        <div className="text-sm font-bold">{payer}</div>
                                        <div className="text-sm">Rua Exemplo, 123 - Bairro - Cidade/UF - CEP: 12345-678</div>
                                    </div>
                                </div>

                                {/* Barcode Mock Mock */}
                                <div className="mt-8 ml-4">
                                    <div className="h-16 w-full max-w-[400px] flex items-end gap-[2px]">
                                        {/* Simple CSS Barcode Mock */}
                                        {barcodeLines.map((style, i) => (
                                            <div
                                                key={i}
                                                className="bg-black"
                                                style={{
                                                    height: '100%',
                                                    width: style.width,
                                                    opacity: style.opacity
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-2 text-right text-[10px] text-gray-500 border-t pt-2">
                                    Autenticação Mecânica
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Section & FAQ */}
                    <Card className="mt-8 print:hidden">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Boleto e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <p>
                                    O Gerador de Boleto cria uma representação visual de um boleto bancário brasileiro para fins de teste de interface, homologação de layouts e impressão.
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Atenção:</strong> Este documento é puramente ilustrativo (mock) e não possui registro na Febraban. Ele **NÃO** deve ser pago. Use exclusivamente para testes de software.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Como é calculada a linha digitável e o código de barras de um boleto?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        O código de barras oficial contém 44 dígitos numéricos estruturados com dados do banco, moeda, data de vencimento, valor e conta. A linha digitável de 47 dígitos é uma representação do código de barras dividida em 3 blocos de 9 dígitos (cada um com seu próprio dígito verificador módulo 10), mais o dígito verificador geral no meio e o fator de vencimento no fim.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Para que serve um gerador de boleto mock?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Desenvolvedores utilizam essa ferramenta para simular a emissão de boletos, testar o alinhamento de impressão, exportação para PDF, e validar se o leitor de código de barras ou a câmera de aplicativos bancários em ambiente de homologação leem a linha digitável simulada sem problemas de layout.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Qual a diferença do boleto mock para um boleto registrado?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Boletos registrados são cadastrados na rede bancária via APIs da instituição ou arquivos de remessa CNAB. Boletos mock são gerados apenas na interface (HTML/CSS) com números estáticos ou aleatórios. Eles não existem para a rede bancária e qualquer tentativa de pagamento resultará em erro de "Boleto não encontrado".
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    title="Como validar linha digitável de boleto? (Exemplos de Código)"
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: BOLETO_JS_CODE },
                                        { language: "python", label: "Python", code: BOLETO_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: BOLETO_CSHARP_CODE },
                                        { language: "java", label: "Java", code: BOLETO_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Boleto (Mock)"
                                    description="Gere boletos fictícios para testes de interface e impressão."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="boleto-generator" category="finance" />
                </div>
            </main>
        </div>
    )
}
