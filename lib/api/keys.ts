import { createClient } from "../supabase/server"
import { randomBytes } from "crypto"

export async function generateApiKey(userId: string) {
    const supabase = createClient()

    // Generate a random API key
    const apiKey = `dk_${randomBytes(24).toString('hex')}`

    const { error } = await supabase
        .from('profiles')
        .update({ api_key: apiKey })
        .eq('id', userId)

    if (error) throw error

    return apiKey
}

export async function validateApiKey(apiKey: string) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('profiles')
        .select('id, subscription_tier')
        .eq('api_key', apiKey)
        .single()

    if (error || !data) return null

    return data
}

export async function revokeApiKey(userId: string) {
    const supabase = createClient()

    const { error } = await supabase
        .from('profiles')
        .update({ api_key: null })
        .eq('id', userId)

    if (error) throw error
}
