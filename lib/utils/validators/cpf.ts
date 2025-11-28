/**
 * Gera um CPF válido
 */
export function generateCPF(): string {
    const randomDigits = (): number[] => {
        return Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
    }

    const calculateDigit = (digits: number[], factor: number): number => {
        const sum = digits.reduce((acc, digit, index) => {
            return acc + digit * (factor - index)
        }, 0)
        const remainder = sum % 11
        return remainder < 2 ? 0 : 11 - remainder
    }

    const digits = randomDigits()
    const digit1 = calculateDigit(digits, 10)
    const digit2 = calculateDigit([...digits, digit1], 11)

    return [...digits, digit1, digit2].join("")
}

/**
 * Valida um CPF
 */
export function validateCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    const cleaned = cpf.replace(/\D/g, "")

    // Verifica se tem 11 dígitos
    if (cleaned.length !== 11) return false

    // Verifica se todos os dígitos são iguais (CPF inválido)
    if (/^(\d)\1+$/.test(cleaned)) return false

    const digits = cleaned.split("").map(Number)

    const calculateDigit = (slice: number[], factor: number): number => {
        const sum = slice.reduce((acc, digit, index) => {
            return acc + digit * (factor - index)
        }, 0)
        const remainder = sum % 11
        return remainder < 2 ? 0 : 11 - remainder
    }

    const digit1 = calculateDigit(digits.slice(0, 9), 10)
    const digit2 = calculateDigit(digits.slice(0, 10), 11)

    return digit1 === digits[9] && digit2 === digits[10]
}

/**
 * Formata um CPF
 */
export function formatCPF(cpf: string): string {
    const cleaned = cpf.replace(/\D/g, "")
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

/**
 * Gera múltiplos CPFs
 */
export function generateMultipleCPFs(count: number, formatted: boolean = false): string[] {
    return Array.from({ length: count }, () => {
        const cpf = generateCPF()
        return formatted ? formatCPF(cpf) : cpf
    })
}
