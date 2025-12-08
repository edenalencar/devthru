import { NextRequest } from 'next/server'
import { createClient } from '../supabase/server'
import { invalidApiKey } from './error-handler'

export interface AuthResult {
    userId: string
    tier: string
    apiKeyId: string | null
}

export async function validateApiKey(request: NextRequest): Promise<AuthResult> {
    const apiKey = request.headers.get('x-api-key')

    if (!apiKey) {
        throw invalidApiKey('API key is required. Include it in the x-api-key header.')
    }

    const supabase = await createClient()

    // Check if using old system (api_key in profiles)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profileData } = await (supabase
        .from('profiles') as any)
        .select('id, subscription_tier')
        .eq('api_key', apiKey)
        .single()

    if (profileData) {
        return {
            userId: profileData.id,
            tier: profileData.subscription_tier || 'free',
            apiKeyId: null, // Old system doesn't have key IDs
        }
    }

    // Check new system (api_keys table) - if it exists
    // For now, we'll just use the old system
    // TODO: Implement multi-key system later

    throw invalidApiKey('Invalid API key')
}

export function getCorsHeaders(): Record<string, string> {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    }
}
