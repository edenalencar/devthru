import { NextRequest } from 'next/server'
import { validateApiKey, getCorsHeaders } from '@/lib/api/middleware'
import { errorResponse, successResponse } from '@/lib/api/error-handler'
import { createClient } from '@/lib/supabase/server'

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: getCorsHeaders(),
    })
}

export async function GET(request: NextRequest) {
    const corsHeaders = getCorsHeaders()

    try {
        // Validate API key
        const auth = await validateApiKey(request)

        const supabase = await createClient()

        // Get current month start
        const now = new Date()
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

        // Get usage count for current month
        const { count, error: countError } = await supabase
            .from('api_usage')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', auth.userId)
            .gte('created_at', monthStart.toISOString())

        if (countError) {
            throw countError
        }

        // Get top tools
        const { data: toolsData, error: toolsError } = await supabase
            .from('api_usage')
            .select('tool_id')
            .eq('user_id', auth.userId)
            .gte('created_at', monthStart.toISOString())

        if (toolsError) {
            throw toolsError
        }

        // Count by tool
        const toolCounts = toolsData.reduce((acc: Record<string, number>, item: { tool_id: string }) => {
            acc[item.tool_id] = (acc[item.tool_id] || 0) + 1
            return acc
        }, {})

        const topTools = Object.entries(toolCounts)
            .map(([tool, count]) => ({ tool, count }))
            .sort((a, b) => (b.count as number) - (a.count as number))
            .slice(0, 5)

        // Determine limit based on tier
        const limit = auth.tier === 'free' ? 1000 : -1
        const used = count || 0
        const remaining = limit === -1 ? -1 : Math.max(0, limit - used)

        const response = successResponse({
            period: 'monthly',
            used,
            limit,
            remaining,
            resetAt: nextMonth.toISOString(),
            topTools,
        })

        const headers = new Headers(response.headers)
        Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value))

        return new Response(response.body, {
            status: response.status,
            headers,
        })
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        const response = errorResponse(error)
        const headers = new Headers(response.headers)
        Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value))

        return new Response(response.body, {
            status: response.status,
            headers,
        })
    }
}
