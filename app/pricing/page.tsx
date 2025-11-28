"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { stripePromise } from "@/lib/stripe/client"

export default function PricingPage() {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState<string | null>(null)

    const handleSubscribe = async (priceId: string) => {
        try {
            setLoading(priceId)
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push("/login?redirect=/pricing")
                return
            }

            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ priceId }),
            })

            let data
            try {
                data = await response.json()
            } catch (e) {
                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${response.statusText}`)
                }
                throw new Error("Resposta inválida do servidor")
            }

            if (!response.ok) {
                throw new Error(data.error || "Erro ao processar pagamento")
            }

            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error("URL de redirecionamento não encontrada")
            }
        } catch (error: any) {
            toast.error(error.message || "Erro ao processar pagamento")
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 py-12">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Planos e Preços</h1>
                        <p className="text-xl text-muted-foreground">
                            Escolha o plano ideal para suas necessidades de desenvolvimento
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Free Plan */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Gratuito</CardTitle>
                                <CardDescription>Para desenvolvedores individuais</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold">R$ 0</span>
                                    <span className="text-muted-foreground">/mês</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Acesso a todas as ferramentas
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        100 gerações por mês
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Histórico básico (50 itens)
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant="outline" disabled>
                                    Plano Atual
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Pro Plan */}
                        <Card className="border-primary relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">
                                POPULAR
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl">Pro</CardTitle>
                                <CardDescription>Para profissionais e freelancers</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold">R$ 29</span>
                                    <span className="text-muted-foreground">/mês</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Gerações ilimitadas
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Acesso à API
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Exportação em massa (CSV/Excel)
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Histórico ilimitado na nuvem
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Sem anúncios
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    onClick={() => handleSubscribe("price_1SYSlbJzedEYbjzZMG9r6nw9")}
                                    disabled={!!loading}
                                >
                                    {loading === "price_1SYSlbJzedEYbjzZMG9r6nw9" && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Assinar Pro
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Enterprise Plan */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Enterprise</CardTitle>
                                <CardDescription>Para times e empresas</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold">R$ 99</span>
                                    <span className="text-muted-foreground">/mês</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Tudo do plano Pro
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Múltiplos usuários
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Suporte prioritário
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Integrações customizadas
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        SLA garantido
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    variant="outline"
                                    onClick={() => handleSubscribe("price_1SYSliJzedEYbjzZ5kbNVHvI")}
                                    disabled={!!loading}
                                >
                                    {loading === "price_1SYSliJzedEYbjzZ5kbNVHvI" && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Assinar Enterprise
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
