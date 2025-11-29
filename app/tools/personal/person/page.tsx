'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ToolResult } from '@/components/tools/tool-result'
import { RefreshCw, Copy, Check } from 'lucide-react'
import { generatePerson, Person } from '@/lib/utils/validators/person'
import { toast } from 'sonner'

export default function PersonGeneratorPage() {
    const [person, setPerson] = useState<Person | null>(null)
    const [copiedField, setCopiedField] = useState<string | null>(null)

    const handleGenerate = () => {
        setPerson(generatePerson())
    }

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text)
        setCopiedField(field)
        toast.success(`${field} copiado!`)
        setTimeout(() => setCopiedField(null), 2000)
    }

    const Field = ({ label, value, id }: { label: string; value: string; id: string }) => (
        <div className="flex flex-col space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
            <div className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 text-sm">
                <span className="font-mono truncate mr-2">{value}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0 hover:bg-background"
                    onClick={() => copyToClipboard(value, label)}
                >
                    {copiedField === label ? (
                        <Check className="h-3 w-3 text-green-500" />
                    ) : (
                        <Copy className="h-3 w-3 text-muted-foreground" />
                    )}
                </Button>
            </div>
        </div>
    )

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    {/* Header */}
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
                                            <Field label="Nome Completo" value={person.name} id="name" />
                                            <Field label="Sexo" value={person.gender} id="gender" />
                                            <Field label="Data de Nascimento" value={person.birthDate} id="birthDate" />
                                            <Field label="Idade" value={`${person.age} anos`} id="age" />
                                            <Field label="Signo" value={person.sign} id="sign" />
                                            <Field label="Nome da Mãe" value={person.mother} id="mother" />
                                            <Field label="Nome do Pai" value={person.father} id="father" />
                                        </CardContent>
                                    </Card>

                                    {/* Documents */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Documentos</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4 sm:grid-cols-2">
                                            <Field label="CPF" value={person.cpf} id="cpf" />
                                            <Field label="RG" value={person.rg} id="rg" />
                                        </CardContent>
                                    </Card>

                                    {/* Contact */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Contato e Acesso</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4 sm:grid-cols-2">
                                            <Field label="Email" value={person.email} id="email" />
                                            <Field label="Senha" value={person.password} id="password" />
                                            <Field label="Celular" value={person.mobile} id="mobile" />
                                            <Field label="Telefone Fixo" value={person.phone} id="phone" />
                                        </CardContent>
                                    </Card>

                                    {/* Physical */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Características Físicas</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4 sm:grid-cols-3">
                                            <Field label="Altura" value={person.height} id="height" />
                                            <Field label="Peso" value={person.weight} id="weight" />
                                            <Field label="Tipo Sanguíneo" value={person.bloodType} id="bloodType" />
                                        </CardContent>
                                    </Card>

                                    {/* Address */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Endereço</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4">
                                            <div className="grid gap-4 sm:grid-cols-[1fr_100px]">
                                                <Field label="Logradouro" value={person.address.street} id="street" />
                                                <Field label="Número" value={person.address.number.toString()} id="number" />
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <Field label="Bairro" value={person.address.neighborhood} id="neighborhood" />
                                                <Field label="CEP" value={person.address.zipCode} id="zipCode" />
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-[1fr_80px]">
                                                <Field label="Cidade" value={person.address.city} id="city" />
                                                <Field label="Estado" value={person.address.state} id="state" />
                                            </div>
                                            <Field label="Endereço Completo" value={`${person.address.street}, ${person.address.number} - ${person.address.neighborhood}, ${person.address.city} - ${person.address.state}, ${person.address.zipCode}`} id="fullAddress" />
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
                                            Clique no botão "Gerar Nova Pessoa" para criar um perfil completo com dados aleatórios válidos.
                                        </p>
                                        <Button onClick={handleGenerate}>Gerar Agora</Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
