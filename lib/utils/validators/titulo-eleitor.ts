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
    // First check digit (calculated from first 8 digits)
    // Weights: 2, 3, 4, 5, 6, 7, 8, 9
    let sum = 0
    for (let i = 0; i < 8; i++) {
        sum += parseInt(baseNumber[i]) * (i + 2)
    }
    let rest = sum % 11
    let d1 = rest < 2 ? 0 : 11 - rest

    // Special case for SP (01) and MG (02) if d1 is 0
    // But the standard rule is usually: if rest < 2, digit is 0.
    // However, for Título de Eleitor:
    // If rest is 0, digit is 0. If rest is 1, digit is 0.
    // Wait, the official algorithm is:
    // Sum * weights. Rest = Sum % 11.
    // If Rest = 0 or 1, Digit = 0. Else Digit = 11 - Rest.
    // EXCEPT: specific rules for SP and MG might apply in some docs, but standard is:
    // If calculated digit is 10, it becomes 0.
    // Let's stick to the standard Mod11 algorithm for Título:
    // Weights 2 to 9.

    // Re-checking standard algorithm:
    // 1. Multiply first 8 digits by weights 2,3,4,5,6,7,8,9.
    // 2. Sum results.
    // 3. Mod 11.
    // 4. If remainder is 10, digit is 0. If remainder is 0, digit is 0?
    // Actually: Digit = Remainder. 
    // Wait, let's use a known reliable source or implementation.
    // TSE Algorithm:
    // D1: Weights 2 to 9 for first 8 digits. Sum. Remainder = Sum % 11.
    // If Remainder = 10, D1 = 0. Else D1 = Remainder.

    // D2: Weights 7, 8, 9 for digits 9, 10, 11 (State Code + D1).
    // Sum. Remainder = Sum % 11.
    // If Remainder = 10, D2 = 0. Else D2 = Remainder.

    // Let's implement this.

    sum = 0
    for (let i = 0; i < 8; i++) {
        sum += parseInt(baseNumber[i]) * (i + 2)
    }
    rest = sum % 11
    d1 = rest === 10 ? 0 : rest

    // Second check digit (calculated from state code + d1)
    // Digits: 9, 10, 11 (indices 8, 9, 10 in a 0-indexed string of 12 chars, but here we have baseNumber which is 8 chars + stateCode which is 2 chars)
    // We need to construct the sequence for D2 calculation: StateCode[0], StateCode[1], D1
    const stateCode = baseNumber.substring(8, 10) // This function receives baseNumber which seems to be 8 digits in the original code, but let's check usage.
    // Usage in generate: calculateCheckDigits(sequential + stateCode) -> 10 digits passed.

    // So baseNumber here is actually 10 digits (8 seq + 2 state).
    const v1 = parseInt(baseNumber[8])
    const v2 = parseInt(baseNumber[9])
    const v3 = d1

    sum = v1 * 7 + v2 * 8 + v3 * 9
    rest = sum % 11
    let d2 = rest === 10 ? 0 : rest

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
