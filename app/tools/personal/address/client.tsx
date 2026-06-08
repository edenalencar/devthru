"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToolResult } from "@/components/tools/tool-result"
import { RefreshCw } from "lucide-react"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"
import { Navbar } from "@/components/layout/navbar"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Label } from "@/components/ui/label"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

export function AddressGeneratorPage() {
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

    useEffect(() => {
        if (!address) {
            setTimeout(() => handleGenerate(), 0)
        }
    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Dados Pessoais", href: "/ferramentas-pessoais" },
                        { label: "Gerador de Endereços" }
                    ]} className="mb-6" />
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
                                <CardDescription>
                                    {getPlanLimitMessage(limit)}
                                </CardDescription>
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

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Endereços e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3 text-sm text-muted-foreground">
                                <p>
                                    O Gerador de Endereços cria endereços brasileiros fictícios completos, incluindo rua, número, bairro, cidade, estado e CEP, seguindo o padrão oficial dos Correios.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Como usar este gerador de endereços para testes de sistema?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Durante a homologação de sistemas de entrega, e-commerce ou cadastros em geral, desenvolvedores e analistas de QA necessitam preencher endereços estruturados de forma ágil. Em vez de preencher manualmente campo por campo, você pode gerar um endereço completo aleatório (ou em lote na aba ao lado) e simplesmente copiá-lo.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Os CEPs e endereços gerados são reais?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Os endereços gerados são totalmente <strong>fictícios</strong> e gerados combinando logradouros, bairros, cidades e estados reais de forma aleatória. Os CEPs são gerados com a máscara correta e no intervalo correspondente às regiões (como SP, RJ, MG), mas podem não estar ativamente cadastrados na base de dados oficial dos Correios. Use apenas para fins de simulação.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Endereços"
                                    description="Gere endereços brasileiros fictícios completos."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="address" category="personal" />
                </div>
            </main>

        </div>
    )
}
