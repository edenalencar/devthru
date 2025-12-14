'use client'


import { useRef, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare, Send } from "lucide-react"
import { toast } from "sonner"
import ReCAPTCHA from "react-google-recaptcha"

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false)
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const captchaToken = recaptchaRef.current?.getValue()

        if (!captchaToken) {
            toast.error("Por favor, verifique que você não é um robô.")
            setIsLoading(false)
            return
        }

        const form = e.currentTarget

        const formData = new FormData(form)
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            captchaToken,
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Erro ao enviar mensagem')
            }

            toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.")
            form.reset()
            recaptchaRef.current?.reset()
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro ao enviar mensagem. Tente novamente.")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
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
                                <a href="mailto:contato@devthru.com" className="text-primary hover:underline text-lg">
                                    contato@devthru.com
                                </a>
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
                                    <Input id="name" name="name" placeholder="Seu nome" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">Assunto</label>
                                    <Input id="subject" name="subject" placeholder="Como podemos ajudar?" required />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
                                    <Textarea id="message" name="message" placeholder="Descreva sua dúvida ou sugestão..." className="min-h-[150px]" required />
                                </div>

                                <div className="flex justify-center py-2">
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                        theme="light"
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        "Enviando..."
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Enviar Mensagem
                                        </>
                                    )}
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
