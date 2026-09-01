"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CopyButton } from "@/components/copy-button"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"
import { generateQRCode } from "@/lib/utils/generators/qrcode"
import { sendGTMEvent } from "@/lib/gtm"
import { toast } from "sonner"
import { 
    MessageSquare, 
    ExternalLink, 
    QrCode, 
    Download, 
    Copy, 
    Sparkles, 
    Phone, 
    Check, 
    ArrowRight,
    Smile,
    FileCode,
    Smartphone
} from "lucide-react"
import Link from "next/link"

const PRESET_MESSAGES = [
    { label: "Comercial / Vendas", text: "Olá! Gostaria de mais informações sobre seus serviços/produtos." },
    { label: "Suporte Técnico", text: "Olá! Preciso de ajuda com o meu pedido/sistema." },
    { label: "Agendamento", text: "Olá! Gostaria de consultar a disponibilidade para agendar um horário." },
    { label: "Orçamento", text: "Olá! Tenho interesse em solicitar uma proposta de orçamento." }
]

const EMOJIS = ["👋", "🚀", "💬", "🛒", "📅", "🏷️", "✨", "✅", "📍", "💡"]

const CODE_EXAMPLES = [
    {
        language: "javascript",
        label: "JavaScript / TypeScript",
        code: `export function generateWhatsAppLink(phone, message) {
  // Limpa apenas os dígitos do telefone
  const cleanPhone = String(phone).replace(/\\D/g, "");
  
  // Se não tiver o DDI 55, adiciona por padrão
  const fullNumber = cleanPhone.startsWith("55") ? cleanPhone : "55" + cleanPhone;
  
  if (!message || message.trim() === "") {
    return \`https://wa.me/\${fullNumber}\`;
  }
  
  // Codifica caracteres especiais para URL
  const encodedMessage = encodeURIComponent(message.trim());
  return \`https://wa.me/\${fullNumber}?text=\${encodedMessage}\`;
}`
    },
    {
        language: "python",
        label: "Python",
        code: `import urllib.parse
import re

def generate_whatsapp_link(phone: str, message: str = "") -> str:
    digits = re.sub(r'\\D', '', phone)
    if not digits.startswith('55'):
        digits = '55' + digits
        
    base_url = f"https://wa.me/{digits}"
    if message and message.strip():
        encoded = urllib.parse.quote(message.strip())
        return f"{base_url}?text={encoded}"
    return base_url`
    }
]

