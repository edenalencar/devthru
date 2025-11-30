import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 md:py-32 bg-muted/30">
                    <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                                Nossa Missão
                            </div>
                            <h1 className="text-3xl font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                                Simplificando a vida do desenvolvedor
                            </h1>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                O DevTools Hub nasceu da necessidade de ter ferramentas confiáveis, rápidas e seguras em um só lugar. Sem anúncios intrusivos, sem complicações.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team/Story Section */}
                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Por desenvolvedores, para desenvolvedores</h2>
                                <p className="text-muted-foreground text-lg">
                                    Cansados de procurar ferramentas espalhadas pela internet, muitas vezes repletas de anúncios ou com interfaces duvidosas, decidimos criar o DevTools Hub.
                                </p>
                                <p className="text-muted-foreground text-lg">
                                    Nosso objetivo é fornecer uma suíte completa de utilitários que respeitam seu tempo e sua privacidade. Estamos constantemente adicionando novas ferramentas baseadas no feedback da comunidade.
                                </p>
                            </div>
                            <div className="relative aspect-video overflow-hidden rounded-xl border bg-background shadow-xl">
                                <Image
                                    src="/images/about-dev-environment.png"
                                    alt="Ambiente de desenvolvimento moderno"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 md:py-24 bg-muted/30">
                    <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                        <div className="grid gap-12 lg:grid-cols-3">
                            <div className="flex flex-col gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon name="security" className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">Privacidade Primeiro</h3>
                                <p className="text-muted-foreground">
                                    A maioria das nossas ferramentas roda inteiramente no seu navegador (client-side). Seus dados sensíveis nunca saem da sua máquina.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon name="speed" className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">Performance e Rapidez</h3>
                                <p className="text-muted-foreground">
                                    Interface limpa e otimizada para carregar instantaneamente. Não perca tempo esperando carregamentos desnecessários.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Icon name="design_services" className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">Experiência Premium</h3>
                                <p className="text-muted-foreground">
                                    Design moderno e intuitivo, pensado para ser agradável de usar durante todo o seu dia de trabalho.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Platform Overview & Features */}
                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6 mx-auto max-w-4xl space-y-10">
                        <div className="space-y-4 text-center">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">O que oferecemos</h2>
                            <p className="text-xl text-muted-foreground">
                                Uma plataforma completa para acelerar seu fluxo de trabalho, desde tarefas simples até automações complexas.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ferramentas Gratuitas</CardTitle>
                                    <CardDescription>Acesso ilimitado para todos</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>Geradores de CPF, CNPJ, RG, CNH</li>
                                        <li>Geradores de Dados Pessoais</li>
                                        <li>Formatadores JSON e XML</li>
                                        <li>Encoders/Decoders (Base64, Hash)</li>
                                        <li>Geradores de QR Code</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recursos Pro</CardTitle>
                                    <CardDescription>Para usuários avançados</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>Geração em Massa (até 10.000 itens)</li>
                                        <li>Exportação para CSV e JSON</li>
                                        <li>Acesso via API (Chaves de API)</li>
                                        <li>Histórico ilimitado (Em breve)</li>
                                        <li>Sem anúncios</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* How to Use */}
                <section className="py-16 md:py-24 bg-muted/30">
                    <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                        <div className="space-y-10">
                            <div className="space-y-4 text-center">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Como Usar</h2>
                                <p className="text-xl text-muted-foreground">
                                    Simples, direto e eficiente.
                                </p>
                            </div>

                            <div className="grid gap-8 md:grid-cols-3">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">1. Escolha</h3>
                                    <p className="text-muted-foreground">
                                        Navegue pelo menu lateral ou use a busca na página inicial para encontrar a ferramenta que você precisa.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">2. Gere</h3>
                                    <p className="text-muted-foreground">
                                        A maioria das ferramentas gera resultados instantaneamente. Para geração em massa, basta definir a quantidade.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">3. Integre</h3>
                                    <p className="text-muted-foreground">
                                        Copie os resultados com um clique, exporte arquivos ou use nossa API para integrar diretamente no seu código.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6 mx-auto max-w-7xl text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">Pronto para otimizar seu workflow?</h2>
                        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mb-8">
                            Explore nossa coleção de ferramentas e comece a usar agora mesmo. É grátis e não requer cadastro para a maioria das funções.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="h-12 px-8 text-base">
                                <Link href="/">Explorar Ferramentas</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                                <Link href="/register">Criar Conta Grátis</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    )
}
