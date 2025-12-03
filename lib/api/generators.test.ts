import { describe, it, expect } from 'vitest'
import { generators } from './generators'

describe('API Generators', () => {
    it('should generate valid CPF', () => {
        const cpf = generators.cpf()
        expect(cpf).toBeDefined()
        expect(typeof cpf).toBe('string')
        expect(cpf.length).toBe(11)
    })

    it('should generate formatted CPF', () => {
        const cpf = generators.cpf({ formatted: true })
        expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    })

    it('should generate valid CNPJ', () => {
        const cnpj = generators.cnpj()
        expect(cnpj).toBeDefined()
        expect(cnpj.length).toBe(14)
    })

    it('should generate formatted CNPJ', () => {
        const cnpj = generators.cnpj({ formatted: true })
        expect(cnpj).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
    })

    it('should generate valid RG', () => {
        const rg = generators.rg()
        expect(rg).toBeDefined()
    })

    it('should generate License Plate (Mercosul)', () => {
        const plate = generators['license-plate']({ type: 'mercosul' })
        expect(plate).toMatch(/^[A-Z]{3}\d[A-Z]\d{2}$/)
    })

    it('should generate License Plate (Old)', () => {
        const plate = generators['license-plate']({ type: 'old' })
        expect(plate).toMatch(/^[A-Z]{3}-\d{4}$/)
    })

    it('should generate Renavam', () => {
        const renavam = generators.renavam()
        expect(renavam).toBeDefined()
        expect(renavam.length).toBe(11)
    })

    it('should generate Chassis', () => {
        const chassis = generators.chassis()
        expect(chassis).toBeDefined()
        expect(chassis.length).toBe(17)
    })

    it('should generate Credit Card', () => {
        const card = generators['credit-card']()
        expect(card).toBeDefined()
        expect(card.length).toBeGreaterThan(12)
    })

    it('should generate IBAN', () => {
        const iban = generators.iban()
        expect(iban).toBeDefined()
        expect(iban.startsWith('BR')).toBe(true)
    })
})
