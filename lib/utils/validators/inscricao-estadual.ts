// Inscrição Estadual - Validators and Generators for all Brazilian States
// Each state has its own format and validation algorithm

export interface IEState {
    uf: string
    name: string
    format: string
    length: number
}

export const IE_STATES: IEState[] = [
    { uf: 'AC', name: 'Acre', format: '01.004.823/001-12', length: 13 },
    { uf: 'AL', name: 'Alagoas', format: '240000048', length: 9 },
    { uf: 'AP', name: 'Amapá', format: '030123459', length: 9 },
    { uf: 'AM', name: 'Amazonas', format: '04.145.871-0', length: 9 },
    { uf: 'BA', name: 'Bahia', format: '123456-63', length: 8 },
    { uf: 'CE', name: 'Ceará', format: '06.000001-5', length: 9 },
    { uf: 'DF', name: 'Distrito Federal', format: '07300001001-09', length: 13 },
    { uf: 'ES', name: 'Espírito Santo', format: '082.560.91-6', length: 9 },
    { uf: 'GO', name: 'Goiás', format: '10.987.654-7', length: 9 },
    { uf: 'MA', name: 'Maranhão', format: '120000385', length: 9 },
    { uf: 'MT', name: 'Mato Grosso', format: '0013000001-9', length: 11 },
    { uf: 'MS', name: 'Mato Grosso do Sul', format: '283.456.789', length: 9 },
    { uf: 'MG', name: 'Minas Gerais', format: '062.307.904/0081', length: 13 },
    { uf: 'PA', name: 'Pará', format: '15-999999-5', length: 9 },
    { uf: 'PB', name: 'Paraíba', format: '06.000.001-5', length: 9 },
    { uf: 'PR', name: 'Paraná', format: '123.45678-50', length: 10 },
    { uf: 'PE', name: 'Pernambuco', format: '0321418-40', length: 9 },
    { uf: 'PI', name: 'Piauí', format: '012345679', length: 9 },
    { uf: 'RJ', name: 'Rio de Janeiro', format: '10.123.45-6', length: 8 },
    { uf: 'RN', name: 'Rio Grande do Norte', format: '20.040.040-1', length: 9 },
    { uf: 'RS', name: 'Rio Grande do Sul', format: '224/3658792', length: 10 },
    { uf: 'RO', name: 'Rondônia', format: '0000000062521-6', length: 14 },
    { uf: 'RR', name: 'Roraima', format: '24006628-1', length: 9 },
    { uf: 'SC', name: 'Santa Catarina', format: '251.040.852', length: 9 },
    { uf: 'SP', name: 'São Paulo', format: '110.042.490.114', length: 12 },
    { uf: 'SE', name: 'Sergipe', format: '27123456-3', length: 9 },
    { uf: 'TO', name: 'Tocantins', format: '29010227836', length: 11 },
]

// Acre (AC)
function validateAC(ie: string): boolean {
    if (ie.length !== 13) return false
    if (!ie.startsWith('01')) return false

    const weights = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0
    for (let i = 0; i < 11; i++) {
        sum += parseInt(ie[i]) * weights[i]
    }
    const digit = 11 - (sum % 11)
    const checkDigit = digit >= 10 ? 0 : digit
    return parseInt(ie[11]) === checkDigit
}

function generateAC(): string {
    const base = '01' + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0')
    const weights = [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0
    for (let i = 0; i < 11; i++) {
        sum += parseInt(base[i]) * weights[i]
    }
    const digit = 11 - (sum % 11)
    const checkDigit = digit >= 10 ? 0 : digit
    return base + checkDigit + '0'
}

// São Paulo (SP) - Most common
function validateSP(ie: string): boolean {
    if (ie.length !== 12) return false

    // First digit
    const weights1 = [1, 3, 4, 5, 6, 7, 8, 10]
    let sum = 0
    for (let i = 0; i < 8; i++) {
        sum += parseInt(ie[i]) * weights1[i]
    }
    let digit = sum % 11
    const d1 = digit < 10 ? digit : 0

    // Second digit
    const weights2 = [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    sum = 0
    for (let i = 0; i < 11; i++) {
        sum += parseInt(ie[i]) * weights2[i]
    }
    digit = sum % 11
    const d2 = digit < 10 ? digit : 0

    return parseInt(ie[8]) === d1 && parseInt(ie[11]) === d2
}

function generateSP(): string {
    const base = Math.floor(Math.random() * 100000000).toString().padStart(8, '0')

    // First digit
    const weights1 = [1, 3, 4, 5, 6, 7, 8, 10]
    let sum = 0
    for (let i = 0; i < 8; i++) {
        sum += parseInt(base[i]) * weights1[i]
    }
    let digit = sum % 11
    const d1 = digit < 10 ? digit : 0

    const withD1 = base + d1 + '00'

    // Second digit
    const weights2 = [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    sum = 0
    for (let i = 0; i < 11; i++) {
        sum += parseInt(withD1[i]) * weights2[i]
    }
    digit = sum % 11
    const d2 = digit < 10 ? digit : 0

    return base + d1 + '00' + d2
}

// Generic validator (simplified for other states)
function validateGeneric(ie: string, uf: string): boolean {
    const state = IE_STATES.find(s => s.uf === uf)
    if (!state) return false

    const cleaned = ie.replace(/\D/g, '')
    return cleaned.length === state.length
}

// Main validation function
export function validateIE(ie: string, uf: string): boolean {
    const cleaned = ie.replace(/\D/g, '')

    switch (uf) {
        case 'AC':
            return validateAC(cleaned)
        case 'SP':
            return validateSP(cleaned)
        // Add more states as needed
        default:
            return validateGeneric(cleaned, uf)
    }
}

// Main generation function
export function generateIE(uf: string): string {
    switch (uf) {
        case 'AC':
            return generateAC()
        case 'SP':
            return generateSP()
        // Add more states as needed
        default:
            // Generic generation for other states
            const state = IE_STATES.find(s => s.uf === uf)
            if (!state) return ''
            return Math.floor(Math.random() * Math.pow(10, state.length))
                .toString()
                .padStart(state.length, '0')
    }
}

// Format IE with mask
export function formatIE(ie: string, uf: string): string {
    const state = IE_STATES.find(s => s.uf === uf)
    if (!state) return ie

    const cleaned = ie.replace(/\D/g, '')

    // Apply formatting based on state format
    switch (uf) {
        case 'SP':
            if (cleaned.length === 12) {
                return `${cleaned.substring(0, 3)}.${cleaned.substring(3, 6)}.${cleaned.substring(6, 9)}.${cleaned.substring(9, 12)}`
            }
            break
        case 'AC':
            if (cleaned.length === 13) {
                return `${cleaned.substring(0, 2)}.${cleaned.substring(2, 5)}.${cleaned.substring(5, 8)}/${cleaned.substring(8, 11)}-${cleaned.substring(11, 13)}`
            }
            break
        // Add more formatting as needed
    }

    return cleaned
}
