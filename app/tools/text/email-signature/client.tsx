"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Copy, Code } from "lucide-react"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { toast } from "sonner"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export function EmailSignaturePage() {
    const [name, setName] = useState("Seu Nome")
    const [role, setRole] = useState("Seu Cargo")
    const [company, setCompany] = useState("Sua Empresa")
    const [phone, setPhone] = useState("+55 (11) 99999-9999")
    const [email, setEmail] = useState("seu.email@empresa.com")
    const [website, setWebsite] = useState("www.suaempresa.com")
    const [logoUrl, setLogoUrl] = useState("https://via.placeholder.com/100")
    const [color, setColor] = useState("#2563eb")

    const signatureRef = useRef<HTMLDivElement>(null)

    const handleCopyHtml = () => {
        if (!signatureRef.current) return
        const html = signatureRef.current.innerHTML
        navigator.clipboard.writeText(html)
        toast.success("Código HTML copiado!")
    }

    const handleCopyVisual = () => {
        if (!signatureRef.current) return

        const range = document.createRange()
        range.selectNode(signatureRef.current)
        window.getSelection()?.removeAllRanges()
        window.getSelection()?.addRange(range)
        document.execCommand('copy')
        window.getSelection()?.removeAllRanges()

        toast.success("Assinatura copiada! Cole no seu email.")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Texto e Conversão" }, { "label": "Assinatura de Email" }]} className="mb-6" />
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de Assinatura de Email</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Crie assinaturas de email profissionais e copie para o Outlook, Gmail ou Apple Mail.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Controls */}
                        <Card className="lg:col-span-1 h-fit">
                            <CardHeader>
                                <CardTitle>Informações</CardTitle>
                                <CardDescription>
                                    Preencha seus dados
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Cargo</Label>
                                    <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Empresa</Label>
                                    <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefone</Label>
                                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Site</Label>
                                    <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="logo">URL do Logo</Label>
                                    <Input id="logo" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="color">Cor Principal</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="color"
                                            type="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="w-12 p-1 h-10"
                                        />
                                        <Input
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            className="flex-1"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Preview */}
                        <Card className="lg:col-span-2">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="space-y-1">
                                    <CardTitle>Visualização</CardTitle>
                                    <CardDescription>
                                        Veja como ficará sua assinatura
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={handleCopyHtml}>
                                        <Code className="h-4 w-4 mr-2" />
                                        Copiar HTML
                                    </Button>
                                    <Button size="sm" onClick={handleCopyVisual}>
                                        <Copy className="h-4 w-4 mr-2" />
                                        Copiar Assinatura
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-white p-8 rounded-lg border min-h-[300px] flex items-center justify-center overflow-auto">
                                    {/* Signature Template */}
                                    <div ref={signatureRef} style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#333' }}>
                                        <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ paddingRight: '20px', borderRight: `2px solid ${color}` }}>
                                                        <img
                                                            src={logoUrl}
                                                            alt="Logo"
                                                            style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '50%' }}
                                                        />
                                                    </td>
                                                    <td style={{ paddingLeft: '20px' }}>
                                                        <div style={{ fontWeight: 'bold', fontSize: '18px', color: color, marginBottom: '4px' }}>
                                                            {name}
                                                        </div>
                                                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                                                            {role} | {company}
                                                        </div>
                                                        <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                                                            <div style={{ marginBottom: '2px' }}>
                                                                <span style={{ color: color, fontWeight: 'bold' }}>T:</span> {phone}
                                                            </div>
                                                            <div style={{ marginBottom: '2px' }}>
                                                                <span style={{ color: color, fontWeight: 'bold' }}>E:</span> <a href={`mailto:${email}`} style={{ color: '#333', textDecoration: 'none' }}>{email}</a>
                                                            </div>
                                                            <div>
                                                                <span style={{ color: color, fontWeight: 'bold' }}>W:</span> <a href={`https://${website}`} style={{ color: '#333', textDecoration: 'none' }}>{website}</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-4 text-center">
                                    Dica: Clique em "Copiar Assinatura" e cole diretamente nas configurações do seu email (Gmail, Outlook, etc).
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Assinatura</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <p>
                                O Gerador de Assinatura de Email cria assinaturas profissionais e personalizadas para seus emails.
                                Compatível com Gmail, Outlook, Apple Mail e outros clientes, ele permite adicionar logo, links sociais e informações de contato com um design limpo e moderno.
                            </p>
                            <p className="text-sm text-muted-foreground mt-4">
                                <strong>Nota:</strong> As imagens devem estar hospedadas publicamente para aparecerem corretamente nos emails dos destinatários.
                            </p>
                            <div className="pt-4 border-t mt-4">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Assinatura"
                                    description="Crie assinaturas de email profissionais e gratuitas."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="email-signature" category="text" />
                </div>
            </main>
        </div>
    )
}
