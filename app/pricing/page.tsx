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
import { useUser } from "@/lib/hooks/use-user"
import { differenceInDays } from "date-fns"

export default function PricingPage() {
    const router = useRouter()
    const supabase = createClient()
    const { user, profile, isInTrial, isPro } = useUser()
    const [loading, setLoading] = useState<string | null>(null)

    const daysRemaining = profile?.trial_ends_at
        ? Math.max(0, differenceInDays(new Date(profile.trial_ends_at), new Date()))
        : 0

    const handleSubscribe = async (priceId: string) => {
        try {
            setLoading(priceId)

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

    const getButtonConfig = (plan: 'free' | 'pro' | 'business') => {
        const currentTier = profile?.subscription_tier || 'free'
        const isCurrentPlan = currentTier === plan

        // Cenário A: Usuário em Trial
        if (isInTrial) {
            if (plan === 'pro') {
                return {
                    text: "Seu Plano Atual (Teste Grátis)",
                    disabled: true,
                    variant: "default" as const
                }
            }
            if (plan === 'business') {
                return {
                    text: "Fazer Upgrade",
                    disabled: false,
                    variant: "default" as const
                }
            }
            // Free plan during trial
            return {
                text: "Mudar para este plano",
                disabled: false,
                variant: "outline" as const
            }
        }

        // Cenário B: Usuário Pago (Assinante)
        if (currentTier !== 'free') {
            if (isCurrentPlan) {
                return {
                    text: "Plano Atual",
                    disabled: true,
                    variant: "outline" as const
                }
            }
            return {
                text: "Mudar para este plano",
                disabled: false,
                variant: "default" as const
            }
        }

        // Cenário C: Usuário Free/Expirado
        if (plan === 'free') {
            return {
                text: "Plano Atual",
                disabled: true,
                variant: "outline" as const
            }
        }

        return {
            text: `Assinar ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
            disabled: false,
            variant: (plan === 'pro' ? "default" : "outline") as "default" | "outline"
        }
    }

    const freeConfig = getButtonConfig('free')
    const proConfig = getButtonConfig('pro')
    const businessConfig = getButtonConfig('business')

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
                        <Card className="flex flex-col">
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
                                        Geração em lote de até 5 itens
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter className="mt-auto">
                                <Button
                                    className="w-full"
                                    variant={freeConfig.variant}
                                    disabled={freeConfig.disabled}
                                    onClick={() => { }} // Free plan doesn't need stripe checkout
                                >
                                    {freeConfig.text}
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Pro Plan */}
                        <Card className={`border-primary relative overflow-hidden flex flex-col ${isInTrial ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">
                                POPULAR
                            </div>
                            {isInTrial && (
                                <div className="absolute top-0 left-0 bg-yellow-500 text-white px-3 py-1 text-xs font-bold">
                                    Expira em {daysRemaining} dias
                                </div>
                            )}
                            {!isInTrial && profile?.trial_ends_at && new Date(profile.trial_ends_at) < new Date() && (profile?.subscription_tier === 'free' || !profile?.subscription_tier) && (
                                <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-xs font-bold">
                                    Trial Expirado
                                </div>
                            )}
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
                                        Tudo do plano Gratuito
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Geração em lote de até 1.000 itens
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Salvar configuração
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Histórico
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Exportar CSV e JSON
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter className="mt-auto">
                                <Button
                                    className="w-full"
                                    variant={proConfig.variant}
                                    onClick={() => handleSubscribe("price_1SYSlbJzedEYbjzZMG9r6nw9")}
                                    disabled={proConfig.disabled || !!loading}
                                >
                                    {loading === "price_1SYSlbJzedEYbjzZMG9r6nw9" && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {proConfig.text}
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Business Plan */}
                        <Card className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-2xl">Business</CardTitle>
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
                                        Acesso a API
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Rate Limit elevado (50k/mês)
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        SLA Garantido (99.9%)
                                    </li>
                                    <li className="flex items-center">
                                        <Check className="h-4 w-4 mr-2 text-green-500" />
                                        Suporte Prioritário
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter className="mt-auto">
                                <Button
                                    className="w-full"
                                    variant={businessConfig.variant}
                                    onClick={() => handleSubscribe("price_1SYSliJzedEYbjzZ5kbNVHvI")}
                                    disabled={businessConfig.disabled || !!loading}
                                >
                                    {loading === "price_1SYSliJzedEYbjzZ5kbNVHvI" && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {businessConfig.text}
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
