"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, ArrowRightLeft, RefreshCw, Copy } from "lucide-react"
import { toast } from "sonner"
import { ShareButtons } from "@/components/share-buttons"

export function LicensePlatePage() {
    const [generatedPlate, setGeneratedPlate] = useState("")
    const [plateType, setPlateType] = useState<"mercosul" | "old">("mercosul")
    const [inputPlate, setInputPlate] = useState("")
    const [convertedPlate, setConvertedPlate] = useState("")

    const generateRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26))
    const generateRandomNumber = () => Math.floor(Math.random() * 10).toString()

    const generatePlate = () => {
        let plate = ""
        // Common: AAA
        plate += generateRandomLetter() + generateRandomLetter() + generateRandomLetter()

        if (plateType === "mercosul") {
            // Mercosul: AAA0A00
            plate += generateRandomNumber()
            plate += generateRandomLetter()
            plate += generateRandomNumber() + generateRandomNumber()
        } else {
            // Old: AAA-0000
            plate += "-"
            plate += generateRandomNumber() + generateRandomNumber() + generateRandomNumber() + generateRandomNumber()
        }

        setGeneratedPlate(plate)
    }

    const convertToMercosul = () => {
        // Remove non-alphanumeric
        const cleanPlate = inputPlate.toUpperCase().replace(/[^A-Z0-9]/g, "")

        if (cleanPlate.length !== 7) {
            toast.error("Placa inválida. Formato esperado: AAA-0000 ou AAA0000")
            return
        }

        // Check if it's already Mercosul (4th char is number, 5th is letter)
        const isAlreadyMercosul = /[A-Z]{3}[0-9][A-Z][0-9]{2}/.test(cleanPlate)
        if (isAlreadyMercosul) {
            setConvertedPlate(cleanPlate)
            toast.info("Esta placa já está no padrão Mercosul")
            return
        }

        // Check if it's Old format (4th-7th chars are numbers)
        const isOldFormat = /[A-Z]{3}[0-9]{4}/.test(cleanPlate)
        if (!isOldFormat) {
            toast.error("Formato de placa irreconhecível")
            return
        }

        // Conversion Logic: 2nd digit (5th char) becomes a letter
        // 0=A, 1=B, 2=C, 3=D, 4=E, 5=F, 6=G, 7=H, 8=I, 9=J
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        const fifthChar = cleanPlate[4]
        const newFifthChar = letters[parseInt(fifthChar)]

        const newPlate = cleanPlate.substring(0, 4) + newFifthChar + cleanPlate.substring(5)
        setConvertedPlate(newPlate)
        toast.success("Placa convertida com sucesso!")
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Copiado para a área de transferência")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Car className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de Placas</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere placas de veículos nos padrões Mercosul e Antigo (Cinza), ou converta entre eles.
                        </p>
                    </div>

                    <Tabs defaultValue="generate" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                            <TabsTrigger value="generate">Gerar Placa</TabsTrigger>
                            <TabsTrigger value="convert">Converter</TabsTrigger>
                        </TabsList>

                        {/* Generator Tab */}
                        <TabsContent value="generate">
                            <div className="grid gap-8 lg:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Configuração</CardTitle>
                                        <CardDescription>
                                            Escolha o padrão da placa
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button
                                                variant={plateType === "mercosul" ? "default" : "outline"}
                                                onClick={() => setPlateType("mercosul")}
                                                className="h-24 flex flex-col gap-2"
                                            >
                                                <span className="text-2xl font-bold">ABC1D23</span>
                                                <span>Mercosul</span>
                                            </Button>
                                            <Button
                                                variant={plateType === "old" ? "default" : "outline"}
                                                onClick={() => setPlateType("old")}
                                                className="h-24 flex flex-col gap-2"
                                            >
                                                <span className="text-2xl font-bold">ABC-1234</span>
                                                <span>Antiga (Cinza)</span>
                                            </Button>
                                        </div>

                                        <Button onClick={generatePlate} className="w-full" size="lg">
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                            Gerar Nova Placa
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Placa Gerada</CardTitle>
                                        <CardDescription>
                                            Resultado da geração
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {generatedPlate ? (
                                            <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-muted/50">
                                                <div className={`
                                                    text-5xl font-black tracking-wider mb-6 px-8 py-4 rounded-lg border-4
                                                    ${plateType === 'mercosul'
                                                        ? 'bg-white text-black border-blue-700 font-sans'
                                                        : 'bg-[#d4d4d4] text-black border-black font-mono'}
                                                `}>
                                                    {generatedPlate}
                                                </div>
                                                <Button variant="outline" onClick={() => copyToClipboard(generatedPlate)}>
                                                    <Copy className="mr-2 h-4 w-4" />
                                                    Copiar Placa
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border rounded-lg border-dashed">
                                                <Car className="h-12 w-12 mb-2 opacity-20" />
                                                <p>Clique em gerar para começar</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Converter Tab */}
                        <TabsContent value="convert">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Conversor para Mercosul</CardTitle>
                                    <CardDescription>
                                        Digite uma placa antiga para ver como ela fica no padrão Mercosul
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-4 items-end">
                                        <div className="w-full space-y-2">
                                            <Label>Placa Antiga</Label>
                                            <Input
                                                placeholder="ABC-1234"
                                                value={inputPlate}
                                                onChange={(e) => setInputPlate(e.target.value.toUpperCase())}
                                                maxLength={8}
                                                className="text-lg font-mono uppercase"
                                            />
                                        </div>
                                        <Button onClick={convertToMercosul} size="lg">
                                            <ArrowRightLeft className="mr-2 h-4 w-4" />
                                            Converter
                                        </Button>
                                    </div>

                                    {convertedPlate && (
                                        <div className="mt-8 p-6 bg-muted/50 rounded-lg border flex flex-col items-center">
                                            <Label className="mb-4 text-muted-foreground">Padrão Mercosul</Label>
                                            <div className="text-5xl font-black tracking-wider bg-white text-black border-4 border-blue-700 px-8 py-4 rounded-lg mb-4 font-sans">
                                                {convertedPlate}
                                            </div>
                                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(convertedPlate)}>
                                                <Copy className="mr-2 h-4 w-4" />
                                                Copiar
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Placas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <p>
                                    O Gerador de Placas permite criar visualizações de placas de veículos nos padrões Mercosul (atual) e Cinza (antigo).
                                    Além disso, a ferramenta oferece um conversor que mostra como uma placa do modelo antigo ficaria no novo padrão Mercosul.
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Nota:</strong> As placas geradas são apenas ilustrativas e não possuem validade legal.
                                </p>
                            </div>
                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Placas"
                                    description="Gere e converta placas de veículos (Mercosul e Antiga)."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>


        </div>
    )
}
