import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

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
