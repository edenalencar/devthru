export const STRIPE_PLANS = {
    PRO: {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO!,
        name: 'Pro',
        slug: 'pro'
    },
    BUSINESS: {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BUSINESS!,
        name: 'Business',
        slug: 'business'
    }
} as const

export type StripePlan = keyof typeof STRIPE_PLANS

// Pagamento único de 12 meses, com valores em centavos
export const ANNUAL_PLANS = {
    pro: { name: 'Pro', amount: 29000, label: 'R$ 290' },
    business: { name: 'Business', amount: 99000, label: 'R$ 990' },
} as const

export type AnnualPlan = keyof typeof ANNUAL_PLANS

export function isAnnualPlan(plan: unknown): plan is AnnualPlan {
    return plan === 'pro' || plan === 'business'
}

export function getAnnualPeriodEnd(paidAt: Date): Date {
    const periodEnd = new Date(paidAt)
    periodEnd.setFullYear(periodEnd.getFullYear() + 1)
    return periodEnd
}

// A API 2025-11-17 moveu current_period_end da assinatura para o item
export function getSubscriptionPeriodEnd(subscription: {
    current_period_end?: number | null
    items?: { data?: { current_period_end?: number | null }[] }
}): number | null {
    return subscription.current_period_end ?? subscription.items?.data?.[0]?.current_period_end ?? null
}
