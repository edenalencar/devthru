import { NextResponse } from 'next/server'

export interface ApiError {
    code: string
    message: string
    details?: any
}

export class ApiErrorResponse extends Error {
    constructor(
        public statusCode: number,
        public code: string,
        message: string,
        public details?: any
    ) {
        super(message)
        this.name = 'ApiErrorResponse'
    }
}

// Error codes
export const ErrorCodes = {
    INVALID_API_KEY: 'INVALID_API_KEY',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
    INVALID_INPUT: 'INVALID_INPUT',
    TOOL_NOT_FOUND: 'TOOL_NOT_FOUND',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
} as const

// Error factory functions
export function invalidApiKey(message = 'Invalid or missing API key') {
    return new ApiErrorResponse(401, ErrorCodes.INVALID_API_KEY, message)
}

export function rateLimitExceeded(details?: any) {
    return new ApiErrorResponse(
        429,
        ErrorCodes.RATE_LIMIT_EXCEEDED,
        'Rate limit exceeded. Upgrade to Pro for unlimited access.',
        details
    )
}

export function invalidInput(message: string, details?: any) {
    return new ApiErrorResponse(400, ErrorCodes.INVALID_INPUT, message, details)
}

export function toolNotFound(tool: string) {
    return new ApiErrorResponse(
        404,
        ErrorCodes.TOOL_NOT_FOUND,
        `Tool '${tool}' not found`,
        { tool }
    )
}

export function internalError(message = 'Internal server error') {
    return new ApiErrorResponse(500, ErrorCodes.INTERNAL_ERROR, message)
}

// Error response formatter
export function errorResponse(error: ApiErrorResponse | Error) {
    if (error instanceof ApiErrorResponse) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: error.code,
                    message: error.message,
                    details: error.details,
                },
            },
            { status: error.statusCode }
        )
    }

    // Unknown error
    console.error('Unexpected error:', error)
    return NextResponse.json(
        {
            success: false,
            error: {
                code: ErrorCodes.INTERNAL_ERROR,
                message: 'An unexpected error occurred',
            },
        },
        { status: 500 }
    )
}

// Success response formatter
export function successResponse(data: any, status = 200) {
    return NextResponse.json(
        {
            success: true,
            ...data,
        },
        { status }
    )
}
