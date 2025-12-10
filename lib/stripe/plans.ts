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
