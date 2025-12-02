"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CopyButton } from "@/components/copy-button"
import { ArrowRightLeft } from "lucide-react"

const categories = {
    length: {
        name: "Comprimento",
        units: [
            { id: "m", name: "Metros (m)", factor: 1 },
            { id: "km", name: "Quilômetros (km)", factor: 1000 },
            { id: "cm", name: "Centímetros (cm)", factor: 0.01 },
            { id: "mm", name: "Milímetros (mm)", factor: 0.001 },
            { id: "mi", name: "Milhas (mi)", factor: 1609.34 },
            { id: "yd", name: "Jardas (yd)", factor: 0.9144 },
            { id: "ft", name: "Pés (ft)", factor: 0.3048 },
            { id: "in", name: "Polegadas (in)", factor: 0.0254 },
        ],
    },
    weight: {
        name: "Peso",
        units: [
            { id: "kg", name: "Quilogramas (kg)", factor: 1 },
            { id: "g", name: "Gramas (g)", factor: 0.001 },
            { id: "mg", name: "Miligramas (mg)", factor: 0.000001 },
            { id: "lb", name: "Libras (lb)", factor: 0.453592 },
            { id: "oz", name: "Onças (oz)", factor: 0.0283495 },
        ],
    },
    temperature: {
        name: "Temperatura",
        units: [
            { id: "c", name: "Celsius (°C)" },
            { id: "f", name: "Fahrenheit (°F)" },
            { id: "k", name: "Kelvin (K)" },
        ],
    },
    area: {
        name: "Área",
        units: [
            { id: "m2", name: "Metros Quadrados (m²)", factor: 1 },
            { id: "km2", name: "Quilômetros Quadrados (km²)", factor: 1000000 },
            { id: "cm2", name: "Centímetros Quadrados (cm²)", factor: 0.0001 },
            { id: "ha", name: "Hectares (ha)", factor: 10000 },
            { id: "ac", name: "Acres (ac)", factor: 4046.86 },
        ],
    },
    volume: {
        name: "Volume",
        units: [
            { id: "l", name: "Litros (L)", factor: 1 },
            { id: "ml", name: "Mililitros (mL)", factor: 0.001 },
            { id: "m3", name: "Metros Cúbicos (m³)", factor: 1000 },
            { id: "gal", name: "Galões (gal)", factor: 3.78541 },
            { id: "floz", name: "Onças Líquidas (fl oz)", factor: 0.0295735 },
        ],
    },
}

import { Navbar } from "@/components/layout/navbar"


export default function UnitConverterPage() {
    const [activeTab, setActiveTab] = useState("length")
    const [inputValue, setInputValue] = useState<string>("1")
    const [fromUnit, setFromUnit] = useState("m")
    const [toUnit, setToUnit] = useState("km")
    const [result, setResult] = useState<string>("")

    // Reset units when tab changes
    useEffect(() => {
        const category = categories[activeTab as keyof typeof categories]
        setFromUnit(category.units[0].id)
        setToUnit(category.units[1].id)
    }, [activeTab])

    // Calculate conversion
    useEffect(() => {
        if (!inputValue || isNaN(Number(inputValue))) {
            setResult("")
            return
        }

        const value = Number(inputValue)
        let converted = 0

        if (activeTab === "temperature") {
            if (fromUnit === toUnit) {
                converted = value
            } else if (fromUnit === "c") {
                if (toUnit === "f") converted = (value * 9) / 5 + 32
                if (toUnit === "k") converted = value + 273.15
            } else if (fromUnit === "f") {
                if (toUnit === "c") converted = ((value - 32) * 5) / 9
                if (toUnit === "k") converted = ((value - 32) * 5) / 9 + 273.15
            } else if (fromUnit === "k") {
                if (toUnit === "c") converted = value - 273.15
                if (toUnit === "f") converted = ((value - 273.15) * 9) / 5 + 32
            }
        } else {
            const category = categories[activeTab as keyof typeof categories]
            // @ts-expect-error: Category units are dynamically accessed
            const fromFactor = category.units.find((u) => u.id === fromUnit)?.factor || 1
            // @ts-expect-error: Category units are dynamically accessed
            const toFactor = category.units.find((u) => u.id === toUnit)?.factor || 1

            // Convert to base unit then to target unit
            const baseValue = value * fromFactor
            converted = baseValue / toFactor
        }

        // Format result to avoid floating point errors but keep precision
        setResult(Number(converted.toPrecision(10)).toString())
    }, [inputValue, fromUnit, toUnit, activeTab])

    const currentCategory = categories[activeTab as keyof typeof categories]

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-8 max-w-4xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                            <ArrowRightLeft className="h-8 w-8" />
                            Conversor de Unidades
                        </h1>
                        <p className="text-muted-foreground">
                            Converta facilmente entre diferentes unidades de medida
                        </p>
                    </div>

                    <Tabs defaultValue="length" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
                            {Object.entries(categories).map(([key, value]) => (
                                <TabsTrigger key={key} value={key}>
                                    {value.name}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <Card>
                            <CardHeader>
                                <CardTitle>{currentCategory.name}</CardTitle>
                                <CardDescription>
                                    Selecione as unidades e digite o valor para converter
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
                                    <div className="space-y-2">
                                        <Label>De</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                type="number"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                placeholder="Digite o valor"
                                            />
                                            <Select value={fromUnit} onValueChange={setFromUnit}>
                                                <SelectTrigger className="w-[140px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {currentCategory.units.map((unit) => (
                                                        <SelectItem key={unit.id} value={unit.id}>
                                                            {unit.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="flex justify-center pb-2 text-muted-foreground">
                                        <ArrowRightLeft className="h-6 w-6" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Para</Label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Input
                                                    readOnly
                                                    value={result}
                                                    className="pr-10 bg-muted"
                                                />
                                            </div>
                                            <Select value={toUnit} onValueChange={setToUnit}>
                                                <SelectTrigger className="w-[140px]">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {currentCategory.units.map((unit) => (
                                                        <SelectItem key={unit.id} value={unit.id}>
                                                            {unit.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                {result && (
                                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                                        <div className="text-sm text-muted-foreground">
                                            Resultado:
                                            <span className="ml-2 font-medium text-foreground text-lg">
                                                {inputValue} {currentCategory.units.find(u => u.id === fromUnit)?.name} = {result} {currentCategory.units.find(u => u.id === toUnit)?.name}
                                            </span>
                                        </div>
                                        <CopyButton text={result} />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </Tabs>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Conversor de Unidades</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Conversor de Unidades é uma ferramenta versátil para transformar medidas de Comprimento, Peso, Temperatura, Área e Volume.
                                Selecione a categoria desejada, as unidades de origem e destino, e obtenha o resultado instantaneamente.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Os cálculos utilizam fatores de conversão padrão internacional.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}

