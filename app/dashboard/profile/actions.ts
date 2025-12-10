'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updatePasswordAction(password: string) {
    try {
        const supabase = await createClient()

        const { error } = await supabase.auth.updateUser({
            password: password
        })

        if (error) {
            console.error("Server Action Error:", error)
            return { success: false, error: error.message }
        }

        revalidatePath('/dashboard/profile')
        return { success: true }
    } catch (error: any) {
        console.error("Unexpected Server Action Error:", error)
        return { success: false, error: error.message || "Ocorreu um erro inesperado." }
    }
}
