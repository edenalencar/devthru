'use client'

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare, Send } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Tem alguma dúvida, sugestão ou encontrou um bug? Estamos aqui para ajudar.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="h-5 w-5" />
                                    Email
                                </CardTitle>
                                <CardDescription>
                                    Para assuntos gerais e suporte
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <a href="mailto:contato@devhubtools.com" className="text-primary hover:underline text-lg">
                                    contato@devhubtools.com
                                </a>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" />
                                    Redes Sociais
                                </CardTitle>
                                <CardDescription>
                                    Siga-nos para atualizações
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p>Twitter: <a href="#" className="text-primary hover:underline">@devhubtools</a></p>
                                <p>GitHub: <a href="#" className="text-primary hover:underline">github.com/devhubtools</a></p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Envie uma mensagem</CardTitle>
                            <CardDescription>
                                Preencha o formulário abaixo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Nome</label>
                                    <Input id="name" placeholder="Seu nome" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" type="email" placeholder="seu@email.com" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">Assunto</label>
                                    <Input id="subject" placeholder="Como podemos ajudar?" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
                                    <Textarea id="message" placeholder="Descreva sua dúvida ou sugestão..." className="min-h-[150px]" required />
                                </div>
                                <Button type="submit" className="w-full">
                                    <Send className="mr-2 h-4 w-4" />
                                    Enviar Mensagem
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    )
}
