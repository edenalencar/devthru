"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CreditCard, RefreshCw, Copy } from "lucide-react"
import { generateCreditCard, generateExpiryDate, generateCVV, CARD_BRANDS, CardBrand } from "@/lib/utils/generators/credit-card"
import { toast } from "sonner"

export default function CreditCardGeneratorPage() {
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
                </div>
            </main>

            <Footer />
        </div>
    )
}
