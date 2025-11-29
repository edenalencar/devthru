// Título de Eleitor Validator and Generator
// Format: XXXX XXXX XXXX (12 digits)
// First 8 digits: sequential number
// Next 2 digits: state code (01-28)
// Last 2 digits: check digits

const STATE_CODES: Record<string, string> = {
    'SP': '01',
    'MG': '02',
    'RJ': '03',
    'BA': '04',
    'PR': '05',
    'SC': '06',
    'RS': '07',
    'ES': '08',
    'PE': '09',
    'CE': '10',
    'PA': '11',
    'GO': '12',
    'PB': '13',
    'MT': '14',
    'AL': '15',
    'PI': '16',
    'RN': '17',
    'MA': '18',
    'AM': '19',
    'MS': '20',
    'RO': '21',
    'AC': '22',
    'AP': '23',
    'RR': '24',
    'TO': '25',
    'DF': '26',
    'SE': '27',
    'EXTERIOR': '28',
}

export function calculateCheckDigits(baseNumber: string): string {
    // First check digit
    let sum = 0
    for (let i = 0; i < 8; i++) {
        sum += parseInt(baseNumber[i]) * (9 - (i % 9))
    }
    const firstDigit = sum % 11
    const d1 = firstDigit === 10 ? 0 : firstDigit

    // Second check digit (includes state code)
    const stateCode = baseNumber.substring(8, 10)
    sum = 0
    for (let i = 0; i < 2; i++) {
        sum += parseInt(stateCode[i]) * (9 - (i % 9))
    }
    sum += d1 * 7
    const secondDigit = sum % 11
    const d2 = secondDigit === 10 ? 0 : secondDigit

    return `${d1}${d2}`
}

export function validateTituloEleitor(titulo: string): boolean {
    // Remove formatting
    const cleaned = titulo.replace(/\D/g, '')

    // Check length
    if (cleaned.length !== 12) {
        return false
    }

    // Extract parts
    const baseNumber = cleaned.substring(0, 8)
    const stateCode = cleaned.substring(8, 10)
    const checkDigits = cleaned.substring(10, 12)

    // Validate state code
    const stateCodeNum = parseInt(stateCode)
    if (stateCodeNum < 1 || stateCodeNum > 28) {
        return false
    }

    // Calculate and verify check digits
    const calculatedDigits = calculateCheckDigits(baseNumber + stateCode)
    return calculatedDigits === checkDigits
}

export function generateTituloEleitor(state: string = 'SP'): string {
    // Get state code
    const stateCode = STATE_CODES[state] || STATE_CODES['SP']

    // Generate random 8-digit sequential number
    const sequential = Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, '0')

    // Calculate check digits
    const checkDigits = calculateCheckDigits(sequential + stateCode)

    // Combine all parts
    return sequential + stateCode + checkDigits
}

export function formatTituloEleitor(titulo: string): string {
    const cleaned = titulo.replace(/\D/g, '')
    if (cleaned.length !== 12) return titulo

    return `${cleaned.substring(0, 4)} ${cleaned.substring(4, 8)} ${cleaned.substring(8, 12)}`
}
