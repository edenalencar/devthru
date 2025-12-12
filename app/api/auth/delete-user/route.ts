import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";

export async function DELETE() {
    try {
        // 1. Verify the user is logged in using the standard server client
        const supabase = await createServerClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // 2. Create Admin Client
        // We need the service role key to delete from auth.users
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!serviceRoleKey) {
            console.error("SUPABASE_SERVICE_ROLE_KEY is missing");
            return new NextResponse("Server Configuration Error", { status: 500 });
        }

        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            serviceRoleKey,
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        );


        // 3a. Cancel Stripe Subscription if exists
        // We query the profile before deleting it to get the Stripe IDs
        const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("stripe_subscription_id, stripe_customer_id")
            .eq("id", user.id)
            .single();

        if (profile?.stripe_subscription_id) {
            try {
                console.log(`Cancelling subscription ${profile.stripe_subscription_id} for user ${user.id} before deletion`);
                await stripe.subscriptions.cancel(profile.stripe_subscription_id);
            } catch (stripeError) {
                console.error("Error cancelling subscription during account deletion:", stripeError);
                // We log but continue, as we don't want to block account deletion if Stripe fails
                // Ideally this should be handled by a cleanup job or manual intervention if it fails
            }
        }

        // 3. Delete from public.profiles first to ensure cleanup
        // We use the admin client to bypass any RLS that might prevent deletion
        const { error: profileError } = await supabaseAdmin
            .from("profiles")
            .delete()
            .eq("id", user.id);

        if (profileError) {
            console.error("Error deleting profile:", profileError);
            // We continue to delete the auth user even if profile deletion fails (or if it was already deleted)
        }

        // 4. Delete the user from Auth
        const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
            user.id
        );

        if (deleteError) {
            console.error("Error deleting user:", deleteError);
            return new NextResponse("Error deleting account", { status: 500 });
        }

        return new NextResponse("Account deleted successfully", { status: 200 });

    } catch (error) {
        console.error("Unexpected error in delete-user:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
