import { describe, it, expect } from 'vitest'
import { validateCPF, generateCPF } from './cpf'
import { validateCNPJ, generateCNPJ } from './cnpj'
import { validatePIS, generatePIS } from './pis'
import { validateTituloEleitor, generateTituloEleitor } from './titulo-eleitor'
import { validateCNH, generateCNH } from './cnh'
import { validateIBAN, generateIBAN } from './iban'
import { validateIE, generateIE } from './inscricao-estadual'

describe('Validator Logic', () => {
    describe('CPF', () => {
        it('should validate a valid generated CPF', () => {
            const cpf = generateCPF()
            expect(validateCPF(cpf)).toBe(true)
        })

        it('should invalidate a CPF with wrong length', () => {
            expect(validateCPF('1234567890')).toBe(false)
        })

        it('should invalidate a CPF with all same digits', () => {
            expect(validateCPF('11111111111')).toBe(false)
        })

        it('should invalidate a known invalid CPF', () => {
            // 123.456.789-00 is mathematically invalid
            expect(validateCPF('12345678900')).toBe(false)
        })
    })

    describe('CNPJ', () => {
        it('should validate a valid generated CNPJ', () => {
            const cnpj = generateCNPJ()
            expect(validateCNPJ(cnpj)).toBe(true)
        })

        it('should invalidate a CNPJ with wrong length', () => {
            expect(validateCNPJ('1234567890123')).toBe(false)
        })

        it('should invalidate a CNPJ with all same digits', () => {
            expect(validateCNPJ('11111111111111')).toBe(false)
        })
    })

    describe('PIS', () => {
        it('should validate a valid generated PIS', () => {
            const pis = generatePIS()
            expect(validatePIS(pis)).toBe(true)
        })

        it('should invalidate a PIS with wrong length', () => {
            expect(validatePIS('1234567890')).toBe(false)
        })
    })

    describe('Título de Eleitor', () => {
        it('should validate a valid generated Título (SP)', () => {
            const titulo = generateTituloEleitor('SP')
            expect(validateTituloEleitor(titulo)).toBe(true)
        })

        it('should invalidate a Título with wrong length', () => {
            expect(validateTituloEleitor('12345678901')).toBe(false)
        })
    })

    describe('CNH', () => {
        it('should validate a valid generated CNH', () => {
            const cnh = generateCNH()
            expect(validateCNH(cnh)).toBe(true)
        })

        it('should invalidate a CNH with wrong length', () => {
            expect(validateCNH('1234567890')).toBe(false)
        })
    })

    describe('IBAN', () => {
        it('should validate a valid generated IBAN (BR)', () => {
            const iban = generateIBAN('BR')
            expect(validateIBAN(iban)).toBe(true)
        })

        it('should invalidate an IBAN with invalid characters', () => {
            expect(validateIBAN('BR12345678901234567890123!')).toBe(false)
        })
    })

    describe('Inscrição Estadual', () => {
        it('should validate a valid generated IE (SP)', () => {
            const ie = generateIE('SP')
            expect(validateIE(ie, 'SP')).toBe(true)
        })

        it('should validate a valid generated IE (AC)', () => {
            const ie = generateIE('AC')
            expect(validateIE(ie, 'AC')).toBe(true)
        })

        it('should invalidate an IE from wrong state', () => {
            // SP is 12 digits, AC is 13.
            const ieSP = generateIE('SP')
            expect(validateIE(ieSP, 'AC')).toBe(false)
        })
    })
})
