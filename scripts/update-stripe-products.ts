import Stripe from 'stripe'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-11-20.acacia' as any, // Use latest or matching version
})

import { STRIPE_PLANS } from '../lib/stripe/plans'

const PRICES = {
    PRO: STRIPE_PLANS.PRO.priceId,
    BUSINESS: STRIPE_PLANS.BUSINESS.priceId,
}

async function updateProductNames() {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error('❌ STRIPE_SECRET_KEY not found in .env.local')
        process.exit(1)
    }

    console.log('🔄 Updating Stripe product names...')

    try {
        // Update Pro Plan Product
        const proPrice = await stripe.prices.retrieve(PRICES.PRO)
        if (typeof proPrice.product === 'string') {
            await stripe.products.update(proPrice.product, {
                name: 'Pro',
            })
            console.log('✅ Updated Pro product name')
        }

        // Update Business Plan Product
        const businessPrice = await stripe.prices.retrieve(PRICES.BUSINESS)
        if (typeof businessPrice.product === 'string') {
            await stripe.products.update(businessPrice.product, {
                name: 'Business',
            })
            console.log('✅ Updated Business product name (was Enterprise)')
        }

        console.log('🎉 All updates completed successfully!')
    } catch (error) {
        console.error('❌ Error updating Stripe products:', error)
        process.exit(1)
    }
}

updateProductNames()
