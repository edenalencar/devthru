/* eslint-disable @typescript-eslint/no-explicit-any */
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/server"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"
import { STRIPE_PLANS } from "@/lib/stripe/plans"

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get("Stripe-Signature") as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    console.log(`[Webhook] Processing event: ${event.type}`)

    const session = event.data.object as Stripe.Checkout.Session
    const subscription = event.data.object as any

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    if (event.type === "checkout.session.completed") {
        const userId = session?.metadata?.userId
        console.log(`[Webhook] checkout.session.completed for user: ${userId}`)

        if (!userId) {
            console.error('[Webhook] User ID is missing in metadata')
            return new NextResponse("User ID is missing in metadata", { status: 400 })
        }

        const subscriptionId = session.subscription as string

        try {
            // Retrieve subscription to get customer ID if needed, or just use session.customer
            const sub = await stripe.subscriptions.retrieve(subscriptionId) as any

            const priceId = sub.items.data[0].price.id
            let plan = 'pro'

            if (priceId === STRIPE_PLANS.BUSINESS.priceId) {
                plan = STRIPE_PLANS.BUSINESS.slug
            } else if (priceId === STRIPE_PLANS.PRO.priceId) {
                plan = STRIPE_PLANS.PRO.slug
            }

            console.log(`[Webhook] Updating profile for user ${userId} to plan ${plan}`)

            const { error } = await supabase
                .from("profiles")
                .update({
                    subscription_tier: plan,
                    stripe_subscription_id: subscriptionId,
                    stripe_customer_id: sub.customer as string,
                    trial_ends_at: null, // Clear trial if they subscribed
                    current_period_end: sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : new Date().toISOString(),
                    cancel_at_period_end: sub.cancel_at_period_end ?? false
                } as any)
                .eq("id", userId)

            if (error) {
                console.error('[Webhook] Error updating profile:', error)
                throw error
            }
            console.log('[Webhook] Profile updated successfully')
        } catch (error) {
            console.error('[Webhook] Error processing checkout session:', error)
            return new NextResponse('Error processing checkout session', { status: 500 })
        }
    }

    if (event.type === "customer.subscription.updated") {
        console.log(`[Webhook] customer.subscription.updated for subscription: ${subscription.id}`)

        try {
            // Find user by subscription ID
            const { data: profile } = await supabase
                .from("profiles")
                .select("id")
                .eq("stripe_subscription_id", subscription.id)
                .maybeSingle() as any

            if (profile) {
                const priceId = subscription.items.data[0].price.id
                let plan = 'pro'

                if (priceId === STRIPE_PLANS.BUSINESS.priceId) {
                    plan = STRIPE_PLANS.BUSINESS.slug
                } else if (priceId === STRIPE_PLANS.PRO.priceId) {
                    plan = STRIPE_PLANS.PRO.slug
                }

                console.log(`[Webhook] Updating subscription for user ${profile.id} to ${plan}`)

                const { error } = await supabase
                    .from("profiles")
                    .update({
                        subscription_tier: plan,
                        current_period_end: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : new Date().toISOString(),
                        cancel_at_period_end: subscription.cancel_at_period_end ?? false
                    } as any)
                    .eq("id", profile.id)

                if (error) {
                    console.error('[Webhook] Error updating profile subscription:', error)
                    throw error
                }
                console.log('[Webhook] Subscription updated successfully')
            } else {
                console.log('[Webhook] No profile found for subscription:', subscription.id)
            }
        } catch (error) {
            console.error('[Webhook] Error processing subscription update:', error)
            return new NextResponse('Error processing subscription update', { status: 500 })
        }
    }

    if (event.type === "customer.subscription.deleted") {
        console.log(`[Webhook] customer.subscription.deleted for subscription: ${subscription.id}`)
        // Find user by subscription ID
        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("stripe_subscription_id", subscription.id)
            .single() as any

        if (profile) {
            console.log(`[Webhook] Downgrading user ${profile.id} to free`)
            await supabase
                .from("profiles")
                .update({
                    subscription_tier: "free",
                    stripe_subscription_id: null,
                    // We keep stripe_customer_id for future reference
                } as any)
                .eq("id", profile.id)
        }
    }

    return new NextResponse(null, { status: 200 })
}
