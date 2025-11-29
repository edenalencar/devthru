"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolResult } from "@/components/tools/tool-result"
import { RefreshCw } from "lucide-react"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"

const streetTypes = ["Rua", "Avenida", "Travessa", "Alameda", "Praça", "Rodovia"]
const streetNames = [
    "das Flores", "São João", "Principal", "do Comércio", "Brasil", "Sete de Setembro", "Quinze de Novembro",
    "Tiradentes", "Santo Antônio", "Bela Vista", "da Paz", "Amazonas", "Paraná", "São Paulo", "Rio de Janeiro"
]
const neighborhoods = ["Centro", "Jardim América", "Bela Vista", "Vila Nova", "Santo Antônio", "Boa Viagem", "Copacabana", "Savassi"]
const cities = [
    { name: "São Paulo", uf: "SP" },
    { name: "Rio de Janeiro", uf: "RJ" },
    { name: "Belo Horizonte", uf: "MG" },
    { name: "Curitiba", uf: "PR" },
    { name: "Porto Alegre", uf: "RS" },
    { name: "Salvador", uf: "BA" },
    { name: "Recife", uf: "PE" },
    { name: "Fortaleza", uf: "CE" },
    { name: "Brasília", uf: "DF" },
    { name: "Manaus", uf: "AM" }
]

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function AddressGeneratorPage() {
    const [address, setAddress] = useState<string>("")
    const { isPro, limit } = useUser()

    const generateAddress = (): string => {
        const type = streetTypes[Math.floor(Math.random() * streetTypes.length)]
        const name = streetNames[Math.floor(Math.random() * streetNames.length)]
        const number = Math.floor(Math.random() * 2000) + 1
        const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)]
        const city = cities[Math.floor(Math.random() * cities.length)]

        // Generate random CEP
        const cepPrefix = Math.floor(Math.random() * 90000) + 10000
        const cepSuffix = Math.floor(Math.random() * 900) + 100
        const cep = `${cepPrefix}-${cepSuffix}`

        return `${type} ${name}, ${number} - ${neighborhood}, ${city.name} - ${city.uf}, ${cep}`
    }

    const handleGenerate = () => {
        setAddress(generateAddress())
    }

    if (!address) {
        handleGenerate()
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Gerador de Endereços</h1>
                        <p className="text-muted-foreground">
                            Gere endereços brasileiros fictícios completos para testes.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar Endereço</CardTitle>
                                <CardDescription>Gere um único endereço completo</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {address && (
                                    <ToolResult
                                        result={address}
                                        toolId="address"
                                        toolName="Endereço"
                                        input={{}}
                                        successMessage="Endereço gerado com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Novo Endereço
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Geração em Massa</CardTitle>
                                <CardDescription>Gere múltiplos endereços de uma vez</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BulkGenerator
                                    generatorFn={generateAddress}
                                    label="Endereços"
                                    limit={limit}
                                    isPro={isPro}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
