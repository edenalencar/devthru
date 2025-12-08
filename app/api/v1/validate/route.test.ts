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

vi.mock('@/lib/utils/validators/cpf', () => ({
    validateCPF: (value: string) => value === 'valid-cpf',
}))

vi.mock('@/lib/utils/validators/cnpj', () => ({
    validateCNPJ: (value: string) => value === 'valid-cnpj',
}))

vi.mock('@/lib/utils/validators/iban', () => ({
    validateIBAN: (value: string) => value === 'valid-iban',
}))

import { validateApiKey } from '@/lib/api/middleware'
import { checkRateLimit } from '@/lib/api/rate-limit'

describe('POST /api/v1/validate/[tool]', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return 403 if not on Business plan', async () => {
        // @ts-ignore
        validateApiKey.mockResolvedValue({ tier: 'pro' })

        const req = new NextRequest('http://localhost/api/v1/validate/cpf', {
            method: 'POST',
        })
        const params = Promise.resolve({ tool: 'cpf' })

        const res = await POST(req, { params })
        const data = await res.json()

        expect(res.status).toBe(403)
        expect(data.error.code).toBe('FORBIDDEN')
    })

    it('should return 400 if value is missing', async () => {
        // @ts-ignore
        validateApiKey.mockResolvedValue({ tier: 'business', userId: '123' })
        // @ts-ignore
        checkRateLimit.mockResolvedValue({ allowed: true })

        const req = new NextRequest('http://localhost/api/v1/validate/cpf', {
            method: 'POST',
            body: JSON.stringify({}),
        })
        const params = Promise.resolve({ tool: 'cpf' })

        const res = await POST(req, { params })
        const data = await res.json()

        expect(res.status).toBe(400)
        expect(data.error.code).toBe('INVALID_INPUT')
    })

    it('should return true for valid input', async () => {
        // @ts-ignore
        validateApiKey.mockResolvedValue({ tier: 'business', userId: '123' })
        // @ts-ignore
        checkRateLimit.mockResolvedValue({ allowed: true })

        const req = new NextRequest('http://localhost/api/v1/validate/cpf', {
            method: 'POST',
            body: JSON.stringify({ value: 'valid-cpf' }),
        })
        const params = Promise.resolve({ tool: 'cpf' })

        const res = await POST(req, { params })
        const data = await res.json()

        expect(res.status).toBe(200)
        expect(data.success).toBe(true)
        expect(data.valid).toBe(true)
    })

    it('should return false for invalid input', async () => {
        // @ts-ignore
        validateApiKey.mockResolvedValue({ tier: 'business', userId: '123' })
        // @ts-ignore
        checkRateLimit.mockResolvedValue({ allowed: true })

        const req = new NextRequest('http://localhost/api/v1/validate/cpf', {
            method: 'POST',
            body: JSON.stringify({ value: 'invalid-cpf' }),
        })
        const params = Promise.resolve({ tool: 'cpf' })

        const res = await POST(req, { params })
        const data = await res.json()

        expect(res.status).toBe(200)
        expect(data.success).toBe(true)
        expect(data.valid).toBe(false)
    })
})
