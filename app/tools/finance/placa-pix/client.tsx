"use client"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { QrCode, FileText, Image as ImageIcon, Sparkles, Instagram, Phone } from "lucide-react"
import { toast } from "sonner"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { toPng } from "html-to-image"
import jsPDF from "jspdf"
import QRCode from "qrcode"

// Helper to calculate CRC16 CCITT standard
function calculateCRC16(data: string): string {
    let crc = 0xFFFF
    const polynomial = 0x1021
    for (let i = 0; i < data.length; i++) {
        const b = data.charCodeAt(i)
        for (let j = 0; j < 8; j++) {
            const bit = ((b >> (7 - j)) & 1) === 1
            const c15 = ((crc >> 15) & 1) === 1
            crc <<= 1
            if (c15 !== bit) {
                crc ^= polynomial
            }
        }
    }
    crc &= 0xFFFF
    return crc.toString(16).toUpperCase().padStart(4, "0")
}

// Remove accents and special characters
function cleanString(str: string): string {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Za-z0-9 ]/g, "")
        .toUpperCase()
}

// Clean key based on type
function cleanPixKey(key: string, tipo: string): string {
    const trimmed = key.trim()
    if (tipo === "cpf" || tipo === "cnpj") {
        return trimmed.replace(/\D/g, "")
    }
    if (tipo === "telefone") {
        let clean = trimmed.replace(/\D/g, "")
        // If it has 11 digits (DDD + number), prepend 55 (Brazil)
        if (clean.length === 11 && !clean.startsWith("55")) {
            clean = "55" + clean
        }
        // Ensure it starts with '+'
        if (!clean.startsWith("+")) {
            clean = "+" + clean
        }
        return clean
    }
    return trimmed
}

