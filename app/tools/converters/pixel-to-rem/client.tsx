"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRightLeft } from "lucide-react"
import { useState, useEffect } from "react"

import { Navbar } from "@/components/layout/navbar"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export function PixelToRemPage() {
    const [pixels, setPixels] = useState<string>("16")
    const [rem, setRem] = useState<string>("1")
    const [baseSize, setBaseSize] = useState<string>("16")

    const handlePixelChange = (val: string) => {
        setPixels(val)
        if (!val || isNaN(Number(val))) {
            setRem("")
            return
        }
        const remValue = parseFloat(val) / parseFloat(baseSize)
        setRem(remValue.toFixed(4).replace(/\.?0+$/, ""))
    }

    const handleRemChange = (val: string) => {
        setRem(val)
        if (!val || isNaN(Number(val))) {
            setPixels("")
            return
        }
        const pxValue = parseFloat(val) * parseFloat(baseSize)
        setPixels(pxValue.toFixed(2).replace(/\.?0+$/, ""))
    }

    // Recalculate when base size changes
    useEffect(() => {
        if (pixels) handlePixelChange(pixels)
    }, [baseSize])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8 max-w-4xl">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Conversores" }, { "label": "Pixel to REM" }]} className="mb-6" />
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold tracking-tight">Conversor Pixel ⬌ REM</h1>
                        <p className="text-muted-foreground text-lg">
                            Calcule e converta unidades CSS rapidamente.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Calculadora</CardTitle>
                            <CardDescription>
                                Ajuste o tamanho base da fonte (geralmente 16px) para obter resultados precisos.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                                <Label htmlFor="baseSize" className="whitespace-nowrap font-semibold">Base Font Size (px):</Label>
                                <Input
                                    id="baseSize"
                                    type="number"
                                    value={baseSize}
                                    onChange={(e) => setBaseSize(e.target.value)}
                                    className="w-24"
                                />
                            </div>

                            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
                                <div className="space-y-2">
                                    <Label htmlFor="pixels" className="text-lg">Pixels (px)</Label>
                                    <Input
                                        id="pixels"
                                        type="number"
                                        value={pixels}
                                        onChange={(e) => handlePixelChange(e.target.value)}
                                        className="text-2xl h-14"
                                        placeholder="0"
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <ArrowRightLeft className="w-8 h-8 text-muted-foreground" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="rem" className="text-lg">REM (rem)</Label>
                                    <Input
                                        id="rem"
                                        type="number"
                                        value={rem}
                                        onChange={(e) => handleRemChange(e.target.value)}
                                        className="text-2xl h-14"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                                {[8, 12, 14, 16, 18, 20, 24, 32].map((px) => (
                                    <Button
                                        key={px}
                                        variant="outline"
                                        onClick={() => handlePixelChange(px.toString())}
                                    >
                                        {px}px ⬌ {px / parseFloat(baseSize)}rem
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <article className="prose dark:prose-invert max-w-none">
                        <h2>Por que usar REM ao invés de Pixels?</h2>
                        <p>
                            O uso de <strong>REM (Root EM)</strong> é recomendado para acessibilidade e design responsivo.
                            Ao contrário do Pixel (uma unidade absoluta), o REM é relativo ao tamanho da fonte do elemento raiz (<code>html</code>).
                        </p>
                        <p>
                            Isso permite que, se um usuário alterar o tamanho da fonte padrão do navegador para enxergar melhor,
                            todo o seu layout escale proporcionalmente, mantendo a harmonia e legibilidade.
                        </p>
                        <h3>Fórmula de Conversão</h3>
                        <pre><code>REM = Pixels / Base Size (16px)</code></pre>
                    </article>
                </div>
            </main>
        </div>
    )
}
