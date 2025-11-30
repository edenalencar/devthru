"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function saveConfiguration(toolId: string, name: string, configuration: any) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("User not authenticated")
    }

    const { error } = await supabase
        .from("user_configurations")
        .insert({
            user_id: user.id,
            tool_id: toolId,
            name,
            configuration,
        })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath(`/tools`)
    return { success: true }
}

export async function getConfigurations(toolId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return []
    }

    const { data, error } = await supabase
        .from("user_configurations")
        .select("*")
        .eq("user_id", user.id)
        .eq("tool_id", toolId)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching configurations:", error)
        return []
    }

    return data
}

export async function deleteConfiguration(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("User not authenticated")
    }

    const { error } = await supabase
        .from("user_configurations")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id)

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath(`/tools`)
    return { success: true }
}
