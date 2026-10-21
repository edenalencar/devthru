"use client"

import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SponsorBanner } from "@/components/marketing/sponsor-banner"
import {
    FileText,
    Truck,
    ShoppingCart,
    Briefcase,
    Building2,
    MapPin,
    Sparkles,
    Clock,
    Shield,
    Rocket,
    Barcode
} from "lucide-react"

const fiscalTools = [
    {
        title: "Decodificador de Chave SEFAZ",
        description: "Desmembre chaves de 44 dígitos e valide o dígito verificador Módulo 11.",
        icon: Barcode,
        href: "/tools/business/nfe-decoder",
        badge: "Novo"
    },
    {
        title: "Gerador de NF-e",
        description: "Gere chaves de acesso para Nota Fiscal Eletrônica.",
        icon: FileText,
        href: "/tools/business/nfe-generator",
        badge: "Popular"
    },
    {
        title: "Gerador de CT-e",
        description: "Chaves para Conhecimento de Transporte Eletrônico.",
        icon: Truck,
        href: "/tools/business/cte-generator"
    },
    {
        title: "Gerador de MDF-e",
        description: "Manifesto Eletrônico de Documentos Fiscais.",
        icon: FileText,
        href: "/tools/business/mdfe-generator"
    },
    {
        title: "Gerador de NFC-e",
        description: "Nota Fiscal de Consumidor Eletrônica.",
        icon: ShoppingCart,
        href: "/tools/business/nfce-generator"
    },
    {
        title: "Consulta de CNAE",
        description: "Pesquisa rápida de códigos de atividades econômicas.",
        icon: Briefcase,
        href: "/tools/business/cnae-search"
    },
    {
        title: "Inscrição Estadual",
        description: "Gerador e validador por estado brasileiro.",
        icon: MapPin,
        href: "/tools/documents/inscricao-estadual"
    },
    {
        title: "Gerador de CNPJ",
        description: "Gere números de CNPJ válidos para testes.",
        icon: Building2,
        href: "/tools/documents/cnpj"
    }
]

const benefits = [
    {
        icon: Sparkles,
        title: "Sem Cadastro",
        description: "Use todas as ferramentas instantaneamente, sem criar conta."
    },
    {
        icon: Clock,
        title: "Grátis para Sempre",
        description: "Acesso ilimitado a todas as ferramentas básicas."
    },
    {
        icon: Shield,
        title: "Focado em Homologação",
        description: "Dados gerados para ambientes de teste e desenvolvimento."
    }
]

