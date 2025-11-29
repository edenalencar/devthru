import { generateCPF, formatCPF } from '@/lib/utils/validators/cpf'
import { generateCNPJ, formatCNPJ } from '@/lib/utils/validators/cnpj'
import { generateIE, formatIE } from '@/lib/utils/validators/inscricao-estadual'
import { generateTituloEleitor, formatTituloEleitor } from '@/lib/utils/validators/titulo-eleitor'
import { generatePIS, formatPIS } from '@/lib/utils/validators/pis'
import { generateRG } from '@/lib/utils/generators/rg'
import { generateCNH } from '@/lib/utils/generators/cnh'
import { generateName } from '@/lib/utils/generators/names'
import { generateEmail, generatePhone } from '@/lib/utils/generators/contact'
import { generateAddress } from '@/lib/utils/generators/address'
import { generatePerson } from '@/lib/utils/validators/person'

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
        return generateRG(options.formatted)
    },
    cnh: (options: any = {}) => {
        return generateCNH()
    },
    'inscricao-estadual': (options: any = {}) => {
        const uf = options.uf || 'SP'
        const ie = generateIE(uf)
        return options.formatted ? formatIE(ie, uf) : ie
    },
    'titulo-eleitor': (options: any = {}) => {
        const uf = options.uf || 'SP'
        const titulo = generateTituloEleitor(uf)
        return options.formatted ? formatTituloEleitor(titulo) : titulo
    },
    pis: (options: any = {}) => {
        const pis = generatePIS()
        return options.formatted ? formatPIS(pis) : pis
    },
    name: (options: any = {}) => {
        return generateName()
    },
    email: (options: any = {}) => {
        // If name is provided in options, use it to generate email
        const name = options.name || generateName()
        return generateEmail(name)
    },
    phone: (options: any = {}) => {
        return generatePhone(options.mobile !== false) // Default to mobile
    },
    address: (options: any = {}) => {
        const addr = generateAddress()
        return addr.full
    },
    person: (options: any = {}) => {
        return generatePerson()
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