export function PixPlatePage() {
    // Form States
    const [chave, setChave] = useState("")
    const [chaveTipo, setChaveTipo] = useState<"cpf" | "cnpj" | "email" | "telefone" | "aleatoria">("cpf")
    const [nome, setNome] = useState("")
    const [cidade, setCidade] = useState("")
    const [valor, setValor] = useState("")
    const [txid, setTxid] = useState("")
    const [template, setTemplate] = useState<"classic" | "minimalist-light" | "minimalist-dark" | "gradient">("classic")
    const [instagram, setInstagram] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [instrucoes, setInstrucoes] = useState("Escaneie o QR Code acima para realizar o pagamento")
    const [logoUrl, setLogoUrl] = useState<string | null>(null)
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState("")

    const plateRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Update QR Code on field changes
    useEffect(() => {
        const generatePixString = (): string => {
            if (!chave || !nome || !cidade) return ""

            const cleanedKey = cleanPixKey(chave, chaveTipo)
            const cleanedNome = cleanString(nome).substring(0, 25).trim()
            const cleanedCidade = cleanString(cidade).substring(0, 15).trim()
            const cleanedTxid = txid ? cleanString(txid).substring(0, 25).trim() : "***"
            const numValor = parseFloat(valor)

            let payload = "000201"

            // Tag 26 (Merchant Account Information)
            const sub00 = "0014br.gov.bcb.pix"
            const sub01 = "01" + cleanedKey.length.toString().padStart(2, "0") + cleanedKey
            const tag26Val = sub00 + sub01
            payload += "26" + tag26Val.length.toString().padStart(2, "0") + tag26Val

            // Tag 52 (Merchant Category Code)
            payload += "52040000"

            // Tag 53 (Currency BRL = 986)
            payload += "5303986"

            // Tag 54 (Amount - optional)
            if (!isNaN(numValor) && numValor > 0) {
                const valorStr = numValor.toFixed(2)
                payload += "54" + valorStr.length.toString().padStart(2, "0") + valorStr
            }

            // Tag 58 (Country Code)
            payload += "5802BR"

            // Tag 59 (Merchant Name)
            payload += "59" + cleanedNome.length.toString().padStart(2, "0") + cleanedNome

            // Tag 60 (Merchant City)
            payload += "60" + cleanedCidade.length.toString().padStart(2, "0") + cleanedCidade

            // Tag 62 (Additional Data Field)
            const sub05 = "05" + cleanedTxid.length.toString().padStart(2, "0") + cleanedTxid
            payload += "62" + sub05.length.toString().padStart(2, "0") + sub05

            // Tag 63 (CRC16)
            payload += "6304"
            const crc = calculateCRC16(payload)
            payload += crc

            return payload
        }

        const pixStr = generatePixString()
        if (pixStr) {
            QRCode.toDataURL(
                pixStr,
                {
                    width: 300,
                    margin: 1,
                    color: {
                        dark: "#090d16",
                        light: "#ffffff"
                    }
                },
                (err, url) => {
                    if (err) {
                        console.error("Erro ao gerar QR Code", err)
                    } else {
                        setQrCodeDataUrl(url)
                    }
                }
            )
        } else {
            Promise.resolve().then(() => setQrCodeDataUrl(""))
        }
    }, [chave, chaveTipo, nome, cidade, valor, txid])

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            if (event.target?.result) {
                setLogoUrl(event.target.result as string)
                toast.success("Logotipo carregado com sucesso!")
            }
        }
        reader.readAsDataURL(file)
    }

    const removeLogo = () => {
        setLogoUrl(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
        toast.info("Logotipo removido")
    }

    const handleDownloadImage = async () => {
        if (!plateRef.current) {
            toast.error("Preencha os dados obrigatórios para gerar a placa")
            return
        }

        try {
            const dataUrl = await toPng(plateRef.current, { pixelRatio: 3, style: { transform: 'scale(1)', transformOrigin: 'top left' } })
            const link = document.createElement("a")
            link.download = `placa-pix-${cleanString(nome || "recebedor").toLowerCase().replace(/\s+/g, "-")}.png`
            link.href = dataUrl
            link.click()
            toast.success("Imagem PNG baixada com sucesso!")
        } catch (error) {
            console.error("Erro ao exportar imagem:", error)
            toast.error("Ocorreu um erro ao gerar a imagem.")
        }
    }

    const handleDownloadPDF = async () => {
        if (!plateRef.current) {
            toast.error("Preencha os dados obrigatórios para gerar a placa")
            return
        }

        try {
            // Render at high resolution
            const dataUrl = await toPng(plateRef.current, { pixelRatio: 3, style: { transform: 'scale(1)', transformOrigin: 'top left' } })
            
            // Create PDF in A4 format (vertical: 210mm x 297mm)
            const pdf = new jsPDF("p", "mm", "a4")
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()

            pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight)
            pdf.save(`placa-pix-${cleanString(nome || "recebedor").toLowerCase().replace(/\s+/g, "-")}.pdf`)
            toast.success("PDF pronto para impressão baixado com sucesso!")
        } catch (error) {
            console.error("Erro ao exportar PDF:", error)
            toast.error("Ocorreu um erro ao gerar o PDF.")
        }
    }

    const hasRequiredFields = chave && nome && cidade

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    {/* Breadcrumbs */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Dados Financeiros" }, { "label": "Placa Pix" }]} className="mb-6" />
                    
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <QrCode className="h-8 w-8 text-emerald-500" />
                            <h1 className="text-4xl font-bold">Gerador de Placa Pix de Balcão</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Crie e imprima gratuitamente placas personalizadas com seu QR Code Pix, logotipo e contatos para o seu comércio.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-12 items-start">
                        {/* Editor Form - 5 Columns */}
                        <div className="lg:col-span-5 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>1. Dados do Pix</CardTitle>
                                    <CardDescription>Insira as informações da sua conta Pix</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2 space-y-2">
                                            <Label>Tipo de Chave</Label>
                                            <Select value={chaveTipo} onValueChange={(val: "cpf" | "cnpj" | "email" | "telefone" | "aleatoria") => setChaveTipo(val)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o tipo" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cpf">CPF</SelectItem>
                                                    <SelectItem value="cnpj">CNPJ</SelectItem>
                                                    <SelectItem value="email">E-mail</SelectItem>
                                                    <SelectItem value="telefone">Celular</SelectItem>
                                                    <SelectItem value="aleatoria">Chave Aleatória (EVP)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <Label>Chave Pix *</Label>
                                            <Input
                                                placeholder={
                                                    chaveTipo === "cpf" ? "000.000.000-00" :
                                                    chaveTipo === "cnpj" ? "00.000.000/0000-00" :
                                                    chaveTipo === "telefone" ? "+55 (11) 99999-9999" :
                                                    chaveTipo === "email" ? "seuemail@provedor.com" : "Chave EVP de 36 caracteres"
                                                }
                                                value={chave}
                                                onChange={(e) => setChave(e.target.value)}
                                            />
                                            {chaveTipo === "telefone" && (
                                                <p className="text-xs text-muted-foreground">Insira DDD + número. O sistema adicionará o +55 automaticamente.</p>
                                            )}
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <Label>Nome do Recebedor *</Label>
                                            <Input
                                                placeholder="Ex: Nome da Loja ou Seu Nome"
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                                maxLength={25}
                                            />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <Label>Cidade do Recebedor *</Label>
                                            <Input
                                                placeholder="Ex: Sao Paulo"
                                                value={cidade}
                                                onChange={(e) => setCidade(e.target.value)}
                                                maxLength={15}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Valor Opcional (R$)</Label>
                                            <Input
                                                type="number"
                                                placeholder="Ex: 50.00 (opcional)"
                                                value={valor}
                                                onChange={(e) => setValor(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Identificador (txid)</Label>
                                            <Input
                                                placeholder="Ex: LOJA01 (opcional)"
                                                value={txid}
                                                onChange={(e) => setTxid(e.target.value)}
                                                maxLength={25}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>2. Personalização</CardTitle>
                                    <CardDescription>Configure o estilo visual da placa</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Tema Visual</Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Button
                                                type="button"
                                                variant={template === "classic" ? "default" : "outline"}
                                                onClick={() => setTemplate("classic")}
                                                className="justify-start text-xs"
                                            >
                                                🎨 Clássico Pix
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={template === "gradient" ? "default" : "outline"}
                                                onClick={() => setTemplate("gradient")}
                                                className="justify-start text-xs"
                                            >
                                                ✨ Degradê Premium
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={template === "minimalist-light" ? "default" : "outline"}
                                                onClick={() => setTemplate("minimalist-light")}
                                                className="justify-start text-xs"
                                            >
                                                ⚪ Minimalista Claro
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={template === "minimalist-dark" ? "default" : "outline"}
                                                onClick={() => setTemplate("minimalist-dark")}
                                                className="justify-start text-xs"
                                            >
                                                ⚫ Minimalista Escuro
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Logotipo da Loja (opcional)</Label>
                                        <div className="flex gap-2 items-center">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoUpload}
                                                ref={fileInputRef}
                                                className="cursor-pointer text-xs"
                                            />
                                            {logoUrl && (
                                                <Button type="button" variant="destructive" size="sm" onClick={removeLogo}>
                                                    Remover
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Instagram (opcional)</Label>
                                            <Input
                                                placeholder="@sualoja"
                                                value={instagram}
                                                onChange={(e) => setInstagram(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>WhatsApp (opcional)</Label>
                                            <Input
                                                placeholder="(11) 99999-9999"
                                                value={whatsapp}
                                                onChange={(e) => setWhatsapp(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Instruções / Nota de Rodapé</Label>
                                        <Textarea
                                            value={instrucoes}
                                            onChange={(e) => setInstrucoes(e.target.value)}
                                            placeholder="Instruções para o pagador"
                                            rows={2}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    onClick={handleDownloadPDF}
                                    disabled={!hasRequiredFields}
                                    variant="default"
                                    size="lg"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                    <FileText className="mr-2 h-5 w-5" />
                                    Baixar PDF (Imprimir)
                                </Button>
                                <Button
                                    onClick={handleDownloadImage}
                                    disabled={!hasRequiredFields}
                                    variant="outline"
                                    size="lg"
                                    className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                                >
                                    <ImageIcon className="mr-2 h-5 w-5" />
                                    Baixar Imagem (PNG)
                                </Button>
                            </div>
                        </div>

                        {/* Live Preview Pane - 7 Columns */}
                        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-muted/30 rounded-xl border border-dashed min-h-[600px]">
                            <Label className="text-sm font-semibold mb-4 text-muted-foreground flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-amber-500" />
                                Visualização da Placa (Proporção de Impressão A4)
                            </Label>

                            {hasRequiredFields ? (
                                <div className="shadow-2xl rounded-2xl overflow-hidden border bg-white dark:bg-slate-900 transform scale-90 sm:scale-100 transition-transform duration-200">
                                    {/* Outer Container formatted as an A4 page proportion (approx. 396px x 560px) */}
                                    <div
                                        ref={plateRef}
                                        id="pix-plate-preview"
                                        className={`w-[396px] h-[560px] relative flex flex-col items-center justify-between p-6 select-none bg-white text-black font-sans
                                            ${template === "classic" ? "border-[10px] border-emerald-500" : ""}
                                            ${template === "gradient" ? "bg-gradient-to-br from-indigo-900 via-slate-900 to-emerald-950 text-white" : ""}
                                            ${template === "minimalist-dark" ? "bg-slate-950 text-white border-2 border-slate-800" : ""}
                                            ${template === "minimalist-light" ? "bg-white text-slate-900 border-2 border-slate-200" : ""}
                                        `}
                                    >
                                        {/* Header Diamond Decor for Classic Pix */}
                                        {template === "classic" && (
                                            <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-teal-400 to-emerald-500" />
                                        )}

                                        {/* Top Logo Section */}
                                        <div className="w-full flex flex-col items-center mt-2">
                                            {logoUrl ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img src={logoUrl} alt="Logo" className="max-h-12 max-w-[150px] object-contain mb-3" />
                                            ) : (
                                                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full mb-3
                                                    ${template === "gradient" ? "bg-white/10 text-emerald-400" : "bg-emerald-500/10 text-emerald-600"}
                                                `}>
                                                    <svg viewBox="0 0 512 512" className="w-6 h-6 fill-current">
                                                        <path d="M256 0L0 256l256 256 256-256L256 0zm0 85.3L426.7 256 256 426.7 85.3 256 256 85.3z" />
                                                        <path d="M256 128l-128 128 128 128 128-128-128-128zm0 53.3L322.7 256 256 322.7 189.3 256 256 181.3z" />
                                                    </svg>
                                                    <span className="font-extrabold tracking-wider text-sm">pix</span>
                                                </div>
                                            )}
                                            
                                            <h2 className={`text-xl font-extrabold uppercase tracking-wide text-center
                                                ${template === "gradient" ? "text-emerald-300" : "text-slate-900 dark:text-white"}
                                                ${template === "classic" ? "text-emerald-600" : ""}
                                            `}>
                                                Pague com Pix
                                            </h2>
                                        </div>

                                        {/* QR Code Container */}
                                        <div className={`p-4 rounded-2xl shadow-md flex items-center justify-center relative
                                            ${template === "gradient" ? "bg-white/5 backdrop-blur-md border border-white/10" : "bg-slate-50 border border-slate-100"}
                                            ${template === "minimalist-dark" ? "bg-slate-900 border border-slate-800" : ""}
                                            ${template === "minimalist-light" ? "bg-slate-50 border border-slate-100" : ""}
                                        `}>
                                            {qrCodeDataUrl ? (
                                                <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={qrCodeDataUrl} alt="QR Code" className="w-44 h-44 object-contain" />
                                                </div>
                                            ) : (
                                                <div className="w-44 h-44 flex flex-col items-center justify-center text-muted-foreground bg-white rounded-xl">
                                                    <QrCode className="h-10 w-10 animate-pulse opacity-50" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Pix Account details */}
                                        <div className="w-full space-y-2.5 text-center px-4">
                                            {valor && parseFloat(valor) > 0 && (
                                                <div className="mb-2">
                                                    <span className="text-xs uppercase tracking-wider text-muted-foreground block font-bold">Valor</span>
                                                    <span className={`text-2xl font-black
                                                        ${template === "gradient" ? "text-emerald-400" : "text-emerald-600 dark:text-emerald-400"}
                                                    `}>
                                                        {parseFloat(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                                    </span>
                                                </div>
                                            )}

                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">Beneficiário</span>
                                                <span className={`font-bold block truncate max-w-[320px] text-sm
                                                    ${template === "gradient" || template === "minimalist-dark" ? "text-white" : "text-slate-800"}
                                                `}>
                                                    {cleanString(nome)}
                                                </span>
                                            </div>

                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold block">Chave Pix</span>
                                                <span className={`font-mono text-xs block break-all font-semibold max-w-[300px] mx-auto
                                                    ${template === "gradient" || template === "minimalist-dark" ? "text-slate-300" : "text-slate-700"}
                                                `}>
                                                    {chave}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Footer - Contacts & Instructions */}
                                        <div className="w-full pt-4 border-t border-slate-100 dark:border-white/10 text-center">
                                            {instrucoes && (
                                                <p className="text-[10px] text-muted-foreground leading-tight max-w-[280px] mx-auto mb-2 font-medium">
                                                    {instrucoes}
                                                </p>
                                            )}

                                            {/* Social Medias */}
                                            {(instagram || whatsapp) && (
                                                <div className="flex justify-center items-center gap-4 text-xs font-semibold">
                                                    {instagram && (
                                                        <div className="flex items-center gap-1 text-[10px]">
                                                            <Instagram className="h-3 w-3 text-pink-500" />
                                                            <span className={template === "gradient" || template === "minimalist-dark" ? "text-slate-300" : "text-slate-700"}>
                                                                {instagram.startsWith("@") ? instagram : `@${instagram}`}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {whatsapp && (
                                                        <div className="flex items-center gap-1 text-[10px]">
                                                            <Phone className="h-3 w-3 text-emerald-500" />
                                                            <span className={template === "gradient" || template === "minimalist-dark" ? "text-slate-300" : "text-slate-700"}>
                                                                {whatsapp}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center space-y-4 max-w-sm">
                                    <QrCode className="h-16 w-16 text-muted-foreground opacity-20 mx-auto" />
                                    <p className="text-sm text-muted-foreground font-semibold">
                                        Preencha a chave Pix, o nome e a cidade do recebedor nos campos obrigatórios para visualizar o design da placa.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* About section / SEO text block */}
                    <Card className="mt-12">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Placa Pix de Balcão</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                            <p>
                                O **Gerador de Placa Pix** é uma ferramenta gratuita desenvolvida para ajudar pequenos empreendedores, autônomos, lojistas e estabelecimentos comerciais a gerarem placas de balcão ou displays para recebimento de Pix.
                            </p>
                            <p>
                                Com a nossa ferramenta, você digita os dados da sua conta Pix (Chave Pix, Nome e Cidade) e nós geramos o código estático em conformidade com o padrão oficial de arranjos de pagamento definido pelo **Banco Central do Brasil**. O QR Code é calculado em tempo real para permitir que qualquer aplicativo de banco escaneie o código e carregue seus dados automaticamente para pagamento rápido.
                            </p>
                            
                            <h3 className="font-bold text-slate-800 dark:text-slate-200 mt-6">Dúvidas Frequentes sobre a Placa Pix:</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    **Como imprimir a Placa Pix?**
                                    O formato ideal para impressão física é o **PDF**. Ele é exportado exatamente nas proporções de uma folha A4 e pode ser impresso em papel comum, papel fotográfico ou couchê para colocar em porta-retratos ou displays de acrílico no seu caixa.
                                </li>
                                <li>
                                    **Posso colocar o logotipo da minha empresa?**
                                    Sim. A ferramenta permite o upload de arquivos de imagem locais (PNG, JPG, SVG) para renderizar o logotipo do seu negócio no topo da placa Pix, mantendo a identidade visual da sua marca.
                                </li>
                                <li>
                                    **Quais tipos de chaves são aceitas?**
                                    A ferramenta é compatível com todos os formatos de chaves Pix: CPF, CNPJ, E-mail, Celular (telefone) e chaves aleatórias geradas pelo banco.
                                </li>
                                <li>
                                    **O QR Code Pix expira?**
                                    Não. O código gerado é um Pix Estático sem data de validade definida. Ele funcionará de forma permanente para receber transferências enquanto a chave Pix inserida estiver ativa no seu banco.
                                </li>
                            </ul>
                            
                            <div className="pt-4 border-t space-y-4 mt-6">
                                <div>
                                    <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                    <ShareButtons
                                        title="Gerador de Placa Pix de Balcão"
                                        description="Crie e imprima gratuitamente placas personalizadas com seu QR Code Pix."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <RelatedTools currentToolSlug="placa-pix" category="financial" />
                </div>
            </main>
        </div>
    )
}