export function FiscalToolsHubPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                Suíte de Ferramentas Fiscais e Empresariais para Desenvolvedores
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Gere dados de teste para sistemas de faturamento e ERPs de forma rápida e gratuita.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tools Grid Section */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
                            Escolha sua Ferramenta
                        </h2>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {fiscalTools.map((tool) => (
                                <Link key={tool.href} href={tool.href} className="block h-full group">
                                    <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-muted/50 hover:border-primary/50 relative overflow-hidden">
                                        {tool.badge && (
                                            <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                                                {tool.badge}
                                            </div>
                                        )}
                                        <CardHeader className="pb-3">
                                            <div className="p-3 bg-primary/10 rounded-xl w-fit mb-3 group-hover:bg-primary/20 transition-colors">
                                                <tool.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <CardTitle className="text-lg">{tool.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="text-base">
                                                {tool.description}
                                            </CardDescription>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-12 md:py-16 bg-muted/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
                            Por que usar nossas ferramentas?
                        </h2>

                        <div className="grid gap-6 md:grid-cols-3">
                            {benefits.map((benefit) => (
                                <Card key={benefit.title} className="text-center border-0 bg-background shadow-sm">
                                    <CardHeader>
                                        <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit mb-2">
                                            <benefit.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">{benefit.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            {benefit.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Technical Guide Section */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <div className="border rounded-2xl p-8 md:p-12 bg-card shadow-sm space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight mb-4">
                                    Guia Técnico: O Ecossistema de Documentos Fiscais Eletrônicos no Brasil
                                </h2>
                                <p className="text-muted-foreground leading-relaxed text-base">
                                    No Brasil, o Sistema Público de Escrituração Digital (SPED) e o Projeto Nota Fiscal Eletrônica padronizaram o intercâmbio de dados fiscais entre contribuintes e as Secretarias da Fazenda (SEFAZ). Para desenvolvedores de software, ERPs, PDVs e gateways de e-commerce, testar regras tributárias e fluxos de emissão exige entender a estrutura dos principais documentos e chaves de acesso.
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="border border-muted/80 rounded-xl p-5 bg-muted/20 space-y-2">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        NF-e (Modelo 55) & NFC-e (Modelo 65)
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        A <strong>NF-e (Modelo 55)</strong> documenta a circulação de mercadorias em transações B2B, atacado e comércio eletrônico, exigindo assinatura digital ICP-Brasil e autorização prévia da SEFAZ. Já a <strong>NFC-e (Modelo 65)</strong> é voltada para o varejo presencial ao consumidor final, dispensando a impressão de formulários tradicionais e permitindo contingência offline rápida.
                                    </p>
                                </div>

                                <div className="border border-muted/80 rounded-xl p-5 bg-muted/20 space-y-2">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Truck className="h-5 w-5 text-primary" />
                                        CT-e (Modelo 57) & MDF-e (Modelo 58)
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        O <strong>CT-e (Modelo 57)</strong> é o documento emitido por transportadoras para serviços de transporte de carga em qualquer modal. O <strong>MDF-e (Modelo 58)</strong> consolida as informações de carga quando há mais de um CT-e ou NF-e no veículo, sendo obrigatório em operações interestaduais ou intermunicipais de transporte rodoviário.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="text-xl font-bold">Composição da Chave de Acesso de 44 Dígitos</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    A chave de acesso é a impressão digital única de cada documento fiscal emitido no Brasil. Sua estrutura de 44 dígitos decimais é estritamente formatada pelos manuais da SEFAZ:
                                </p>
                                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-xs font-mono">
                                    <div className="p-3 bg-muted/50 rounded-lg border">
                                        <div className="font-bold text-foreground">UF (2 dígitos)</div>
                                        <div className="text-muted-foreground mt-1">Código do IBGE do estado emissor</div>
                                    </div>
                                    <div className="p-3 bg-muted/50 rounded-lg border">
                                        <div className="font-bold text-foreground">AAMM (4 dígitos)</div>
                                        <div className="text-muted-foreground mt-1">Ano e mês da emissão do documento</div>
                                    </div>
                                    <div className="p-3 bg-muted/50 rounded-lg border">
                                        <div className="font-bold text-foreground">CNPJ (14 dígitos)</div>
                                        <div className="text-muted-foreground mt-1">CNPJ do contribuinte emissor</div>
                                    </div>
                                    <div className="p-3 bg-muted/50 rounded-lg border">
                                        <div className="font-bold text-foreground">Modelo (2 dígitos)</div>
                                        <div className="text-muted-foreground mt-1">55 (NF-e), 65 (NFC-e), 57 (CT-e), 58 (MDF-e)</div>
                                    </div>
                                    <div className="p-3 bg-muted/50 rounded-lg border">
                                        <div className="font-bold text-foreground">Série (3 dígitos)</div>
                                        <div className="text-muted-foreground mt-1">Série fiscal da empresa emitente</div>
                                    </div>
                                    <div className="p-3 bg-muted/50 rounded-lg border">
                                        <div className="font-bold text-foreground">Número (9 dígitos)</div>
                                        <div className="text-muted-foreground mt-1">Numeração sequencial do documento</div>
                                    </div>
                                    <div className="p-3 bg-muted/50 rounded-lg border">
                                        <div className="font-bold text-foreground">Tipo Emissão (1 dígito)</div>
                                        <div className="text-muted-foreground mt-1">1=Normal, 9=Contingência offline</div>
                                    </div>
                                    <div className="p-3 bg-muted/50 rounded-lg border">
                                        <div className="font-bold text-foreground">DV (1 dígito)</div>
                                        <div className="text-muted-foreground mt-1">Dígito verificador via Módulo 11 (pesos 2 a 9)</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-sm leading-relaxed text-muted-foreground">
                                <strong className="text-foreground">Dica para Homologação:</strong> Ao testar sistemas em ambientes de homologação das SEFAZ estaduais, utilize sempre números de CNPJ e Inscrição Estadual sintéticos matematicamente válidos. Nossos geradores respeitam rigorosamente o cálculo de Módulo 11 dos órgãos oficiais, evitando rejeições prematuras de schema XML ou erro de checksum.
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-10">
                    <SponsorBanner toolContext="Suíte de Ferramentas Fiscais e SPED" />
                </div>

                {/* CTA Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
                            <CardContent className="p-8 md:p-12 text-center">
                                <Rocket className="h-12 w-12 text-primary mx-auto mb-4" />
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                    Precisando de mais recursos?
                                </h2>
                                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                                    Acesse geração em massa, integração via API e suporte prioritário com nossos planos profissionais.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="text-base">
                                        <Link href="/pricing">
                                            Conheça o Plano Pro
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="text-base">
                                        <Link href="/docs/api">
                                            Acesso via API
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>
        </div>
    )
}
