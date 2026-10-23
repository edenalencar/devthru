"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sparkles,
    TrendingUp,
    Users,
    ShieldCheck,
    Send,
    MessageCircle,
    Check,
    Building2,
    Eye,
    Laptop,
    Share2,
    ArrowRight,
    HelpCircle
} from "lucide-react"
import { toast } from "sonner"
import ReCAPTCHA from "react-google-recaptcha"
import { SponsorBanner } from "@/components/marketing/sponsor-banner"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function AnuncieClient() {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFormat, setSelectedFormat] = useState("banner-ferramentas")
    const formRef = useRef<HTMLDivElement>(null)
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    const scrollToForm = (format?: string) => {
        if (format) setSelectedFormat(format)
        formRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const captchaToken = recaptchaRef.current?.getValue()

        if (!captchaToken) {
            toast.error("Por favor, confirme que você não é um robô no reCAPTCHA.")
            setIsLoading(false)
            return
        }

        const form = e.currentTarget
        const formData = new FormData(form)
        const name = formData.get("name") as string
        const company = formData.get("company") as string
        const email = formData.get("email") as string
        const rawWebsite = (formData.get("website") as string)?.trim() || ""
        const website = rawWebsite
            ? rawWebsite.startsWith("http://") || rawWebsite.startsWith("https://")
                ? rawWebsite
                : `https://${rawWebsite}`
            : "Não informado"
        const format = formData.get("format") as string
        const message = formData.get("message") as string

        const subject = `[Patrocínio DevThru] - ${company || name}`
        const fullMessage = `
Empresa: ${company || "Não informada"}
Site: ${website}
Contato: ${name} (${email})
Formato de Interesse: ${format}

Mensagem / Proposta:
${message}
        `.trim()

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message: fullMessage,
                    captchaToken,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Erro ao enviar proposta")
            }

            toast.success("Proposta enviada com sucesso! Entraremos em contato em até 24 horas úteis.")
            form.reset()
            recaptchaRef.current?.reset()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro ao enviar mensagem. Tente novamente.")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const whatsappMessage = encodeURIComponent(
        "Olá! Tenho interesse em anunciar / patrocinar o DevThru com minha empresa. Podemos conversar?"
    )

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-24">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
                        <Badge
                            variant="outline"
                            className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold border-primary/30 bg-primary/10 text-primary"
                        >
                            <Sparkles className="size-3.5" />
                            Mídia Kit Oficial & Patrocínios
                        </Badge>

                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
                            Conecte sua marca a milhares de{" "}
                            <span className="text-primary underline decoration-primary/40 decoration-wavy">
                                desenvolvedores
                            </span>{" "}
                            no Brasil
                        </h1>

                        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Alcance engenheiros de software, analistas de QA e arquitetos técnicos no exato momento
                            em que estão construindo, testando e homologando sistemas. Formatos nativos, limpos e imunes a AdBlock.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto font-medium shadow-md"
                                onClick={() => scrollToForm()}
                            >
                                Solicitar Espaço de Patrocínio
                                <ArrowRight className="ml-2 size-4" />
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto font-medium hover:border-emerald-500 hover:text-emerald-600 transition-colors"
                            >
                                <a
                                    href={`https://wa.me/553172615883?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="mr-2 size-4 text-emerald-500" />
                                    Falar no WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Métricas Reais & Audiência */}
                <section className="py-16 bg-muted/20 border-b">
                    <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                                Nossa Audiência em Números
                            </h2>
                            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl mx-auto">
                                Dados orgânicos e reais consolidados pelo Google Search Console e Google Analytics.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="border-primary/20 shadow-xs hover:border-primary/40 transition-all">
                                <CardHeader className="pb-2">
                                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                                        <Eye className="size-5" />
                                    </div>
                                    <CardTitle className="text-3xl font-extrabold text-foreground">
                                        +36.000
                                    </CardTitle>
                                    <CardDescription className="font-medium text-foreground/80">
                                        Impressões mensais no Google
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">
                                        Tráfego com mais de 109.000 exibições no trimestre em buscas orgânicas de tecnologia.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-primary/20 shadow-xs hover:border-primary/40 transition-all">
                                <CardHeader className="pb-2">
                                    <div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-2">
                                        <Users className="size-5" />
                                    </div>
                                    <CardTitle className="text-3xl font-extrabold text-foreground">
                                        100%
                                    </CardTitle>
                                    <CardDescription className="font-medium text-foreground/80">
                                        Público Técnico Especializado
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">
                                        Desenvolvedores Full Stack, Frontend, Backend, QAs e Engenheiros de Software em horário de trabalho.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-primary/20 shadow-xs hover:border-primary/40 transition-all">
                                <CardHeader className="pb-2">
                                    <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-2">
                                        <Share2 className="size-5" />
                                    </div>
                                    <CardTitle className="text-3xl font-extrabold text-foreground">
                                        Corporativo
                                    </CardTitle>
                                    <CardDescription className="font-medium text-foreground/80">
                                        Compartilhado em Equipes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">
                                        Tráfego direto de canais corporativos como Microsoft Teams, Slack interno e GitHub.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-primary/20 shadow-xs hover:border-primary/40 transition-all">
                                <CardHeader className="pb-2">
                                    <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-2">
                                        <Building2 className="size-5" />
                                    </div>
                                    <CardTitle className="text-3xl font-extrabold text-foreground">
                                        Top Hubs
                                    </CardTitle>
                                    <CardDescription className="font-medium text-foreground/80">
                                        Maiores Polos Tech do Brasil
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">
                                        Liderança absoluta em São Paulo, Campinas, Curitiba, Rio de Janeiro, Belo Horizonte e Brasília.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Por que anunciar no DevThru vs AdSense */}
                <section className="py-16 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-2">Vantagens Exclusivas</Badge>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Por que Anunciar Diretamente no DevThru?
                        </h2>
                        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm md:text-base">
                            Redes programáticas comuns (como AdSense) falham com programadores. Veja por que nosso modelo nativo entrega resultados reais.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-3 rounded-xl border p-6 bg-card">
                            <div className="size-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                                <ShieldCheck className="size-5" />
                            </div>
                            <h3 className="text-lg font-bold">100% Imune a AdBlockers</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Mais de 70% dos desenvolvedores usam bloqueadores de anúncios. No DevThru, seu patrocínio é
                                renderizado em HTML/CSS nativo, sem iframes invasivos ou rastreadores externos bloqueáveis.
                            </p>
                        </div>

                        <div className="space-y-3 rounded-xl border p-6 bg-card">
                            <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                                <Laptop className="size-5" />
                            </div>
                            <h3 className="text-lg font-bold">Contexto de Mão no Código</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                O desenvolvedor acessa o DevThru enquanto está configurando testes, integrando APIs ou corrigindo bugs.
                                É o momento perfeito para apresentar soluções de Nuvem, APIs de pagamento ou ferramentas de produtividade.
                            </p>
                        </div>

                        <div className="space-y-3 rounded-xl border p-6 bg-card">
                            <div className="size-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                                <TrendingUp className="size-5" />
                            </div>
                            <h3 className="text-lg font-bold">Exclusividade e Autoridade</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Não poluímos o site com dezenas de banners concorrentes. Sua marca ganha destaque exclusivo e
                                associação direta com uma ferramenta moderna, rápida e confiável.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Exemplo de Banner Nativo ao Vivo */}
                <section className="py-12 bg-muted/30 border-y">
                    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-6">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                Demonstração em Tempo Real
                            </span>
                            <h3 className="text-xl font-bold mt-1">Como o seu anúncio é exibido aos desenvolvedores</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                                Um design perfeitamente integrado à identidade visual das ferramentas, elegante e de alta conversão.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <SponsorBanner
                                sponsor={{
                                    name: "Acme Cloud Brasil",
                                    description: "Deploy de aplicações Next.js e bancos Postgres com latência ultra-baixa em São Paulo. Ganhe $50 em créditos iniciais.",
                                    ctaText: "Testar Grátis",
                                    targetUrl: "https://www.devthru.com/anuncie",
                                    tag: "Cloud & DevOps",
                                }}
                                toolContext="Gerador de Dados e Ferramentas Fiscais"
                            />
                        </div>
                    </div>
                </section>

                {/* Formatos de Patrocínio */}
                <section className="py-16 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="mb-2">Opções Flexíveis</Badge>
                        <h2 className="text-3xl font-bold tracking-tight">Formatos de Parceria</h2>
                        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm md:text-base">
                            Escolha a modalidade que melhor atende aos objetivos de aquisição e branding da sua empresa.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Formato 1 */}
                        <Card className="flex flex-col relative border-border hover:border-primary/50 transition-all">
                            <CardHeader>
                                <div className="text-xs font-semibold uppercase text-primary tracking-wide">
                                    Mais Procurado
                                </div>
                                <CardTitle className="text-xl mt-1">Banner em Ferramentas Populares</CardTitle>
                                <CardDescription>
                                    Presença de destaque nas ferramentas com maior fluxo diário (Telefones, Placas, Cartões).
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 flex-1">
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500 shrink-0" />
                                        Banner nativo fixo na página da ferramenta
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500 shrink-0" />
                                        Logo + Copy persuasiva + Link com UTM
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500 shrink-0" />
                                        Mais de 2.000 visualizações qualificadas/semana
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500 shrink-0" />
                                        Relatório mensal de impressões e cliques
                                    </li>
                                </ul>
                            </CardContent>
                            <div className="p-6 pt-0 mt-auto">
                                <Button
                                    className="w-full"
                                    onClick={() => scrollToForm("banner-ferramentas")}
                                >
                                    Selecionar Formato
                                </Button>
                            </div>
                        </Card>

                        {/* Formato 2 */}
                        <Card className="flex flex-col relative border-primary border-2 shadow-lg hover:border-primary transition-all overflow-hidden">
                            <div className="bg-primary text-primary-foreground py-1.5 text-center text-xs font-bold tracking-wider uppercase">
                                Alto Valor B2B
                            </div>
                            <CardHeader className="pt-6">
                                <div className="text-xs font-semibold uppercase text-primary tracking-wide">
                                    Público Corporativo
                                </div>
                                <CardTitle className="text-xl mt-1">Patrocínio da Suíte Fiscal</CardTitle>
                                <CardDescription>
                                    Exclusividade em todas as ferramentas de NF-e, NFC-e, CT-e e Inscrições Estaduais.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 flex-1">
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500 shrink-0" />
                                        Presença em toda a categoria fiscal
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500 shrink-0" />
                                        Público: Desenvolvedores ERP, Fintechs e Conttechs
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500 shrink-0" />
                                        Maior CTR orgânico do site (até 24.8%)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500 shrink-0" />
                                        Ideal para APIs de emissão, gateways e nuvem
                                    </li>
                                </ul>
                            </CardContent>
                            <div className="p-6 pt-0 mt-auto">
                                <Button
                                    className="w-full"
                                    onClick={() => scrollToForm("suite-fiscal")}
                                >
                                    Selecionar Formato
                                </Button>
                            </div>
                        </Card>

                        {/* Formato 3 */}
                        <Card className="flex flex-col relative border-border hover:border-primary/50 transition-all">
                            <CardHeader>
                                <div className="text-xs font-semibold uppercase text-primary tracking-wide">
                                    SEO & Autoridade
                                </div>
                                <CardTitle className="text-xl mt-1">Artigo Técnico & Co-Marketing</CardTitle>
                                <CardDescription>
                                    Publicação técnica no blog do DevThru com tutoriais e estudos de caso do seu produto.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 flex-1">
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500 shrink-0" />
                                        Artigo técnico permanente no blog
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500 shrink-0" />
                                        Links diretos para seu produto
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500 shrink-0" />
                                        Otimização para busca orgânica no Google
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="size-4 text-green-500 shrink-0" />
                                        Divulgação para assinantes e newsletter
                                    </li>
                                </ul>
                            </CardContent>
                            <div className="p-6 pt-0 mt-auto">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => scrollToForm("artigo-blog")}
                                >
                                    Selecionar Formato
                                </Button>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Formulário de Contato Direto */}
                <section ref={formRef} className="py-16 bg-muted/20 border-t">
                    <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                        <Card className="border-primary/30 shadow-lg">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-bold">
                                    Solicitar Proposta ou Mídia Kit Completo
                                </CardTitle>
                                <CardDescription>
                                    Preencha seus dados para receber nossa tabela de preços e disponibilidade de slots.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">
                                                Seu Nome
                                            </label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="Ex: Carlos Silva"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="company" className="text-sm font-medium">
                                                Nome da Empresa
                                            </label>
                                            <Input
                                                id="company"
                                                name="company"
                                                placeholder="Ex: Tech Solutions"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">
                                                E-mail Corporativo
                                            </label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="carlos@empresa.com.br"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="website" className="text-sm font-medium">
                                                Site da Empresa (Opcional)
                                            </label>
                                            <Input
                                                id="website"
                                                name="website"
                                                type="text"
                                                placeholder="ex: empresa.com.br"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="format" className="text-sm font-medium">
                                            Formato de Interesse
                                        </label>
                                        <input type="hidden" name="format" value={selectedFormat} />
                                        <Select
                                            value={selectedFormat}
                                            onValueChange={(val) => setSelectedFormat(val)}
                                        >
                                            <SelectTrigger id="format" className="w-full">
                                                <SelectValue placeholder="Selecione um formato de interesse" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="banner-ferramentas">
                                                    Banner em Ferramentas Populares (Telefones, Placas, Cartões)
                                                </SelectItem>
                                                <SelectItem value="suite-fiscal">
                                                    Patrocínio Exclusivo da Suíte Fiscal (NF-e, CT-e, IE)
                                                </SelectItem>
                                                <SelectItem value="artigo-blog">
                                                    Artigo Técnico &amp; Co-Marketing no Blog
                                                </SelectItem>
                                                <SelectItem value="outro">
                                                    Outro / Pacote Personalizado
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">
                                            Conte um pouco sobre sua empresa e objetivo
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Ex: Queremos divulgar nossa nova API de pagamentos para desenvolvedores que realizam testes em homologação..."
                                            className="min-h-[120px]"
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-center py-2">
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                            theme="light"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full text-base font-semibold shadow-md py-6"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            "Enviando solicitação..."
                                        ) : (
                                            <>
                                                <Send className="mr-2 size-4" />
                                                Enviar Solicitação de Mídia Kit
                                            </>
                                        )}
                                    </Button>

                                    <p className="text-center text-xs text-muted-foreground pt-2">
                                        Resposta garantida em até 24 horas úteis. Sem spam ou intermediários.
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* FAQ de Anunciantes */}
                <section className="py-16 container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <Badge variant="outline" className="mb-2">Tire suas dúvidas</Badge>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                            Perguntas Frequentes de Anunciantes
                        </h2>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-left font-semibold">
                                Qual é a duração mínima de um patrocínio?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                Nossos contratos de patrocínio têm duração mínima de 30 dias (mensal). Você pode renovar
                                mês a mês ou garantir descontos especiais em pacotes trimestrais e semestrais.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-left font-semibold">
                                Como acompanho o desempenho do meu anúncio?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                Todos os links de destino utilizam os parâmetros UTM que você definir para rastreamento no seu
                                Google Analytics / Mixpanel. Além disso, fornecemos um relatório consolidado de impressões e
                                cliques ao final de cada período.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-left font-semibold">
                                Que tipos de empresas podem anunciar no DevThru?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                Aceitamos empresas com produtos e serviços de alto valor para a comunidade de tecnologia: plataformas
                                de cloud e hospedagem, APIs e gateways bancários, ferramentas de observabilidade, consultorias,
                                recrutamento tech e escolas de programação. Recusamos apostas, cripto não-regulada ou qualquer
                                conteúdo enganoso.
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4">
                            <AccordionTrigger className="text-left font-semibold">
                                Posso alterar a arte ou a mensagem durante o mês?
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                Sim! Como os banners são gerenciados diretamente no código da aplicação, você pode solicitar até
                                duas atualizações de texto, link ou CTA por mês sem custo adicional.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </main>

            <Footer />
        </div>
    )
}
