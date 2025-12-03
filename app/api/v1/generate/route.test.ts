import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './[tool]/route'
import { NextRequest } from 'next/server'

// Mock dependencies
vi.mock('@/lib/api/middleware', () => ({
    validateApiKey: vi.fn(),
    getCorsHeaders: () => ({}),
}))

vi.mock('@/lib/api/rate-limit', () => ({
    checkRateLimit: vi.fn(),
    trackApiUsage: vi.fn(),
    getRateLimitHeaders: () => ({}),
}))

vi.mock('@/lib/api/generators', () => ({
    generators: {
        cpf: () => '12345678901',
    },
    isValidTool: (tool: string) => tool === 'cpf',
}))

import { validateApiKey } from '@/lib/api/middleware'
import { checkRateLimit } from '@/lib/api/rate-limit'

describe('POST /api/v1/generate/[tool]', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return 403 if not on Business plan', async () => {
        // @ts-ignore
        validateApiKey.mockResolvedValue({ tier: 'pro' })

        const req = new NextRequest('http://localhost/api/v1/generate/cpf', {
            method: 'POST',
        })
        const params = Promise.resolve({ tool: 'cpf' })

        const res = await POST(req, { params })
        const data = await res.json()

        expect(res.status).toBe(403)
        expect(data.error.code).toBe('FORBIDDEN')
    })

    it('should return 429 if rate limit exceeded', async () => {
        // @ts-ignore
        validateApiKey.mockResolvedValue({ tier: 'business', userId: '123' })
        // @ts-ignore
        checkRateLimit.mockResolvedValue({ allowed: false })

        const req = new NextRequest('http://localhost/api/v1/generate/cpf', {
            method: 'POST',
        })
        const params = Promise.resolve({ tool: 'cpf' })

        const res = await POST(req, { params })
        const data = await res.json()

        expect(res.status).toBe(429)
        expect(data.error.code).toBe('RATE_LIMIT_EXCEEDED')
    })

    it('should return 404 if tool not found', async () => {
        // @ts-ignore
        validateApiKey.mockResolvedValue({ tier: 'business', userId: '123' })
        // @ts-ignore
        checkRateLimit.mockResolvedValue({ allowed: true })

        const req = new NextRequest('http://localhost/api/v1/generate/invalid-tool', {
            method: 'POST',
        })
        const params = Promise.resolve({ tool: 'invalid-tool' })

        const res = await POST(req, { params })
        const data = await res.json()

        expect(res.status).toBe(404)
        expect(data.error.code).toBe('TOOL_NOT_FOUND')
    })

    it('should return 200 and generated data on success', async () => {
        // @ts-ignore
        validateApiKey.mockResolvedValue({ tier: 'business', userId: '123' })
        // @ts-ignore
        checkRateLimit.mockResolvedValue({ allowed: true })

        const req = new NextRequest('http://localhost/api/v1/generate/cpf', {
            method: 'POST',
            body: JSON.stringify({}),
        })
        const params = Promise.resolve({ tool: 'cpf' })

        const res = await POST(req, { params })
        const data = await res.json()

        expect(res.status).toBe(200)
        expect(data.success).toBe(true)
        expect(data.data).toBe('12345678901')
    })
})
