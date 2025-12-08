export const STRIPE_PLANS = {
    PRO: {
        priceId: process.env.STRIPE_PRICE_ID_PRO || 'price_1ScDSBJzedEYbjzZhncJIJ73', // fallback for type safety, but should be env
        name: 'Pro',
        slug: 'pro'
    },
    BUSINESS: {
        priceId: process.env.STRIPE_PRICE_ID_BUSINESS || 'price_1ScDSCJzedEYbjzZjxpq5wPx',
        name: 'Business',
        slug: 'business'
    }
} as const

export type StripePlan = keyof typeof STRIPE_PLANS
