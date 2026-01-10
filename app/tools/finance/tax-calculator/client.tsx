"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, DollarSign, Info } from "lucide-react"
import { calculateSimplesNacional } from "@/lib/utils/calculators/tax"

export function TaxCalculatorPage() {
    const [revenue12Months, setRevenue12Months] = useState("")
    const [revenueMonth, setRevenueMonth] = useState("")
    const [anexo, setAnexo] = useState("I")
    const [result, setResult] = useState<{ effectiveRate: number, taxAmount: number } | null>(null)

    const handleCalculate = () => {
        const rbt12 = parseFloat(revenue12Months.replace(/\D/g, '')) / 100 || 0
        const rMonth = parseFloat(revenueMonth.replace(/\D/g, '')) / 100 || 0

        try {
            const calc = calculateSimplesNacional(rbt12, rMonth, anexo)
            setResult(calc)
        } catch (error) {
            console.error(error)
        }
    }

    const formatMoneyInput = (value: string) => {
        const number = value.replace(/\D/g, "")
        const amount = parseFloat(number) / 100
        return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }

    const handleRevenue12Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRevenue12Months(formatMoneyInput(e.target.value))
    }

    const handleRevenueMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRevenueMonth(formatMoneyInput(e.target.value))
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Calculator className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Calculadora Simples Nacional</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Calcule o imposto a pagar no regime do Simples Nacional com base no faturamento.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Calculator Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Dados do Faturamento</CardTitle>
                                <CardDescription>
                                    Informe os dados para o cálculo
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="anexo">Anexo (Atividade)</Label>
                                    <Select value={anexo} onValueChange={setAnexo}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o anexo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="I">Anexo I - Comércio</SelectItem>
                                            <SelectItem value="II">Anexo II - Indústria</SelectItem>
                                            <SelectItem value="III">Anexo III - Serviços (Locação, Manutenção...)</SelectItem>
                                            <SelectItem value="IV">Anexo IV - Serviços (Limpeza, Vigilância...)</SelectItem>
                                            <SelectItem value="V">Anexo V - Serviços (Auditoria, Jornalismo...)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="revenue12">Faturamento Últimos 12 Meses (RBT12)</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="revenue12"
                                            value={revenue12Months}
                                            onChange={handleRevenue12Change}
                                            className="pl-9"
                                            placeholder="R$ 0,00"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="revenueMonth">Faturamento do Mês Atual</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="revenueMonth"
                                            value={revenueMonth}
                                            onChange={handleRevenueMonthChange}
                                            className="pl-9"
                                            placeholder="R$ 0,00"
                                        />
                                    </div>
                                </div>

                                <Button onClick={handleCalculate} className="w-full" size="lg">
                                    Calcular Imposto
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Result Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Resultado</CardTitle>
                                <CardDescription>
                                    Estimativa do imposto a pagar
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {result ? (
                                    <div className="space-y-6">
                                        <div className="rounded-lg bg-muted p-6 text-center">
                                            <p className="text-sm font-medium text-muted-foreground mb-2">Valor do DAS</p>
                                            <p className="text-4xl font-bold text-primary">
                                                {result.taxAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="rounded-lg border p-4">
                                                <p className="text-sm font-medium text-muted-foreground mb-1">Alíquota Efetiva</p>
                                                <p className="text-2xl font-semibold">
                                                    {(result.effectiveRate * 100).toFixed(2)}%
                                                </p>
                                            </div>
                                            <div className="rounded-lg border p-4">
                                                <p className="text-sm font-medium text-muted-foreground mb-1">Anexo</p>
                                                <p className="text-2xl font-semibold">
                                                    {anexo}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-950/20 p-4 rounded-md">
                                            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                                            <p>
                                                Este cálculo é uma estimativa baseada na tabela vigente. O valor real pode variar dependendo de deduções específicas, ISS fixo, ou repartição de tributos. Consulte sempre seu contador.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 text-muted-foreground">
                                        <Calculator className="h-16 w-16 mb-4 opacity-20" />
                                        <p>Preencha os dados e clique em calcular</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre a Calculadora Simples Nacional</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                A Calculadora Simples Nacional estima o valor do imposto mensal (DAS) a ser pago por micro e pequenas empresas, com base no faturamento acumulado (RBT12) e no faturamento do mês atual.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Os cálculos são baseados nas tabelas e alíquotas vigentes, mas podem haver variações devido a regras específicas de cada estado ou município (como ISS e ICMS). Utilize apenas como estimativa.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}
