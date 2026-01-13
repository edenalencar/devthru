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

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Boleto</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <p>
                                    O Gerador de Boleto cria uma representação visual de um boleto bancário brasileiro para fins de teste de interface e impressão.
                                    Ele gera um código de barras fictício e formata o documento conforme os padrões bancários.
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Nota:</strong> Este boleto é puramente ilustrativo (mock) e não possui valor financeiro nem registro bancário. Não tente pagá-lo.
                                </p>
                            </div>
                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Boleto (Mock)"
                                    description="Gere boletos fictícios para testes de interface e impressão."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}
