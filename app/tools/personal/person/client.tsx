'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/navbar'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ToolResult } from '@/components/tools/tool-result'
import { RefreshCw, Copy, Check } from 'lucide-react'
import { generatePerson, Person } from '@/lib/utils/validators/person'
import { toast } from 'sonner'
import { ShareButtons } from "@/components/share-buttons"
import { Label } from "@/components/ui/label"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

const Field = ({ label, value }: { label: string; value: string }) => {
    const [hasCopied, setHasCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        toast.success(`${label} copiado!`)
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), 2000)
    }

    return (
        <div className="flex flex-col space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
            <div className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 text-sm">
                <span className="font-mono truncate mr-2">{value}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0 hover:bg-background"
                    onClick={handleCopy}
                >
                    {hasCopied ? (
                        <Check className="h-3 w-3 text-green-500" />
                    ) : (
                        <Copy className="h-3 w-3 text-muted-foreground" />
                    )}
                </Button>
            </div>
        </div>
    )
}

export function PersonGeneratorPage() {
    const [person, setPerson] = useState<Person | null>(null)

    const handleGenerate = () => {
        setPerson(generatePerson())
    }

    useEffect(() => {
        if (!person) {
            setTimeout(() => handleGenerate(), 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Dados Pessoais" }, { "label": "Pessoa Completa" }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">Gerador de Pessoa Completa</h1>
                        <p className="text-lg text-muted-foreground">
                            Gere dados pessoais completos para testes, incluindo documentos, endereço e contatos.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-[300px_1fr]">
                        {/* Controls */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Opções</CardTitle>
                                    <CardDescription>Clique para gerar um novo perfil</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button onClick={handleGenerate} className="w-full" size="lg">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Gerar Nova Pessoa
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Quick JSON Export */}
                            {person && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>JSON</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ToolResult
                                            result={JSON.stringify(person, null, 2)}
                                            toolId="person"
                                            toolName="Gerador de Pessoa"
                                            successMessage="JSON copiado com sucesso"
                                        />
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Results */}
                        <div className="space-y-6">
                            {person ? (
                                <div className="grid gap-6">
                                    {/* Identity */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Identidade</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4 sm:grid-cols-2">
                                            <Field label="Nome Completo" value={person.name} />
                                            <Field label="Sexo" value={person.gender} />
                                            <Field label="Data de Nascimento" value={person.birthDate} />
                                            <Field label="Idade" value={`${person.age} anos`} />
                                            <Field label="Signo" value={person.sign} />
                                            <Field label="Nome da Mãe" value={person.mother} />
                                            <Field label="Nome do Pai" value={person.father} />
                                        </CardContent>
                                    </Card>

                                    {/* Documents */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Documentos</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4 sm:grid-cols-2">
                                            <Field label="CPF" value={person.cpf} />
                                            <Field label="RG" value={person.rg} />
                                        </CardContent>
                                    </Card>

                                    {/* Contact */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Contato e Acesso</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4 sm:grid-cols-2">
                                            <Field label="Email" value={person.email} />
                                            <Field label="Senha" value={person.password} />
                                            <Field label="Celular" value={person.mobile} />
                                            <Field label="Telefone Fixo" value={person.phone} />
                                        </CardContent>
                                    </Card>

                                    {/* Physical */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Características Físicas</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4 sm:grid-cols-3">
                                            <Field label="Altura" value={person.height} />
                                            <Field label="Peso" value={person.weight} />
                                            <Field label="Tipo Sanguíneo" value={person.bloodType} />
                                        </CardContent>
                                    </Card>

                                    {/* Address */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Endereço</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4">
                                            <div className="grid gap-4 sm:grid-cols-[1fr_100px]">
                                                <Field label="Logradouro" value={person.address.street} />
                                                <Field label="Número" value={person.address.number.toString()} />
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <Field label="Bairro" value={person.address.neighborhood} />
                                                <Field label="CEP" value={person.address.zipCode} />
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-[1fr_80px]">
                                                <Field label="Cidade" value={person.address.city} />
                                                <Field label="Estado" value={person.address.state} />
                                            </div>
                                            <Field label="Endereço Completo" value={`${person.address.street}, ${person.address.number} - ${person.address.neighborhood}, ${person.address.city} - ${person.address.state}, ${person.address.zipCode}`} />
                                        </CardContent>
                                    </Card>
                                </div>
                            ) : (
                                <Card className="border-dashed">
                                    <CardContent className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                                        <div className="mb-4 rounded-full bg-muted p-4">
                                            <RefreshCw className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-lg font-semibold">Nenhum perfil gerado</h3>
                                        <p className="mb-4 max-w-sm text-sm">
                                            Clique no botão &quot;Gerar Nova Pessoa&quot; para criar um perfil completo com dados aleatórios válidos.
                                        </p>
                                        <Button onClick={handleGenerate}>Gerar Agora</Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Pessoa</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Gerador de Pessoa cria um perfil fictício completo, incluindo dados pessoais (nome, CPF, RG, data de nascimento), contato (email, telefone), endereço e até características físicas.
                                É a ferramenta ideal para popular bancos de dados de teste com dados realistas.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> Todos os documentos gerados (CPF, RG) são válidos algoritmicamente, mas não pertencem a pessoas reais. O uso é estritamente para fins de teste e desenvolvimento.
                            </p>
                            <div className="pt-4 border-t mt-4">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Pessoa"
                                    description="Gere dados pessoais completos para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>


        </div>
    )
}