export function WhatsappLinkGeneratorPage() {
    const [phone, setPhone] = useState("11999998888")
    const [message, setMessage] = useState("Olá! Vi seu site e gostaria de tirar uma dúvida.")
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
    const [loadingQr, setLoadingQr] = useState(false)

    // Formata o número limpo com DDI 55
    const cleanDigits = phone.replace(/\D/g, "")
    const fullPhone = cleanDigits.startsWith("55") ? cleanDigits : (cleanDigits ? `55${cleanDigits}` : "")
    
    // Gera a URL completa
    const generatedUrl = fullPhone 
        ? `https://wa.me/${fullPhone}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ""}`
        : ""

    // Atualiza QR Code dinamicamente
    useEffect(() => {
        if (!generatedUrl) {
            setQrCodeUrl(null)
            return
        }

        let isMounted = true
        setLoadingQr(true)

        generateQRCode(generatedUrl, "medium")
            .then((url) => {
                if (isMounted) {
                    setQrCodeUrl(url)
                    setLoadingQr(false)
                }
            })
            .catch(() => {
                if (isMounted) setLoadingQr(false)
            })

        return () => {
            isMounted = false
        }
    }, [generatedUrl])

    const handlePhoneChange = (val: string) => {
        setPhone(val)
        sendGTMEvent({
            event: "tool_interaction",
            tool_name: "whatsapp-link-generator",
            tool_action: "input_phone",
            tool_category: "utilities"
        })
    }

    const addEmoji = (emoji: string) => {
        setMessage((prev) => prev + " " + emoji)
    }

    const openWhatsApp = () => {
        if (!generatedUrl) return
        window.open(generatedUrl, "_blank", "noopener,noreferrer")
        sendGTMEvent({
            event: "tool_interaction",
            tool_name: "whatsapp-link-generator",
            tool_action: "test_link",
            tool_category: "utilities"
        })
    }

    const copyHtmlEmbed = () => {
        const html = `<a href="${generatedUrl}" target="_blank" rel="noopener noreferrer">Fale conosco no WhatsApp</a>`
        navigator.clipboard.writeText(html)
        toast.success("Código HTML copiado!")
        sendGTMEvent({
            event: "tool_interaction",
            tool_name: "whatsapp-link-generator",
            tool_action: "copy_html_embed",
            tool_category: "utilities"
        })
    }

    const downloadQr = () => {
        if (!qrCodeUrl) return
        const a = document.createElement("a")
        a.href = qrCodeUrl
        a.download = `whatsapp-qrcode-${fullPhone || "link"}.png`
        a.click()
        toast.success("QR Code baixado!")
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-8">
                <div className="container mx-auto px-4 max-w-5xl space-y-6">
                    <Breadcrumbs
                        items={[
                            { label: "Ferramentas", href: "/tools" },
                            { label: "Utilidades", href: "/tools/utilities" },
                            { label: "Gerador de Link WhatsApp" }
                        ]}
                    />

                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <MessageSquare className="w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Gerador de Link do WhatsApp (wa.me)</h1>
                                <p className="text-muted-foreground text-sm">
                                    Crie links diretos personalizados com mensagem pronta e QR Code para bio do Instagram, botões de site e campanhas.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Coluna Esquerda: Formulário de Configuração (7 cols) */}
                        <div className="lg:col-span-7 space-y-4">
                            <Card className="border-border/60 shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Configurar Número e Mensagem</CardTitle>
                                    <CardDescription>
                                        Preencha o número de telefone com DDD e personalize o texto que o cliente enviará.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone-input" className="text-sm font-semibold flex items-center justify-between">
                                            <span>Número de WhatsApp (com DDD)</span>
                                            <Badge variant="outline" className="text-xs font-normal">
                                                DDI +55 (Brasil)
                                            </Badge>
                                        </Label>
                                        <div className="relative">
                                            <Phone className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                            <Input
                                                id="phone-input"
                                                value={phone}
                                                onChange={(e) => handlePhoneChange(e.target.value)}
                                                placeholder="Ex: 11 99999-8888 ou 21 98888-7777"
                                                className="pl-9 font-mono text-base"
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Aceita qualquer formato com ou sem parênteses e hifens.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="message-input" className="text-sm font-semibold">
                                                Mensagem Padrão (Opcional)
                                            </Label>
                                            <span className="text-xs text-muted-foreground font-mono">
                                                {message.length} caracteres
                                            </span>
                                        </div>
                                        <Textarea
                                            id="message-input"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Digite a mensagem inicial que o usuário enviará..."
                                            rows={4}
                                            className="resize-none text-sm"
                                        />
                                    </div>

                                    {/* Emojis Rápidos */}
                                    <div className="space-y-1.5">
                                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                            <Smile className="w-3.5 h-3.5" />
                                            <span>Inserir Emojis:</span>
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {EMOJIS.map((e) => (
                                                <button
                                                    key={e}
                                                    type="button"
                                                    onClick={() => addEmoji(e)}
                                                    className="w-8 h-8 rounded bg-muted/60 hover:bg-muted text-sm flex items-center justify-center transition-colors"
                                                >
                                                    {e}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mensagens Prontas */}
                                    <div className="space-y-1.5 pt-2 border-t">
                                        <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                                            <span>Modelos Prontos de Mensagem:</span>
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {PRESET_MESSAGES.map((preset) => (
                                                <Button
                                                    key={preset.label}
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setMessage(preset.text)}
                                                    className="h-7 text-xs"
                                                >
                                                    {preset.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Link Gerado e Ações */}
                            <Card className="border-border/60 bg-muted/20 shadow-sm">
                                <CardContent className="p-4 space-y-3">
                                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                                        Link do WhatsApp Gerado
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={generatedUrl}
                                            readOnly
                                            className="font-mono text-xs bg-background"
                                        />
                                        <CopyButton text={generatedUrl} />
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-1">
                                        <Button
                                            onClick={openWhatsApp}
                                            disabled={!generatedUrl}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 flex-1 sm:flex-initial"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span>Testar no WhatsApp</span>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={copyHtmlEmbed}
                                            disabled={!generatedUrl}
                                            className="gap-1.5"
                                        >
                                            <FileCode className="w-4 h-4" />
                                            <span>Copiar Tag HTML</span>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Coluna Direita: Preview WhatsApp & QR Code (5 cols) */}
                        <div className="lg:col-span-5 space-y-4">
                            {/* Preview Estilizado do Balão do WhatsApp */}
                            <Card className="border-border/60 shadow-sm overflow-hidden bg-[#e5ddd5] dark:bg-[#0b141a]">
                                <div className="bg-[#075e54] dark:bg-[#202c33] p-3 text-white flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-emerald-700 dark:bg-emerald-600 flex items-center justify-center font-bold text-xs">
                                            {cleanDigits ? cleanDigits.substring(cleanDigits.length - 2) : "WA"}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-xs block leading-tight">
                                                {phone ? `+${fullPhone}` : "Seu Contato"}
                                            </span>
                                            <span className="text-[10px] text-emerald-200 block leading-tight">online</span>
                                        </div>
                                    </div>
                                    <Smartphone className="w-4 h-4 text-emerald-200" />
                                </div>

                                <CardContent className="p-4 min-h-[140px] flex flex-col justify-end">
                                    {message.trim() ? (
                                        <div className="self-end bg-[#dcf8c6] dark:bg-[#005c4b] text-zinc-900 dark:text-zinc-100 p-2.5 rounded-lg rounded-tr-none max-w-[85%] shadow-sm text-xs relative">
                                            <p className="whitespace-pre-wrap break-words pr-8">{message}</p>
                                            <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-muted-foreground/80 dark:text-zinc-300">
                                                <span>Agora</span>
                                                <div className="flex text-emerald-600 dark:text-emerald-400">
                                                    <Check className="w-3 h-3 -mr-1.5" />
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-xs text-muted-foreground">
                                            (Sem mensagem prévia configurada)
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* QR Code */}
                            <Card className="border-border/60 shadow-sm text-center">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm flex items-center justify-center gap-1.5">
                                        <QrCode className="w-4 h-4 text-primary" />
                                        <span>QR Code para Escanear no Celular</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 flex flex-col items-center space-y-3">
                                    {loadingQr ? (
                                        <div className="w-44 h-44 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground animate-pulse">
                                            Gerando QR Code...
                                        </div>
                                    ) : qrCodeUrl ? (
                                        <div className="p-2.5 bg-white rounded-xl shadow-sm border">
                                            <img
                                                src={qrCodeUrl}
                                                alt="QR Code WhatsApp"
                                                className="w-40 h-40 object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-44 h-44 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                            Informe o número
                                        </div>
                                    )}

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={downloadQr}
                                        disabled={!qrCodeUrl}
                                        className="h-8 text-xs gap-1.5 w-full max-w-[200px]"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>Baixar Imagem (PNG)</span>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Implementação em Código */}
                    <Accordion type="single" collapsible className="w-full">
                        <CodeExamplesAccordion examples={CODE_EXAMPLES} />
                    </Accordion>

                    {/* FAQ */}
                    <Card className="border-border/60">
                        <CardHeader>
                            <CardTitle className="text-xl">Perguntas Frequentes sobre Links do WhatsApp</CardTitle>
                            <CardDescription>
                                Como usar o link oficial wa.me para turbinar seu atendimento e campanhas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="faq-1">
                                    <AccordionTrigger>Como funciona o link direto wa.me do WhatsApp?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm">
                                        O link no formato <code className="text-foreground">https://wa.me/&lt;numero&gt;</code> é o padrão oficial desenvolvido pela Meta. Quando alguém clica no link pelo celular, o aplicativo do WhatsApp abre diretamente na conversa com o número informado. Pelo computador, o link redireciona para o WhatsApp Web ou para o aplicativo de desktop.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="faq-2">
                                    <AccordionTrigger>É necessário ter o número salvo na agenda para abrir a conversa?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm">
                                        Não! Essa é a principal vantagem do link wa.me: qualquer pessoa pode iniciar uma conversa com você sem precisar salvar seu número na agenda telefônica do smartphone.
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="faq-3">
                                    <AccordionTrigger>Como colocar o link do WhatsApp na bio do Instagram?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-sm">
                                        Basta gerar o link com seu número e mensagem desejada, clicar em <strong>Copiar Link</strong>, abrir o Instagram, ir em <strong>Editar Perfil</strong> &gt; <strong>Links</strong> &gt; <strong>Adicionar Link Externo</strong> e colar a URL.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>

                    {/* Rodapé e Links Relacionados */}
                    <div className="pt-4 border-t space-y-4">
                        <div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                                Artigos e Guias Relacionados:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href="/blog/como-validar-formatar-telefone-celular-brasil-ddd"
                                    className="text-xs px-2.5 py-1.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 rounded hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors font-medium inline-flex items-center gap-1.5"
                                >
                                    <span>📖 Como Validar e Formatar Telefones e Celulares no Brasil com Regex</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                                <Link
                                    href="/tools/personal/phone"
                                    className="text-xs px-2.5 py-1.5 bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors font-medium inline-flex items-center gap-1.5"
                                >
                                    <span>⚙️ Gerador e Validador de Telefones Brasileiros</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                                Compartilhe esta ferramenta:
                            </span>
                            <ShareButtons title="Gerador de Link do WhatsApp (wa.me) - DevThru" />
                        </div>
                    </div>

                    <RelatedTools currentToolSlug="whatsapp-link-generator" category="utilities" />
                </div>
            </main>
        </div>
    )
}
