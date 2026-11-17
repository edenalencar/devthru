import { describe, it, expect } from 'vitest'
import { generatePerson } from '@/lib/utils/validators/person'
import { generatePhone } from '@/lib/utils/generators/contact'
import { COMMON_DDDS } from '@/lib/utils/generators/phone'
import { calculateRGCheckDigit } from '@/lib/utils/generators/rg'

describe('gerador de pessoa', () => {
    it('gera RG formatado com dígito verificador correto (padrão SP)', () => {
        for (let i = 0; i < 200; i++) {
            const { rg } = generatePerson()
            expect(rg).toMatch(/^\d{2}\.\d{3}\.\d{3}-[\dX]$/)
            const clean = rg.replace(/[.-]/g, '')
            expect(clean.slice(8)).toBe(calculateRGCheckDigit(clean.slice(0, 8)))
        }
    })

    it('usa apenas DDDs que existem', () => {
        expect(COMMON_DDDS).toHaveLength(67)
        for (let i = 0; i < 500; i++) {
            for (const phone of [generatePhone(true), generatePhone(false)]) {
                const ddd = phone.match(/^\((\d{2})\)/)?.[1]
                expect(COMMON_DDDS).toContain(ddd)
            }
        }
    })

    it('mantém os formatos de celular e fixo', () => {
        for (let i = 0; i < 200; i++) {
            expect(generatePhone(true)).toMatch(/^\(\d{2}\) 9\d{4}-\d{4}$/)
            expect(generatePhone(false)).toMatch(/^\(\d{2}\) [2-5]\d{3}-\d{4}$/)
        }
    })
})
