"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Coins, ArrowRightLeft, AlertCircle } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { ShareButtons } from "@/components/share-buttons"

interface Currencies {
    [key: string]: string
}

export function CurrencyConverterPage() {
    const [amount, setAmount] = useState<string>("1")
    const [fromCurrency, setFromCurrency] = useState<string>("USD")
    const [toCurrency, setToCurrency] = useState<string>("BRL")
    const [result, setResult] = useState<string>("")
    const [currencies, setCurrencies] = useState<Currencies>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [converting, setConverting] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdated, setLastUpdated] = useState<string | null>(null)

    // Fetch available currencies
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch("https://api.frankfurter.dev/v1/currencies")
                if (!response.ok) throw new Error("Failed to fetch currencies")
                const data = await response.json()
                setCurrencies(data)
                setLoading(false)
            } catch {
                setError("Erro ao carregar moedas. Tente novamente mais tarde.")
                setLoading(false)
            }
        }

        fetchCurrencies()
    }, [])

    // Convert currency
    useEffect(() => {
        const convert = async () => {
            if (!amount || isNaN(Number(amount))) {
                setResult("")
                return
            }

            if (fromCurrency === toCurrency) {
                setResult(amount)
                return
            }

            setConverting(true)
            setError(null)

            try {
                const response = await fetch(
                    `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
                )

                if (!response.ok) throw new Error("Failed to fetch rates")

                const data = await response.json()
                setResult(data.rates[toCurrency].toFixed(2))
                setLastUpdated(new Date(data.date).toLocaleDateString("pt-BR"))
            } catch (err) {
                setError("Erro ao realizar conversão.")
                console.error(err)
            } finally {
                setConverting(false)
            }
        }

        // Debounce conversion
        const timeoutId = setTimeout(() => {
            convert()
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [amount, fromCurrency, toCurrency])

    const handleSwap = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-8 max-w-4xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                            <Coins className="h-8 w-8" />
                            Conversor de Moedas
                        </h1>
                        <p className="text-muted-foreground">
                            Converta valores entre diferentes moedas com taxas atualizadas
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Conversão em Tempo Real</CardTitle>
                            <CardDescription>
                                Taxas de câmbio atualizadas diariamente (Fonte: Banco Central Europeu)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {error && (
                                <div className="flex items-center gap-2 p-4 text-destructive bg-destructive/10 rounded-lg">
                                    <AlertCircle className="h-5 w-5" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
                                <div className="space-y-2">
                                    <Label>De</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Valor"
                                            min="0"
                                        />
                                        <Select value={fromCurrency} onValueChange={setFromCurrency} disabled={loading}>
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue placeholder="Moeda" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(currencies).map(([code]) => (
                                                    <SelectItem key={code} value={code}>
                                                        {code}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {currencies[fromCurrency]}
                                    </p>
                                </div>

                                <div className="flex justify-center pb-6">
                                    <Button variant="ghost" size="icon" onClick={handleSwap} className="rounded-full">
                                        <ArrowRightLeft className="h-6 w-6" />
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label>Para</Label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Input
                                                readOnly
                                                value={converting ? "Calculando..." : result}
                                                className="pr-10 bg-muted"
                                            />
                                        </div>
                                        <Select value={toCurrency} onValueChange={setToCurrency} disabled={loading}>
                                            <SelectTrigger className="w-[140px]">
                                                <SelectValue placeholder="Moeda" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(currencies).map(([code]) => (
                                                    <SelectItem key={code} value={code}>
                                                        {code}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {currencies[toCurrency]}
                                    </p>
                                </div>
                            </div>

                            {result && !converting && !error && (
                                <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-lg border">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground">
                                            Resultado:
                                            <span className="ml-2 font-medium text-foreground text-lg">
                                                {Number(amount).toLocaleString('pt-BR', { style: 'currency', currency: fromCurrency })} = {Number(result).toLocaleString('pt-BR', { style: 'currency', currency: toCurrency })}
                                            </span>
                                        </div>
                                        <CopyButton text={result} />
                                    </div>
                                    {lastUpdated && (
                                        <p className="text-xs text-muted-foreground">
                                            Última atualização das taxas: {lastUpdated}
                                        </p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Conversor de Moedas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <p>
                                    O Conversor de Moedas utiliza taxas de câmbio atualizadas diariamente pelo Banco Central Europeu para realizar conversões precisas entre diversas moedas mundiais.
                                    Ideal para viajantes, compras internacionais e planejamento financeiro.
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Nota:</strong> As taxas são atualizadas uma vez por dia (dias úteis) e podem apresentar pequenas variações em relação ao câmbio comercial em tempo real.
                                </p>
                            </div>
                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Conversor de Moedas"
                                    description="Converta valores entre diferentes moedas com taxas atualizadas."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}
