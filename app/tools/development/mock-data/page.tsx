"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Database, Plus, Trash2, RefreshCw, Download } from "lucide-react"
import { CopyButton } from "@/components/copy-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getPlanLimitMessage } from "@/lib/constants"
import { useUser } from "@/lib/hooks/use-user"

type FieldType = "string" | "number" | "boolean" | "email" | "date" | "name" | "uuid"

interface Field {
    id: string
    name: string
    type: FieldType
}

export default function MockDataGeneratorPage() {
    const [fields, setFields] = useState<Field[]>([
        { id: "1", name: "id", type: "uuid" },
        { id: "2", name: "name", type: "name" },
        { id: "3", name: "email", type: "email" },
        { id: "4", name: "isActive", type: "boolean" }
    ])
    const [count, setCount] = useState<number>(10)
    const [result, setResult] = useState<string>("")

    const { limit } = useUser()

    useEffect(() => {
        if (limit && count > limit) {
            setCount(limit)
        }
    }, [limit, count])

    const addField = () => {
        setFields([...fields, { id: crypto.randomUUID(), name: `field_${fields.length + 1}`, type: "string" }])
    }

    const removeField = (id: string) => {
        setFields(fields.filter(f => f.id !== id))
    }

    const updateField = (id: string, key: keyof Field, value: string) => {
        setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f))
    }

    const generateData = () => {
        // Enforce limit
        const actualCount = Math.min(count, limit)
        if (actualCount !== count) {
            setCount(actualCount)
        }

        const data = Array.from({ length: actualCount }, () => {
            const item: Record<string, string | number | boolean> = {}
            fields.forEach(field => {
                switch (field.type) {
                    case "uuid":
                        item[field.name] = crypto.randomUUID()
                        break
                    case "name":
                        const firstNames = ["Ana", "Bruno", "Carlos", "Daniela", "Eduardo", "Fernanda", "Gabriel", "Helena"]
                        const lastNames = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Almeida", "Pereira"]
                        item[field.name] = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
                        break
                    case "email":
                        const domains = ["gmail.com", "outlook.com", "example.com", "test.org"]
                        item[field.name] = `user${Math.floor(Math.random() * 1000)}@${domains[Math.floor(Math.random() * domains.length)]}`
                        break
                    case "number":
                        item[field.name] = Math.floor(Math.random() * 1000)
                        break
                    case "boolean":
                        item[field.name] = Math.random() > 0.5
                        break
                    case "date":
                        const start = new Date(2020, 0, 1)
                        const end = new Date()
                        item[field.name] = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString()
                        break
                    default:
                        item[field.name] = `Sample String ${Math.floor(Math.random() * 100)}`
                }
            })
            return item
        })
        setResult(JSON.stringify(data, null, 2))
    }

    const downloadJson = () => {
        if (!result) return
        const blob = new Blob([result], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "mock_data.json"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-8 max-w-5xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                            <Database className="h-8 w-8" />
                            Gerador de Dados Mock
                        </h1>
                        <p className="text-muted-foreground">
                            Gere dados JSON aleatórios para testes e protótipos
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Estrutura dos Dados</CardTitle>
                                    <Button size="sm" onClick={addField}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Adicionar Campo
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {fields.map((field) => (
                                        <div key={field.id} className="flex gap-2 items-end">
                                            <div className="space-y-1 flex-1">
                                                <Label className="text-xs">Nome do Campo</Label>
                                                <Input
                                                    value={field.name}
                                                    onChange={(e) => updateField(field.id, "name", e.target.value)}
                                                    placeholder="ex: nome"
                                                />
                                            </div>
                                            <div className="space-y-1 w-[140px]">
                                                <Label className="text-xs">Tipo</Label>
                                                <Select
                                                    value={field.type}
                                                    onValueChange={(v) => updateField(field.id, "type", v as FieldType)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="string">String</SelectItem>
                                                        <SelectItem value="number">Number</SelectItem>
                                                        <SelectItem value="boolean">Boolean</SelectItem>
                                                        <SelectItem value="email">Email</SelectItem>
                                                        <SelectItem value="name">Nome</SelectItem>
                                                        <SelectItem value="date">Data ISO</SelectItem>
                                                        <SelectItem value="uuid">UUID</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeField(field.id)}
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Configurações</CardTitle>
                                    <CardDescription>
                                        {getPlanLimitMessage(limit)}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex items-end gap-4">
                                    <div className="space-y-2 flex-1">
                                        <Label>Quantidade de Itens</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            max={limit}
                                            value={count}
                                            onChange={(e) => setCount(Number(e.target.value))}
                                        />
                                    </div>
                                    <Button onClick={generateData} className="w-full md:w-auto">
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Gerar Dados
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="h-full flex flex-col">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Resultado</CardTitle>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" onClick={downloadJson} disabled={!result}>
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        <CopyButton text={result} />
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1 min-h-[500px]">
                                    <Textarea
                                        readOnly
                                        value={result}
                                        className="font-mono h-full min-h-[500px] resize-none"
                                        placeholder="Os dados gerados aparecerão aqui..."
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Dados Mock</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Gerador de Dados Mock permite criar conjuntos de dados fictícios em formato JSON para testes de software e prototipagem.
                                Você pode definir a estrutura dos dados adicionando campos de diferentes tipos como nomes, emails, datas e números.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Os dados gerados são aleatórios e não correspondem a informações reais de pessoas ou entidades.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}

