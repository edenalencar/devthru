"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ToolResult } from "@/components/tools/tool-result"
import { RefreshCw } from "lucide-react"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"
import { Navbar } from "@/components/layout/navbar"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

const firstNamesMale = [
    "Miguel", "Arthur", "Gael", "Théo", "Heitor", "Ravi", "Davi", "Bernardo", "Noah", "Gabriel",
    "Samuel", "Pedro", "Anthony", "Isaac", "Benício", "Benjamin", "Matheus", "Lucas", "Joaquim", "Nicolas",
    "Lucca", "Lorenzo", "Henrique", "João", "Rafael", "Daniel", "Enzo", "Murilo", "Gustavo", "Felipe"
]

const firstNamesFemale = [
    "Helena", "Alice", "Laura", "Maria", "Sophia", "Manuela", "Maitê", "Liz", "Cecília", "Isabella",
    "Luísa", "Eloá", "Heloísa", "Júlia", "Ayla", "Madalena", "Isis", "Antonella", "Esther", "Maya",
    "Olivia", "Bárbara", "Nicole", "Lívia", "Agatha", "Melissa", "Yasmin", "Beatriz", "Clara", "Ana"
]

const lastNames = [
    "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes",
    "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa",
    "Rocha", "Dias", "Nascimento", "Andrade", "Moreira", "Nunes", "Marques", "Machado", "Mendes", "Freitas"
]

export function NameGeneratorPage() {
    const [name, setName] = useState<string>("")
    const [gender, setGender] = useState<"all" | "male" | "female">("all")
    const { isPro, limit } = useUser()

    const generateName = (selectedGender: "all" | "male" | "female" = gender): string => {
        let firstNameList: string[] = []
        if (selectedGender === "male") firstNameList = firstNamesMale
        else if (selectedGender === "female") firstNameList = firstNamesFemale
        else firstNameList = [...firstNamesMale, ...firstNamesFemale]

        const firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)]
        const lastName1 = lastNames[Math.floor(Math.random() * lastNames.length)]
        const lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)]

        // Avoid duplicate last names
        const finalLastName2 = lastName1 === lastName2
            ? lastNames[(lastNames.indexOf(lastName2) + 1) % lastNames.length]
            : lastName2

        return `${firstName} ${lastName1} ${finalLastName2}`
    }

    const handleGenerate = () => {
        setName(generateName())
    }

    useEffect(() => {
        if (!name) {
            setTimeout(() => handleGenerate(), 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Pessoal", href: "/ferramentas-pessoais" },
                        { label: "Gerador de Nomes" }
                    ]} className="mb-6" />
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Gerador de Nomes</h1>
                        <p className="text-muted-foreground">
                            Gere nomes completos brasileiros aleatórios para testes.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar Nome</CardTitle>
                                <CardDescription>Gere um único nome completo</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-3">
                                    <Label>Gênero</Label>
                                    <RadioGroup
                                        defaultValue="all"
                                        value={gender}
                                        onValueChange={(v) => setGender(v as "all" | "male" | "female")}
                                        className="flex space-x-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="all" />
                                            <Label htmlFor="all">Todos</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="male" id="male" />
                                            <Label htmlFor="male">Masculino</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="female" id="female" />
                                            <Label htmlFor="female">Feminino</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {name && (
                                    <ToolResult
                                        result={name}
                                        toolId="name"
                                        toolName="Nome"
                                        input={{ gender }}
                                        successMessage="Nome gerado com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Novo Nome
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
                                    generatorFn={() => generateName(gender)}
                                    label="Nomes"
                                    limit={limit}
                                    isPro={isPro}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Nomes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <p>
                                    O Gerador de Nomes cria nomes completos brasileiros aleatórios, combinando nomes e sobrenomes comuns.
                                    Você pode filtrar por gênero (masculino, feminino ou todos) para obter resultados mais específicos.
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Nota:</strong> Os nomes são gerados a partir de listas de nomes populares no Brasil e não representam pessoas reais.
                                </p>
                            </div>
                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Nomes"
                                    description="Gere nomes e sobrenomes brasileiros aleatórios para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="name" category="personal" />
                </div>
            </main>

        </div>
    )
}
