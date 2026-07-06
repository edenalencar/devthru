/**
 * Gera um número de Renavam válido
 */
export function generateRenavam(): string {
    const random = Math.floor(Math.random() * 9999999999).toString().padStart(10, '0')
    const renavamWithoutDigit = random.substring(0, 10)

    const renavamArr = renavamWithoutDigit.split("").reverse()
    let sum = 0
    for (let i = 0; i < 8; i++) {
        sum += parseInt(renavamArr[i]) * (i + 2)
    }
    sum += parseInt(renavamArr[8]) * 2
    sum += parseInt(renavamArr[9]) * 3

    const mod = sum % 11
    const digit = 11 - mod
    const finalDigit = digit >= 10 ? 0 : digit

    return renavamWithoutDigit + finalDigit
}

/**
 * Valida um número de Renavam
 */
export function validateRenavam(renavam: string): boolean {
    if (!renavam) return false

    // Limpeza de caracteres não numéricos
    const cleaned = renavam.replace(/\D/g, "")

    // O RENAVAM deve ter exatamente 11 dígitos
    if (cleaned.length !== 11) return false

    // Evita números com todos os dígitos iguais
    if (/^(\d)\1+$/.test(cleaned)) return false

    const renavamWithoutDigit = cleaned.substring(0, 10)
    const digit = parseInt(cleaned.charAt(10))

    const renavamArr = renavamWithoutDigit.split("").reverse()
    let sum = 0

    for (let i = 0; i < 8; i++) {
        sum += parseInt(renavamArr[i]) * (i + 2)
    }
    sum += parseInt(renavamArr[8]) * 2
    sum += parseInt(renavamArr[9]) * 3

    const mod = sum % 11
    let calculatedDigit = 11 - mod
    if (calculatedDigit >= 10) {
        calculatedDigit = 0
    }

    return calculatedDigit === digit
}

/**
 * Formata um número de Renavam (XXXXXXXXXX-X)
 */
export function formatRenavam(renavam: string): string {
    const cleaned = renavam.replace(/\D/g, "")
    if (cleaned.length !== 11) return renavam
    return `${cleaned.substring(0, 10)}-${cleaned.substring(10)}`
}

/**
 * Gera múltiplos números de Renavam
 */
export function generateMultipleRenavams(count: number, formatted: boolean = false): string[] {
    return Array.from({ length: count }, () => {
        const renavam = generateRenavam()
        return formatted ? formatRenavam(renavam) : renavam
    })
}
