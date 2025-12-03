import { createClient } from '../supabase/server'

interface RateLimitResult {
    allowed: boolean
    used: number
    limit: number
    remaining: number
    resetAt: Date
}

// Rate limits by subscription tier
const RATE_LIMITS = {
    free: 1000, // 1000 requests per month
    pro: -1, // Unlimited
    business: -1, // Unlimited
} as const

// Get the first day of next month
function getNextMonthStart(): Date {
    const now = new Date()
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    return nextMonth
}

// Get the first day of current month
function getCurrentMonthStart(): Date {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
}

export async function checkRateLimit(
    userId: string,
    tier: string = 'free'
): Promise<RateLimitResult> {
    const supabase = await createClient()

    // Pro and Business have unlimited access
    if (tier === 'pro' || tier === 'business') {
        return {
            allowed: true,
            used: 0,
            limit: -1,
            remaining: -1,
            resetAt: getNextMonthStart(),
        }
    }

    // Get limit for tier
    const limit = RATE_LIMITS[tier as keyof typeof RATE_LIMITS] || RATE_LIMITS.free

    // Count API usage for current month
    const monthStart = getCurrentMonthStart()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count, error } = await (supabase
        .from('api_usage') as any)
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', monthStart.toISOString())

    if (error) {
        console.error('Error checking rate limit:', error)
        // On error, allow the request but log it
        return {
            allowed: true,
            used: 0,
            limit,
            remaining: limit,
            resetAt: getNextMonthStart(),
        }
    }

    const used = count || 0
    const remaining = Math.max(0, limit - used)
    const allowed = used < limit

    return {
        allowed,
        used,
        limit,
        remaining,
        resetAt: getNextMonthStart(),
    }
}

export async function trackApiUsage(
    userId: string,
    apiKeyId: string | null,
    toolId: string,
    endpoint: string,
    responseTimeMs: number,
    statusCode: number
): Promise<void> {
    const supabase = await createClient()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('api_usage') as any).insert({
        user_id: userId,
        api_key_id: apiKeyId,
        tool_id: toolId,
        endpoint,
        response_time_ms: responseTimeMs,
        status_code: statusCode,
    })

    if (error) {
        console.error('Error tracking API usage:', error)
    }
}

// Get rate limit headers for response
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
    return {
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': result.resetAt.toISOString(),
    }
}
