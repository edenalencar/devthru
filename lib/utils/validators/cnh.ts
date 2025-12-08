export type CNHCategory = "A" | "B" | "C" | "D" | "E" | "AB" | "AC" | "AD" | "AE"

/**
 * Gera uma CNH válida
 */
export function generateCNH(): string {
    // Gera 9 dígitos aleatórios
    const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))

    // Calcula o primeiro dígito verificador
    let sum = 0
    for (let i = 0; i < 9; i++) {
        sum += digits[i] * (9 - i)
    }
    let digit1 = sum % 11
    if (digit1 >= 10) digit1 = 0

    // Calcula o segundo dígito verificador
    sum = 0
    for (let i = 0; i < 9; i++) {
        sum += digits[i] * (1 + i)
    }
    sum += digit1 * 2
    let digit2 = sum % 11
    if (digit2 >= 10) digit2 = 0

    return [...digits, digit1, digit2].join("")
}

/**
 * Valida uma CNH
 */
export function validateCNH(cnh: string): boolean {
    const cleaned = cnh.replace(/\D/g, "")

    if (cleaned.length !== 11) return false
    if (/^(\d)\1+$/.test(cleaned)) return false

    const digits = cleaned.split("").map(Number)

    // Valida primeiro dígito
    let sum = 0
    for (let i = 0; i < 9; i++) {
        sum += digits[i] * (9 - i)
    }
    let digit1 = sum % 11
    if (digit1 >= 10) digit1 = 0
    if (digit1 !== digits[9]) return false

    // Valida segundo dígito
    sum = 0
    for (let i = 0; i < 9; i++) {
        sum += digits[i] * (1 + i)
    }
    sum += digits[9] * 2
    let digit2 = sum % 11
    if (digit2 >= 10) digit2 = 0
    if (digit2 !== digits[10]) return false

    return true
}

/**
 * Formata uma CNH
 */
export function formatCNH(cnh: string): string {
    const cleaned = cnh.replace(/\D/g, "")
    return cleaned.replace(/(\d{11})/, "$1")
}

/**
 * Retorna categorias de CNH
 */
export function getCNHCategories(): CNHCategory[] {
    return ["A", "B", "C", "D", "E", "AB", "AC", "AD", "AE"]
}
