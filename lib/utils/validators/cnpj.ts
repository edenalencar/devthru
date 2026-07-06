/**
 * Configurações para geração de CNPJ
 */
export interface GenerateCNPJOptions {
    alphanumeric?: boolean
    establishmentType?: "matriz" | "filial" | "random"
    valid?: boolean
}

/**
 * Gera um CNPJ válido ou inválido (numérico ou alfanumérico)
 */
export function generateCNPJ(optionsOrAlphanumeric: boolean | GenerateCNPJOptions = false): string {
    let alphanumeric = false
    let establishmentType: "matriz" | "filial" | "random" = "random"
    let valid = true

    if (typeof optionsOrAlphanumeric === 'boolean') {
        alphanumeric = optionsOrAlphanumeric
    } else if (typeof optionsOrAlphanumeric === 'object' && optionsOrAlphanumeric !== null) {
        alphanumeric = optionsOrAlphanumeric.alphanumeric ?? false
        establishmentType = optionsOrAlphanumeric.establishmentType ?? "random"
        valid = optionsOrAlphanumeric.valid ?? true
    }

    const randomDigit = () => Math.floor(Math.random() * 10)
    const randomChar = () => {
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        return chars[Math.floor(Math.random() * chars.length)]
    }

    const getCharValue = (char: string | number): number => {
        if (typeof char === 'number') return char
        const code = char.charCodeAt(0)
        return code - 48
    }

    const calculateDigit = (base: (string | number)[], weights: number[]): number => {
        const sum = base.reduce((acc: number, char, index) => {
            return acc + getCharValue(char) * weights[index]
        }, 0)
        const remainder = sum % 11
        return remainder < 2 ? 0 : 11 - remainder
    }

    let root: (string | number)[] = []

    if (alphanumeric) {
        // First 8 positions can be alphanumeric
        root = Array.from({ length: 8 }, randomChar)
    } else {
        root = Array.from({ length: 8 }, randomDigit)
    }

    // 4 digits for order (matriz/filial)
    let order: number[] = [0, 0, 0, 1]
    if (establishmentType === "filial") {
        const randOrder = Math.floor(Math.random() * 9998) + 2 // 0002 to 9999
        order = randOrder.toString().padStart(4, "0").split("").map(Number)
    } else if (establishmentType === "random") {
        if (Math.random() > 0.5) {
            order = [0, 0, 0, 1]
        } else {
            const randOrder = Math.floor(Math.random() * 9998) + 2
            order = randOrder.toString().padStart(4, "0").split("").map(Number)
        }
    }

    root = [...root, ...order]

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    const digit1 = calculateDigit(root, weights1)
    let digit2 = calculateDigit([...root, digit1], weights2)

    if (!valid) {
        // Change the last digit to make it invalid
        digit2 = (digit2 + 1) % 10
    }

    return [...root, digit1, digit2].join("")
}

/**
 * Valida um CNPJ (tradicional ou alfanumérico)
 */
export function validateCNPJ(cnpj: string): boolean {
    // Remove caracteres especiais
    const cleaned = cnpj.replace(/[^A-Za-z0-9]/g, "").toUpperCase()

    // Verifica se tem 14 dígitos
    if (cleaned.length !== 14) return false

    // Verifica se todos os dígitos são iguais (CNPJ inválido)
    if (/^([A-Z0-9])\1+$/.test(cleaned)) return false

    const getCharValue = (char: string): number => {
        const code = char.charCodeAt(0)
        return code - 48
    }

    const calculateDigit = (slice: string, weights: number[]): number => {
        let sum = 0
        for (let i = 0; i < slice.length; i++) {
            sum += getCharValue(slice[i]) * weights[i]
        }
        const remainder = sum % 11
        return remainder < 2 ? 0 : 11 - remainder
    }

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    const digit1 = calculateDigit(cleaned.substring(0, 12), weights1)
    const digit2 = calculateDigit(cleaned.substring(0, 12) + digit1, weights2)

    return digit1 === getCharValue(cleaned[12]) && digit2 === getCharValue(cleaned[13])
}

/**
 * Formata um CNPJ (suporta tanto numérico tradicional quanto alfanumérico)
 */
export function formatCNPJ(cnpj: string): string {
    const cleaned = cnpj.replace(/[^A-Za-z0-9]/g, "").toUpperCase()
    if (cleaned.length !== 14) return cnpj
    return `${cleaned.substring(0, 2)}.${cleaned.substring(2, 5)}.${cleaned.substring(5, 8)}/${cleaned.substring(8, 12)}-${cleaned.substring(12, 14)}`
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

