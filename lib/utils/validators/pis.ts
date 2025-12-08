// PIS/PASEP Validator and Generator
// Format: XXX.XXXXX.XX-X (11 digits)
// Weights: 3, 2, 9, 8, 7, 6, 5, 4, 3, 2

export function calculatePISCheckDigit(baseNumber: string): string {
    let sum = 0
    const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    for (let i = 0; i < 10; i++) {
        sum += parseInt(baseNumber[i]) * weights[i]
    }

    const rest = sum % 11
    const digit = 11 - rest
    return (digit === 10 || digit === 11) ? '0' : digit.toString()
}

export function validatePIS(pis: string): boolean {
    // Remove formatting
    const cleaned = pis.replace(/\D/g, '')

    // Check length
    if (cleaned.length !== 11) {
        return false
    }

    // Check for repeated digits (common invalid patterns)
    if (/^(\d)\1+$/.test(cleaned)) {
        return false
    }

    // Extract base number and check digit
    const baseNumber = cleaned.substring(0, 10)
    const checkDigit = cleaned.substring(10, 11)

    // Calculate and verify check digit
    const calculatedDigit = calculatePISCheckDigit(baseNumber)
    return calculatedDigit === checkDigit
}

export function generatePIS(): string {
    // Generate random 10-digit base number
    let baseNumber = ''
    for (let i = 0; i < 10; i++) {
        baseNumber += Math.floor(Math.random() * 10).toString()
    }

    // Calculate check digit
    const checkDigit = calculatePISCheckDigit(baseNumber)

    // Combine
    return baseNumber + checkDigit
}

export function formatPIS(pis: string): string {
    const cleaned = pis.replace(/\D/g, '')
    if (cleaned.length !== 11) return pis

    return `${cleaned.substring(0, 3)}.${cleaned.substring(3, 8)}.${cleaned.substring(8, 10)}-${cleaned.substring(10, 11)}`
}
