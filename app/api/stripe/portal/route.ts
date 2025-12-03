import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe/server";

export async function POST() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { data: profile } = await supabase
            .from("profiles")
            .select("stripe_customer_id")
            .eq("id", user.id)
            .single();

        const userProfile = profile as { stripe_customer_id: string | null } | null

        if (!userProfile?.stripe_customer_id) {
            return new NextResponse("No Stripe customer found", { status: 400 });
        }

        // Ensure NEXT_PUBLIC_APP_URL is defined, fallback to localhost if not (for dev)
        const returnUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        const session = await stripe.billingPortal.sessions.create({
            customer: userProfile.stripe_customer_id,
            return_url: `${returnUrl}/dashboard/profile`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Error creating portal session:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
