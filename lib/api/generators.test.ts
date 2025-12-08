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

    it('should generate CNH', () => {
        const cnh = generators.cnh()
        expect(cnh).toBeDefined()
        expect(typeof cnh).toBe('string')
        expect(cnh.length).toBeGreaterThan(0)
    })

    it('should generate Inscricao Estadual', () => {
        const ie = generators['inscricao-estadual']({ uf: 'SP' })
        expect(ie).toBeDefined()
        expect(typeof ie).toBe('string')
    })

    it('should generate Titulo Eleitor', () => {
        const titulo = generators['titulo-eleitor']({ uf: 'SP' })
        expect(titulo).toBeDefined()
        expect(typeof titulo).toBe('string')
    })

    it('should generate PIS', () => {
        const pis = generators.pis()
        expect(pis).toBeDefined()
        expect(pis.length).toBe(11)
    })

    it('should generate Name', () => {
        const name = generators.name()
        expect(name).toBeDefined()
        expect(name.split(' ').length).toBeGreaterThanOrEqual(2)
    })

    it('should generate Email', () => {
        const email = generators.email()
        expect(email).toBeDefined()
        expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    })

    it('should generate Phone', () => {
        const phone = generators.phone()
        expect(phone).toBeDefined()
        expect(phone).toMatch(/^\(\d{2}\) \d{4,5}-\d{4}$/)
    })

    it('should generate Address', () => {
        const address = generators.address()
        expect(address).toBeDefined()
        expect(typeof address).toBe('string')
        expect(address.length).toBeGreaterThan(10)
    })

    it('should generate Person', () => {
        const person = generators.person()
        expect(person).toBeDefined()
        expect(person).toHaveProperty('name')
        expect(person).toHaveProperty('cpf')
        expect(person).toHaveProperty('email')
    })

    it('should generate UUID', () => {
        const uuid = generators.uuid()
        expect(uuid).toBeDefined()
        expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    })

    it('should generate Password', () => {
        const password = generators.password({ length: 20 })
        expect(password).toBeDefined()
        expect(password.length).toBe(20)
    })

    it('should generate Lorem Ipsum', () => {
        const lorem = generators.lorem({ words: 5 })
        expect(lorem).toBeDefined()
        expect(lorem.split(' ').length).toBe(5)
    })
})
