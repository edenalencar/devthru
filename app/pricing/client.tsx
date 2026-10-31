"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
// import { stripePromise } from "@/lib/stripe/client"
import { useUser } from "@/lib/hooks/use-user"
import { differenceInDays } from "date-fns"
import { ANNUAL_PLANS, AnnualPlan, STRIPE_PLANS, isAnnualPlan } from "@/lib/stripe/plans"
import { trackBeginCheckout } from "@/lib/analytics/checkout"

// Ligar somente depois que a Stripe liberar o Pix na conta
const PIX_ENABLED = process.env.NEXT_PUBLIC_PIX_ENABLED === "true"
const ANNUAL_CHECKOUT_PREFIX = "annual-"

function PricingContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { user, profile, isInTrial, loading: userLoading } = useUser()
    const [loading, setLoading] = useState<string | null>(null)
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
    const autoCheckoutTriggered = useRef(false)

    const daysRemaining = profile?.trial_ends_at
        ? Math.max(0, differenceInDays(new Date(profile.trial_ends_at), new Date()))
        : 0

    const handleSubscribe = async (priceId: string) => {
        try {
            setLoading(priceId)

            if (!user) {
                const checkoutRedirect = `/pricing?action=checkout&plan=${encodeURIComponent(priceId)}`
                router.push(`/login?redirect=${encodeURIComponent(checkoutRedirect)}`)
                return
            }

            const annualPlan = priceId.startsWith(ANNUAL_CHECKOUT_PREFIX)
                ? priceId.slice(ANNUAL_CHECKOUT_PREFIX.length)
                : undefined

            if (isAnnualPlan(annualPlan)) {
                trackBeginCheckout(annualPlan, 'annual')
            } else {
                trackBeginCheckout(priceId === STRIPE_PLANS.BUSINESS.priceId ? 'business' : 'pro', 'monthly')
            }

            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(annualPlan ? { annualPlan } : { priceId }),
            })

            let data
            try {
                data = await response.json()
            } catch {
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
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Erro ao processar pagamento")
        } finally {
            setLoading(null)
        }
    }

    // Auto-checkout após login com redirect
    useEffect(() => {
        if (userLoading || !user) return
        const action = searchParams.get('action')
        const plan = searchParams.get('plan')

        if (action === 'checkout' && plan && !autoCheckoutTriggered.current) {
            autoCheckoutTriggered.current = true
            handleSubscribe(plan)
        }
    }, [user, userLoading, searchParams])

    const handlePortal = async () => {
        try {
            setLoading('portal')
            const response = await fetch("/api/stripe/portal", {
                method: "POST",
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Erro ao abrir o portal")
            }

            if (data.url) {
                window.location.href = data.url
            }
        } catch {
            toast.error("Erro ao redirecionar para o portal")
        } finally {
            setLoading(null)
        }
    }

    const getButtonConfig = (plan: 'free' | 'pro' | 'business') => {
        if (userLoading) {
            return {
                text: "Carregando...",
                disabled: true,
                variant: "outline" as const,
                action: () => { }
            }
        }

        const currentTier = profile?.subscription_tier || 'free'
        const isCurrentPlan = currentTier === plan

        // Helper to determine action
        const getAction = (targetPriceId: string) => {
            // Se já é assinante de QUALQUER plano pago, manda pro Portal para gerenciar (Upgrade/Downgrade)
            if (currentTier !== 'free') {
                return handlePortal
            }
            // Se é Free ou Trial, vai pro Checkout assinar
            return () => handleSubscribe(targetPriceId)
        }

        // Cenário A: Usuário em Trial
        if (isInTrial) {
            if (plan === 'pro') {
                return {
                    text: "Assinar Plano Pro",
                    disabled: false,
                    variant: "default" as const,
                    action: () => handleSubscribe(STRIPE_PLANS.PRO.priceId)
                }
            }
            if (plan === 'business') {
                return {
                    text: "Fazer Upgrade para Business",
                    disabled: false,
                    variant: "default" as const,
                    action: () => handleSubscribe(STRIPE_PLANS.BUSINESS.priceId)
                }
            }
            // Free plan during trial
            return {
                text: "Plano Gratuito",
                disabled: true,
                variant: "outline" as const,
                action: () => { }
            }
        }

        // Cenário B: Usuário Pago (Assinante)
        if (currentTier !== 'free') {
            if (isCurrentPlan) {
                return {
                    text: "Plano Atual",
                    disabled: true,
                    variant: "outline" as const,
                    action: () => { }
                }
            }
            return {
                text: "Gerenciar Assinatura",
                disabled: false,
                variant: "default" as const,
                action: handlePortal
            }
        }

        // Cenário C: Usuário Free/Expirado
        if (plan === 'free') {
            return {
                text: "Plano Atual",
                disabled: true,
                variant: "outline" as const,
                action: () => { }
            }
        }

        return {
            text: `Assinar ${plan.charAt(0).toUpperCase() + plan.slice(1)}`,
            disabled: false,
            variant: (plan === 'business' ? "default" : "outline") as "default" | "outline",
            action: () => handleSubscribe(plan === 'pro' ? STRIPE_PLANS.PRO.priceId : STRIPE_PLANS.BUSINESS.priceId)
        }
    }

    const freeConfig = getButtonConfig('free')
    const proConfig = getButtonConfig('pro')
    const businessConfig = getButtonConfig('business')

    const canBuyAnnual = !userLoading && (profile?.subscription_tier || 'free') === 'free'
    const showAnnual = canBuyAnnual && billing === 'annual'

    const annualTarget = (plan: AnnualPlan) => `${ANNUAL_CHECKOUT_PREFIX}${plan}`

    const monthlyEquivalent = (plan: AnnualPlan) =>
        (ANNUAL_PLANS[plan].amount / 1200).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

    const renderPrice = (plan: AnnualPlan, monthlyLabel: string) => (
        <div className="mt-4">
            <span className="text-4xl font-bold">{showAnnual ? ANNUAL_PLANS[plan].label : monthlyLabel}</span>
            <span className="text-muted-foreground">{showAnnual ? "/ano" : "/mês"}</span>
            {showAnnual && (
                <p className="text-sm text-muted-foreground mt-1">
                    Equivale a {monthlyEquivalent(plan)}/mês
                </p>
            )}
        </div>
    )

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 py-12">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Planos e Preços</h1>
                        <p className="text-xl text-muted-foreground">
                            Escolha o plano ideal para a sua produtividade e fluxo de trabalho
                        </p>
                    </div>

                    {canBuyAnnual && (
                        <div className="flex flex-col items-center gap-2 mb-10">
                            <div role="group" aria-label="Período de cobrança" className="inline-flex gap-1 rounded-lg border p-1">
                                <Button
                                    size="sm"
                                    variant={billing === 'monthly' ? 'default' : 'ghost'}
                                    aria-pressed={billing === 'monthly'}
                                    onClick={() => setBilling('monthly')}
                                >
                                    Mensal
                                </Button>
                                <Button
                                    size="sm"
                                    variant={billing === 'annual' ? 'default' : 'ghost'}
                                    aria-pressed={billing === 'annual'}
                                    onClick={() => setBilling('annual')}
                                >
                                    Anual: 2 meses grátis
                                </Button>
                            </div>
                            {showAnnual && (
                                <p className="text-sm text-muted-foreground text-center">
                                    Pagamento único de 12 meses{PIX_ENABLED ? " no Pix ou cartão" : ""}, sem renovação automática.
                                </p>
                            )}
                        </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Free Plan */}
                        <Card className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-2xl">Gratuito</CardTitle>
                                <CardDescription>Para uso pessoal e individual</CardDescription>
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
                        <Card className={`flex flex-col relative overflow-hidden ${isInTrial ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                            {isInTrial && (
                                <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                                    Expira em {daysRemaining} dias
                                </div>
                            )}
                            {!isInTrial && profile?.trial_ends_at && new Date(profile.trial_ends_at) < new Date() && (profile?.subscription_tier === 'free' || !profile?.subscription_tier) && (
                                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                                    Trial Expirado
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-2xl">Pro</CardTitle>
                                <CardDescription>Para profissionais autônomos e freelancers</CardDescription>
                                {renderPrice('pro', 'R$ 29')}
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
                                    onClick={showAnnual ? () => handleSubscribe(annualTarget('pro')) : proConfig.action}
                                    disabled={(!showAnnual && proConfig.disabled) || !!loading}
                                >
                                    {loading === (showAnnual ? annualTarget('pro') : (proConfig.action === handlePortal ? 'portal' : STRIPE_PLANS.PRO.priceId)) && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {showAnnual ? 'Pagar 1 ano do Pro' : proConfig.text}
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Business Plan */}
                        <Card className="border-primary border-2 relative overflow-hidden flex flex-col shadow-xl lg:scale-105 z-10">
                            <div className="absolute top-0 inset-x-0 bg-primary text-primary-foreground py-1.5 text-center text-sm font-bold">
                                RECOMENDADO
                            </div>
                            {/* Trial Expirado moved to Pro Plan */}
                            <CardHeader className="pt-12">
                                <CardTitle className="text-2xl">Business</CardTitle>
                                <CardDescription>Para equipes, escritórios e empresas</CardDescription>
                                {renderPrice('business', 'R$ 99')}
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
                                        Rate Limit elevado (1M/mês)
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
                                    onClick={showAnnual ? () => handleSubscribe(annualTarget('business')) : businessConfig.action}
                                    disabled={(!showAnnual && businessConfig.disabled) || !!loading}
                                >
                                    {loading === (showAnnual ? annualTarget('business') : (businessConfig.action === handlePortal ? 'portal' : STRIPE_PLANS.BUSINESS.priceId)) && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {showAnnual ? 'Pagar 1 ano do Business' : businessConfig.text}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* FAQ & Billing Information Section */}
                    <div className="mt-20 max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold tracking-tight mb-3">Dúvidas Frequentes sobre Assinaturas</h2>
                            <p className="text-muted-foreground text-base">
                                Informações claras sobre faturamento, cancelamento e recursos da plataforma
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="border-muted/70">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base font-semibold">Como funciona o período de teste de 7 dias?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                                    Ao criar sua conta no DevThru, você ganha acesso imediato a todas as funcionalidades do plano Pro por 7 dias corridos. Não exigimos cartão de crédito antecipado para iniciar o teste. Ao fim do período, sua conta volta automaticamente para o plano gratuito sem surpresas.
                                </CardContent>
                            </Card>

                            <Card className="border-muted/70">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base font-semibold">Posso cancelar ou alterar meu plano quando quiser?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                                    Sim, sem amarras nem multas de fidelidade. Você pode gerenciar seu plano diretamente pelo painel do usuário a qualquer momento. Ao cancelar, o plano contratado continuará ativo até o encerramento do período mensal já pago. O plano anual é um pagamento único de 12 meses, sem renovação automática.
                                </CardContent>
                            </Card>

                            <Card className="border-muted/70">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base font-semibold">Quais formas de pagamento são aceitas?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                                    Processamos pagamentos de forma segura através da Stripe, aceitando os principais cartões de crédito nacionais e internacionais (Visa, MasterCard, Elo, Hipercard, American Express){PIX_ENABLED ? ". O plano anual também pode ser pago via Pix" : ""}. Para faturamento por boleto, entre em contato com nosso time comercial.
                                </CardContent>
                            </Card>

                            <Card className="border-muted/70">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base font-semibold">Como funciona a emissão de Nota Fiscal?</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground leading-relaxed">
                                    Emitimos nota fiscal de serviço para todas as assinaturas empresariais no Brasil. Os dados cadastrais da sua empresa (CNPJ e Razão Social) informados na contratação são vinculados aos recibos e notas fiscais encaminhados automaticamente por e-mail após a confirmação do pagamento.
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export function PricingPage() {
    return (
        <Suspense fallback={null}>
            <PricingContent />
        </Suspense>
    )
}
