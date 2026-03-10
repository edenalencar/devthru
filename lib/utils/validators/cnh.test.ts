import { describe, it, expect } from 'vitest'
import { generateCNH, validateCNH, formatCNH } from './cnh'

describe('CNH Validator & Generator', () => {
    it('should generate a CNH with exactly 11 digits', () => {
        const cnh = generateCNH()
        expect(cnh).toHaveLength(11)
        expect(cnh).toMatch(/^\d{11}$/)
    })

    it('should generate valid CNHs that pass the validation algorithm', () => {
        for (let i = 0; i < 100; i++) {
            const cnh = generateCNH()
            const isValid = validateCNH(cnh)
            expect(isValid).toBe(true)
        }
    })

    it('should correctly format a CNH', () => {
        // Since formatCNH currently just strips non-digits and takes the first 11,
        // let's test that behavior.
        const cnh = generateCNH()
        const formatted = formatCNH(`A${cnh}B`)
        expect(formatted).toBe(cnh)
    })

    it('should reject invalid CNHs', () => {
        expect(validateCNH('12345678901')).toBe(false)
        expect(validateCNH('11111111111')).toBe(false) // Repeated digits
        expect(validateCNH('00000000000')).toBe(false)
        expect(validateCNH('')).toBe(false)
        expect(validateCNH('123')).toBe(false)
    })
})
