import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function DocsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-10 max-w-4xl">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight">Documentação</h1>
                        <p className="text-xl text-muted-foreground">
                            Guia completo para utilizar as ferramentas do DevTools Hub.
                        </p>
                    </div>

                    <Separator />

                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">Visão Geral</h2>
                        <p className="leading-7">
                            O DevTools Hub é uma plataforma completa de ferramentas para desenvolvedores, QA e analistas de dados.
                            Oferecemos geradores de dados, formatadores, validadores e utilitários diversos para acelerar seu fluxo de trabalho.
                        </p>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ferramentas Gratuitas</CardTitle>
                                    <CardDescription>Acesso ilimitado para todos</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li>Geradores de CPF, CNPJ, RG, CNH</li>
                                        <li>Geradores de Dados Pessoais (Nome, Email, etc.)</li>
                                        <li>Formatadores JSON</li>
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
                    </section>

                    <Separator />

                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">Como Usar</h2>
                        <div className="space-y-4">
                            <h3 className="text-xl font-medium">Geração de Dados</h3>
                            <p>
                                Navegue até a ferramenta desejada através do menu lateral ou da página inicial.
                                A maioria das ferramentas oferece geração instantânea. Para copiar o resultado, clique no botão de cópia ao lado do campo.
                            </p>

                            <h3 className="text-xl font-medium">Geração em Massa (Pro)</h3>
                            <p>
                                Usuários Pro podem acessar a aba "Geração em Massa" em ferramentas compatíveis.
                                Defina a quantidade desejada e clique em "Gerar". Os resultados podem ser copiados ou exportados.
                            </p>

                            <h3 className="text-xl font-medium">API (Pro)</h3>
                            <p>
                                Para integrar nossas ferramentas em seus próprios sistemas, vá até as
                                <Link href="/settings" className="text-primary hover:underline mx-1">Configurações</Link>
                                e gere uma chave de API. Consulte a documentação da API (em breve) para endpoints e exemplos.
                            </p>
                        </div>
                    </section>

                    <Separator />

                    <section className="space-y-6">
                        <h2 className="text-2xl font-semibold">Suporte</h2>
                        <p>
                            Encontrou um bug ou tem uma sugestão? Entre em contato conosco através do email
                            <a href="mailto:suporte@devtoolshub.com" className="text-primary hover:underline mx-1">suporte@devtoolshub.com</a>.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
