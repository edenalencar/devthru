/**
 * Gera um CNPJ válido
 */
export function generateCNPJ(): string {
    const randomDigits = (): number[] => {
        return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10))
    }

    const calculateDigit = (digits: number[], weights: number[]): number => {
        const sum = digits.reduce((acc, digit, index) => {
            return acc + digit * weights[index]
        }, 0)
        const remainder = sum % 11
        return remainder < 2 ? 0 : 11 - remainder
    }

    const digits = randomDigits()
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    const digit1 = calculateDigit(digits, weights1)
    const digit2 = calculateDigit([...digits, digit1], weights2)

    return [...digits, digit1, digit2].join("")
}

/**
 * Valida um CNPJ
 */
export function validateCNPJ(cnpj: string): boolean {
    // Remove caracteres não numéricos
    const cleaned = cnpj.replace(/\D/g, "")

    // Verifica se tem 14 dígitos
    if (cleaned.length !== 14) return false

    // Verifica se todos os dígitos são iguais (CNPJ inválido)
    if (/^(\d)\1+$/.test(cleaned)) return false

    const digits = cleaned.split("").map(Number)

    const calculateDigit = (slice: number[], weights: number[]): number => {
        const sum = slice.reduce((acc, digit, index) => {
            return acc + digit * weights[index]
        }, 0)
        const remainder = sum % 11
        return remainder < 2 ? 0 : 11 - remainder
    }

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    const digit1 = calculateDigit(digits.slice(0, 12), weights1)
    const digit2 = calculateDigit(digits.slice(0, 13), weights2)

    return digit1 === digits[12] && digit2 === digits[13]
}

/**
 * Formata um CNPJ
 */
export function formatCNPJ(cnpj: string): string {
    const cleaned = cnpj.replace(/\D/g, "")
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
}

/**
 * Gera múltiplos CNPJs
 */
export function generateMultipleCNPJs(count: number, formatted: boolean = false): string[] {
    return Array.from({ length: count }, () => {
        const cnpj = generateCNPJ()
        return formatted ? formatCNPJ(cnpj) : cnpj
    })
}
