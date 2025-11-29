import { NextRequest } from 'next/server'
import { validateApiKey, getCorsHeaders } from '@/lib/api/middleware'
import { checkRateLimit, trackApiUsage, getRateLimitHeaders } from '@/lib/api/rate-limit'
import {
    errorResponse,
    successResponse,
    invalidInput,
    toolNotFound,
    rateLimitExceeded,
} from '@/lib/api/error-handler'
import { generators, isValidTool } from '@/lib/api/generators'

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: getCorsHeaders(),
    })
}

export async function POST(
    request: NextRequest,
    { params }: { params: { tool: string } }
) {
    const startTime = Date.now()
    const corsHeaders = getCorsHeaders()

    try {
        // Validate API key
        const auth = await validateApiKey(request)

        // Check rate limit
        const rateLimit = await checkRateLimit(auth.userId, auth.tier)
        if (!rateLimit.allowed) {
            const response = errorResponse(
                rateLimitExceeded({
                    used: rateLimit.used,
                    limit: rateLimit.limit,
                    resetAt: rateLimit.resetAt,
                })
            )

            // Add rate limit headers
            const headers = new Headers(response.headers)
            Object.entries({ ...corsHeaders, ...getRateLimitHeaders(rateLimit) }).forEach(
                ([key, value]) => headers.set(key, value)
            )

            return new Response(response.body, {
                status: response.status,
                headers,
            })
        }

        // Validate tool
        const tool = params.tool
        if (!isValidTool(tool)) {
            return errorResponse(toolNotFound(tool))
        }

        // Parse request body
        const body = await request.json().catch(() => ({}))
        const quantity = Math.min(Math.max(1, body.quantity || 1), 100) // Max 100 per request
        const options = body.options || {}

        // Generate data
        const generator = generators[tool]
        const results = Array.from({ length: quantity }, () => generator(options))

        // Track usage
        const responseTime = Date.now() - startTime
        await trackApiUsage(
            auth.userId,
            auth.apiKeyId,
            tool,
            `/api/v1/generate/${tool}`,
            responseTime,
            200
        )

        // Return response with rate limit headers
        const response = successResponse({
            data: quantity === 1 ? results[0] : results,
            count: quantity,
        })

        const headers = new Headers(response.headers)
        Object.entries({ ...corsHeaders, ...getRateLimitHeaders(rateLimit) }).forEach(
            ([key, value]) => headers.set(key, value)
        )

        return new Response(response.body, {
            status: response.status,
            headers,
        })
    } catch (error: any) {
        // Track failed request
        const responseTime = Date.now() - startTime
        if (error.userId) {
            await trackApiUsage(
                error.userId,
                null,
                params.tool,
                `/api/v1/generate/${params.tool}`,
                responseTime,
                error.statusCode || 500
            )
        }

        const response = errorResponse(error)
        const headers = new Headers(response.headers)
        Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value))

        return new Response(response.body, {
            status: response.status,
            headers,
        })
    }
}
