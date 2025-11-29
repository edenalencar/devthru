import { generateCPF, formatCPF } from '@/lib/utils/validators/cpf'
import { generateCNPJ, formatCNPJ } from '@/lib/utils/validators/cnpj'
import { generateIE, formatIE } from '@/lib/utils/validators/inscricao-estadual'

// Generator functions map
export const generators = {
    cpf: (options: any = {}) => {
        const cpf = generateCPF()
        return options.formatted ? formatCPF(cpf) : cpf
    },
    cnpj: (options: any = {}) => {
        const cnpj = generateCNPJ()
        return options.formatted ? formatCNPJ(cnpj) : cnpj
    },
    rg: (options: any = {}) => {
        // Simple RG generator
        const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
        const rg = digits.join('')
        if (options.formatted) {
            return `${rg.slice(0, 2)}.${rg.slice(2, 5)}.${rg.slice(5, 8)}-${rg.slice(8)}`
        }
        return rg
    },
    cnh: (options: any = {}) => {
        // Simple CNH generator (11 digits)
        const digits = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10))
        return digits.join('')
    },
    'inscricao-estadual': (options: any = {}) => {
        const uf = options.uf || 'SP'
        const ie = generateIE(uf)
        return options.formatted ? formatIE(ie, uf) : ie
    },
    name: (options: any = {}) => {
        const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Julia', 'Lucas', 'Beatriz']
        const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Costa', 'Ferreira', 'Rodrigues']
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        return `${firstName} ${lastName}`
    },
    email: (options: any = {}) => {
        const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com']
        const username = Math.random().toString(36).substring(2, 10)
        const domain = options.domain || domains[Math.floor(Math.random() * domains.length)]
        return `${username}@${domain}`
    },
    phone: (options: any = {}) => {
        const ddd = Math.floor(Math.random() * 90) + 10
        const prefix = 9
        const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0')
        const phone = `${ddd}${prefix}${number}`
        if (options.formatted) {
            return `(${ddd}) ${prefix}${number.slice(0, 4)}-${number.slice(4)}`
        }
        return phone
    },
    address: (options: any = {}) => {
        const streets = ['Rua das Flores', 'Av. Brasil', 'Rua Principal', 'Av. Paulista']
        const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba']
        const street = streets[Math.floor(Math.random() * streets.length)]
        const number = Math.floor(Math.random() * 2000) + 1
        const city = cities[Math.floor(Math.random() * cities.length)]
        return `${street}, ${number} - ${city}`
    },
    uuid: (options: any = {}) => {
        return crypto.randomUUID()
    },
    password: (options: any = {}) => {
        const length = options.length || 16
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
        let password = ''
        for (let i = 0; i < length; i++) {
            password += chars[Math.floor(Math.random() * chars.length)]
        }
        return password
    },
    lorem: (options: any = {}) => {
        const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit']
        const count = options.words || 10
        let result = []
        for (let i = 0; i < count; i++) {
            result.push(words[Math.floor(Math.random() * words.length)])
        }
        return result.join(' ')
    },
} as const

export type ToolId = keyof typeof generators

export function isValidTool(tool: string): tool is ToolId {
    return tool in generators
}
