"use server"

import { createClient } from "../supabase/server"
import { createAdminClient } from "../supabase/admin"
import { randomBytes } from "crypto"

export async function generateApiKey() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    // Generate a random API key
    const apiKey = `dk_${randomBytes(24).toString('hex')}`

    // api_key is not writable by end users, so the write goes through the service role
    const { error } = await createAdminClient()
        .from('profiles')
        // @ts-expect-error
        .update({ api_key: apiKey })
        .eq('id', user.id)

    if (error) throw error

    return apiKey
}

export async function revokeApiKey() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Unauthorized")
    }

    const { error } = await createAdminClient()
        .from('profiles')
        // @ts-expect-error
        .update({ api_key: null })
        .eq('id', user.id)

    if (error) throw error
}
