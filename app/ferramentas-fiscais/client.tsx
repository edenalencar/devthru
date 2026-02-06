"use client"

import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
    Rocket
} from "lucide-react"

const fiscalTools = [
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
