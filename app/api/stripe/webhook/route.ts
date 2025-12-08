/* eslint-disable @typescript-eslint/no-explicit-any */
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe/server"
import { createClient } from "@/lib/supabase/server"
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

    const session = event.data.object as Stripe.Checkout.Session
    const subscription = event.data.object as any

    const supabase = await createClient()

    if (event.type === "checkout.session.completed") {
        if (!session?.metadata?.userId) {
            return new NextResponse("User ID is missing in metadata", { status: 400 })
        }

        const subscriptionId = session.subscription as string

        // Retrieve subscription to get customer ID if needed, or just use session.customer
        const sub = await stripe.subscriptions.retrieve(subscriptionId) as any

        const priceId = sub.items.data[0].price.id
        let plan = 'pro'

        if (priceId === STRIPE_PLANS.BUSINESS.priceId) {
            plan = STRIPE_PLANS.BUSINESS.slug
        } else if (priceId === STRIPE_PLANS.PRO.priceId) {
            plan = STRIPE_PLANS.PRO.slug
        }

        await (supabase
            .from("profiles") as any)
            .update({
                subscription_tier: plan,
                stripe_subscription_id: subscriptionId,
                stripe_customer_id: sub.customer as string,
                trial_ends_at: null, // Clear trial if they subscribed
                current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
                cancel_at_period_end: sub.cancel_at_period_end
            } as any)
            .eq("id", session.metadata.userId)
    }

    if (event.type === "customer.subscription.updated") {


        // Find user by subscription ID
        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("stripe_subscription_id", subscription.id)
            .single() as any

        if (profile) {
            const priceId = subscription.items.data[0].price.id
            let plan = 'pro'

            if (priceId === STRIPE_PLANS.BUSINESS.priceId) {
                plan = STRIPE_PLANS.BUSINESS.slug
            } else if (priceId === STRIPE_PLANS.PRO.priceId) {
                plan = STRIPE_PLANS.PRO.slug
            }

            await (supabase
                .from("profiles") as any)
                .update({
                    subscription_tier: plan,
                    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                    cancel_at_period_end: subscription.cancel_at_period_end
                } as any)
                .eq("id", profile.id)
        }
    }

    if (event.type === "customer.subscription.deleted") {
        // Find user by subscription ID
        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("stripe_subscription_id", subscription.id)
            .single() as any

        if (profile) {
            await (supabase
                .from("profiles") as any)
                .update({
                    subscription_tier: "free",
                    stripe_subscription_id: null,
                    // We keep stripe_customer_id for future reference
                } as any)
                .eq("id", profile.id)
        }
    }

    // Handle invoice.payment_failed if needed for grace period logic
    // For now we rely on Stripe's retry settings and eventual subscription.deleted

    return new NextResponse(null, { status: 200 })
}
