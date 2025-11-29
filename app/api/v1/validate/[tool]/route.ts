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
import { validateCPF } from '@/lib/utils/validators/cpf'
import { validateCNPJ } from '@/lib/utils/validators/cnpj'

// Validator functions map
const validators: Record<string, (value: string) => boolean> = {
    cpf: validateCPF,
    cnpj: validateCNPJ,
}

function isValidatorTool(tool: string): tool is keyof typeof validators {
    return tool in validators
}

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
        if (!isValidatorTool(tool)) {
            return errorResponse(toolNotFound(tool))
        }

        // Parse request body
        const body = await request.json().catch(() => null)
        if (!body || !body.value) {
            return errorResponse(invalidInput('Missing required field: value'))
        }

        // Validate data
        const validator = validators[tool]
        const isValid = validator(body.value)

        // Track usage
        const responseTime = Date.now() - startTime
        await trackApiUsage(
            auth.userId,
            auth.apiKeyId,
            tool,
            `/api/v1/validate/${tool}`,
            responseTime,
            200
        )

        // Return response
        const response = successResponse({
            valid: isValid,
            value: body.value,
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
        const responseTime = Date.now() - startTime
        if (error.userId) {
            await trackApiUsage(
                error.userId,
                null,
                params.tool,
                `/api/v1/validate/${params.tool}`,
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
