import { generateCPF, formatCPF } from './cpf'
import { generateRG } from '../generators/rg' // I need to check if RG generator is in validators or if I should move it
import { generateName } from '../generators/names'
import { generateBirthDate, generateSign, generateHeight, generateWeight, generateBloodType } from '../generators/personal'
import { generateEmail, generatePhone } from '../generators/contact'
import { generateAddress } from '../generators/address'

// Helper for RG since it was inline in generators.ts
function generateRGString(): string {
    const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
    const rg = digits.join('')
    return `${rg.slice(0, 2)}.${rg.slice(2, 5)}.${rg.slice(5, 8)}-${rg.slice(8)}`
}

export interface Person {
    name: string
    cpf: string
    rg: string
    birthDate: string
    age: number
    sign: string
    gender: 'Masculino' | 'Feminino'
    mother: string
    father: string
    email: string
    password: string
    phone: string
    mobile: string
    height: string
    weight: string
    bloodType: string
    address: {
        street: string
        number: number
        neighborhood: string
        city: string
        state: string
        zipCode: string
    }
}

export function generatePerson(): Person {
    const genderCode = Math.random() > 0.5 ? 'M' : 'F'
    const gender = genderCode === 'M' ? 'Masculino' : 'Feminino'

    const name = generateName(genderCode)
    const birthDate = generateBirthDate()
    const age = new Date().getFullYear() - birthDate.getFullYear()

    // Generate parents
    const mother = generateName('F')
    const father = generateName('M')

    // Generate address
    const address = generateAddress()

    return {
        name,
        cpf: formatCPF(generateCPF()),
        rg: generateRGString(),
        birthDate: birthDate.toLocaleDateString('pt-BR'),
        age,
        sign: generateSign(birthDate),
        gender,
        mother,
        father,
        email: generateEmail(name),
        password: Math.random().toString(36).slice(-10), // Simple password
        phone: generatePhone(false),
        mobile: generatePhone(true),
        height: `${generateHeight().toFixed(2)}m`,
        weight: `${generateWeight()}kg`,
        bloodType: generateBloodType(),
        address: {
            street: address.street,
            number: address.number,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode
        }
    }
}
