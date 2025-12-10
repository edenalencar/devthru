import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'


export async function POST(req: Request) {
    try {
        console.log('[Checkout] Request received')
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            console.log('[Checkout] Unauthorized user')
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            console.error('STRIPE_SECRET_KEY is missing')
            throw new Error('Server configuration error')
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2025-11-17.clover',
        })

        console.log('[Checkout] User authenticated:', user.id)

        const bodyText = await req.text()
        console.log('[Checkout] Raw body:', bodyText)

        if (!bodyText) {
            throw new Error('Empty request body')
        }

        const { priceId } = JSON.parse(bodyText)
        console.log('[Checkout] Price ID:', priceId)
        console.log('Site URL:', process.env.NEXT_PUBLIC_APP_URL)

        if (!process.env.NEXT_PUBLIC_APP_URL) {
            throw new Error('NEXT_PUBLIC_APP_URL is not defined')
        }

        const session = await stripe.checkout.sessions.create({
            customer_email: user.email,
            client_reference_id: user.id,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
            metadata: {
                userId: user.id,
            },
        })

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        console.error('Stripe error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
