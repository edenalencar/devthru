import { sendGTMEvent } from '@/lib/gtm'
import { ANNUAL_PLANS, AnnualPlan, MONTHLY_PLAN_PRICES } from '@/lib/stripe/plans'

export type BillingPeriod = 'monthly' | 'annual'

export function isBillingPeriod(billing: unknown): billing is BillingPeriod {
    return billing === 'monthly' || billing === 'annual'
}

function getEcommerce(plan: AnnualPlan, billing: BillingPeriod) {
    const value = billing === 'annual' ? ANNUAL_PLANS[plan].amount / 100 : MONTHLY_PLAN_PRICES[plan]

    return {
        currency: 'BRL',
        value,
        items: [
            {
                item_id: `${plan}_${billing}`,
                item_name: `DevThru ${ANNUAL_PLANS[plan].name} ${billing === 'annual' ? 'Anual' : 'Mensal'}`,
                price: value,
                quantity: 1,
            },
        ],
    }
}

export function trackBeginCheckout(plan: AnnualPlan, billing: BillingPeriod) {
    sendGTMEvent({ event: 'begin_checkout', ecommerce: getEcommerce(plan, billing) })
}

export function trackPurchase(transactionId: string, plan: AnnualPlan, billing: BillingPeriod) {
    sendGTMEvent({
        event: 'purchase',
        ecommerce: { transaction_id: transactionId, ...getEcommerce(plan, billing) },
    })
}
