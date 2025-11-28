import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const logToFile = (message: string) => {
    const logPath = path.join(process.cwd(), 'webhook.log')
    fs.appendFileSync(logPath, `${new Date().toISOString()} - ${message}\n`)
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
    const buf = await req.arrayBuffer()
    const body = Buffer.from(buf)
    const headerList = await headers()
    const signature = headerList.get('Stripe-Signature') as string

    console.log('[Webhook] Request received')
    logToFile(`[Webhook] Request received. Body length: ${body.length}`)

    if (!process.env.STRIPE_SECRET_KEY) {
        logToFile('[Webhook] STRIPE_SECRET_KEY missing')
        return new NextResponse('Server configuration error', { status: 500 })
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        logToFile('[Webhook] STRIPE_WEBHOOK_SECRET missing')
        return new NextResponse('Server configuration error', { status: 500 })
    }

    logToFile(`[Webhook] Using secret prefix: ${process.env.STRIPE_WEBHOOK_SECRET.substring(0, 10)}...`)

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-11-17.clover',
    })

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
        logToFile(`[Webhook] Event constructed: ${event.type}`)
    } catch (error: any) {
        logToFile(`[Webhook] Signature verification failed: ${error.message}`)
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as any

    if (event.type === 'checkout.session.completed') {
        logToFile('[Webhook] Processing checkout.session.completed')
        try {
            const subscriptionId = session.subscription as string
            logToFile(`[Webhook] Subscription ID: ${subscriptionId}`)

            const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any
            logToFile('[Webhook] Subscription retrieved')

            if (!session?.metadata?.userId) {
                logToFile('[Webhook] User ID missing in metadata')
                return new NextResponse('User id is required', { status: 400 })
            }

            logToFile(`[Webhook] Updating profile for user: ${session.metadata.userId}`)

            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    subscription_tier: 'pro',
                    updated_at: new Date().toISOString(),
                })
                .eq('id', session.metadata.userId)

            if (profileError) {
                logToFile(`[Webhook] Profile update error: ${profileError.message}`)
            } else {
                logToFile('[Webhook] Profile updated successfully')
            }

            const { error: subError } = await supabase
                .from('subscriptions')
                .insert({
                    user_id: session.metadata.userId,
                    stripe_subscription_id: subscription.id,
                    stripe_customer_id: subscription.customer as string,
                    plan_id: subscription.items.data[0].price.id,
                    status: subscription.status,
                    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                })

            if (subError) {
                logToFile(`[Webhook] Subscription insert error: ${subError.message}`)
            } else {
                logToFile('[Webhook] Subscription inserted successfully')
            }
        } catch (error: any) {
            logToFile(`[Webhook] Error processing checkout session: ${error.message}`)
            return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 })
        }
    }

    if (event.type === 'invoice.payment_succeeded') {
        console.log('[Webhook] Processing invoice.payment_succeeded')
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        ) as any

        const { error } = await supabase
            .from('subscriptions')
            .update({
                status: subscription.status,
                current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', subscription.id)

        if (error) {
            console.error('[Webhook] Subscription update error:', error)
        }
    }

    return new NextResponse(null, { status: 200 })
}
