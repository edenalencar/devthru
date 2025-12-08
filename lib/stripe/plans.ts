export const STRIPE_PLANS = {
    PRO: {
        priceId: 'price_1SYSlbJzedEYbjzZMG9r6nw9',
        name: 'Pro',
        slug: 'pro'
    },
    BUSINESS: {
        priceId: 'price_1SYSliJzedEYbjzZ5kbNVHvI',
        name: 'Business',
        slug: 'business'
    }
} as const

export type StripePlan = keyof typeof STRIPE_PLANS
