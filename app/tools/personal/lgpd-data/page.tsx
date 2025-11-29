"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, RefreshCw, Copy, EyeOff } from "lucide-react"
import { generateCPF, formatCPF } from "@/lib/utils/validators/cpf"
import { toast } from "sonner"

export default function LGPDDataPage() {
    const [activeTab, setActiveTab] = useState<'generate' | 'anonymize'>('generate')

    // Generator State
    const [fakeData, setFakeData] = useState<any>(null)

    // Anonymizer State
    const [inputText, setInputText] = useState("")
    const [anonymizedText, setAnonymizedText] = useState("")

    const generateData = () => {
        const firstNames = ["João", "Maria", "Pedro", "Ana", "Lucas", "Julia", "Carlos", "Fernanda"]
        const lastNames = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Almeida"]

        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        const fullName = `${firstName} ${lastName}`
        const cpf = formatCPF(generateCPF())
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@exemplo.com`

        setFakeData({
            name: fullName,
            cpf: cpf,
            email: email,
            phone: `(11) 9${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            address: `Rua Exemplo, ${Math.floor(Math.random() * 1000)}, São Paulo - SP`
        })
    }

    const anonymizeData = () => {
        let text = inputText

        // Mask CPF (xxx.xxx.xxx-xx)
        text = text.replace(/\d{3}\.\d{3}\.\d{3}-\d{2}/g, "***.***.***-**")
        // Mask CPF (plain)
        text = text.replace(/\d{11}/g, "***********")

        // Mask Email
        text = text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, (match) => {
            const [user, domain] = match.split('@')
            return `${user.substring(0, 2)}***@${domain}`
        })

        // Mask Phone
        text = text.replace(/\(\d{2}\)\s\d{4,5}-\d{4}/g, "(**) *****-****")

        setAnonymizedText(text)
        toast.success("Dados anonimizados!")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Ferramentas LGPD</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gere dados fictícios para testes ou anonimize dados reais para conformidade com a LGPD.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-2 mb-6">
                        <Button
                            variant={activeTab === 'generate' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('generate')}
                        >
                            Gerar Dados Fictícios
                        </Button>
                        <Button
                            variant={activeTab === 'anonymize' ? 'default' : 'outline'}
                            onClick={() => setActiveTab('anonymize')}
                        >
                            Anonimizar Dados
                        </Button>
                    </div>

                    {activeTab === 'generate' ? (
                        <div className="grid gap-8 lg:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gerador de Dados</CardTitle>
                                    <CardDescription>
                                        Gere um perfil completo de dados fictícios
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button onClick={generateData} className="w-full mb-6" size="lg">
                                        <RefreshCw className="mr-2 h-4 w-4" /> Gerar Novo Perfil
                                    </Button>

                                    {fakeData && (
                                        <div className="space-y-4">
                                            {Object.entries(fakeData).map(([key, value]) => (
                                                <div key={key} className="space-y-1">
                                                    <Label className="capitalize">{key}</Label>
                                                    <div className="flex gap-2">
                                                        <Input value={value as string} readOnly />
                                                        <Button variant="outline" size="icon" onClick={() => {
                                                            navigator.clipboard.writeText(value as string)
                                                            toast.success("Copiado!")
                                                        }}>
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Entrada</CardTitle>
                                    <CardDescription>
                                        Cole o texto contendo dados sensíveis
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        placeholder="Cole aqui um texto com CPFs, emails ou telefones..."
                                        className="min-h-[300px]"
                                    />
                                    <Button onClick={anonymizeData} className="w-full mt-4">
                                        <EyeOff className="mr-2 h-4 w-4" /> Anonimizar
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Saída</CardTitle>
                                    <CardDescription>
                                        Texto com dados sensíveis mascarados
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        value={anonymizedText}
                                        readOnly
                                        className="min-h-[300px] bg-muted"
                                        placeholder="O resultado aparecerá aqui..."
                                    />
                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(anonymizedText)
                                            toast.success("Copiado!")
                                        }}
                                        variant="outline"
                                        className="w-full mt-4"
                                        disabled={!anonymizedText}
                                    >
                                        <Copy className="mr-2 h-4 w-4" /> Copiar Resultado
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}
