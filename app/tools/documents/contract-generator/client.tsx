"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { FileText, Download, Copy, Check } from "lucide-react"
import { CONTRACT_TEMPLATES } from "@/lib/templates/contracts"
import jsPDF from "jspdf"
import { toast } from "sonner"
import { ShareButtons } from "@/components/share-buttons"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export function ContractGeneratorPage() {
    const [selectedTemplateId, setSelectedTemplateId] = useState(CONTRACT_TEMPLATES[0].id)
    const [formData, setFormData] = useState<Record<string, string>>({})
    const [copied, setCopied] = useState(false)

    const selectedTemplate = CONTRACT_TEMPLATES.find(t => t.id === selectedTemplateId) || CONTRACT_TEMPLATES[0]

    const handleInputChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const generateContent = () => {
        let content = selectedTemplate.content
        selectedTemplate.fields.forEach(field => {
            const value = formData[field.id] || `[${field.label}]`
            // Replace all occurrences
            content = content.split(`{{${field.id}}}`).join(value)
        })
        return content
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(generateContent())
        setCopied(true)
        toast.success("Contrato copiado para a área de transferência")
        setTimeout(() => setCopied(false), 2000)
    }

    const handleDownloadPDF = () => {
        const doc = new jsPDF()
        const content = generateContent()

        // Split text to fit page
        const splitText = doc.splitTextToSize(content, 180)

        doc.setFontSize(12)
        doc.text(splitText, 15, 20)
        doc.save(`${selectedTemplate.name}.pdf`)
        toast.success("PDF baixado com sucesso")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <Breadcrumbs items={[{"label":"Ferramentas"},{"label":"Documentos"},{"label":"Contratos"}]} className="mb-6" />
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de Contratos</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Crie contratos personalizados a partir de modelos pré-definidos.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Controls */}
                        <Card className="lg:col-span-1 h-fit">
                            <CardHeader>
                                <CardTitle>Configuração</CardTitle>
                                <CardDescription>
                                    Escolha o modelo e preencha os dados
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="template">Modelo de Contrato</Label>
                                    <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione um modelo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CONTRACT_TEMPLATES.map(template => (
                                                <SelectItem key={template.id} value={template.id}>
                                                    {template.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    {selectedTemplate.fields.map(field => (
                                        <div key={field.id} className="space-y-2">
                                            <Label htmlFor={field.id}>{field.label}</Label>
                                            <Input
                                                id={field.id}
                                                value={formData[field.id] || ""}
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                placeholder={`Digite ${field.label.toLowerCase()}...`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Preview */}
                        <Card className="lg:col-span-2">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="space-y-1">
                                    <CardTitle>Visualização</CardTitle>
                                    <CardDescription>
                                        Revise o contrato antes de exportar
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={handleCopy}>
                                        {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                        Copiar
                                    </Button>
                                    <Button size="sm" onClick={handleDownloadPDF}>
                                        <Download className="h-4 w-4 mr-2" />
                                        Baixar PDF
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-muted/30 p-8 rounded-lg border min-h-[600px] font-mono text-sm whitespace-pre-wrap">
                                    {generateContent()}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Contratos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <p>
                                    O Gerador de Contratos oferece modelos pré-definidos para situações comuns, como prestação de serviços e locação.
                                    Preencha os campos variáveis e gere um documento PDF ou copie o texto para seu editor preferido.
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Nota:</strong> Estes modelos servem como base e não substituem a consultoria jurídica de um advogado. Revise sempre o conteúdo antes de assinar.
                                </p>
                            </div>
                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Contratos"
                                    description="Crie contratos personalizados a partir de modelos pré-definidos."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

        </div>
    )
}
