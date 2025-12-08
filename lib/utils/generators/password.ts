export interface PasswordOptions {
    length: number
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    symbols: boolean
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz"
const NUMBERS = "0123456789"
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?"

/**
 * Gera uma senha com as opções especificadas
 */
export function generatePassword(options: PasswordOptions): string {
    let charset = ""
    let password = ""

    if (options.uppercase) charset += UPPERCASE
    if (options.lowercase) charset += LOWERCASE
    if (options.numbers) charset += NUMBERS
    if (options.symbols) charset += SYMBOLS

    if (charset === "") {
        throw new Error("Pelo menos um tipo de caractere deve ser selecionado")
    }

    // Garante que pelo menos um caractere de cada tipo selecionado seja incluído
    if (options.uppercase) password += UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]
    if (options.lowercase) password += LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)]
    if (options.numbers) password += NUMBERS[Math.floor(Math.random() * NUMBERS.length)]
    if (options.symbols) password += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]

    // Preenche o restante da senha
    for (let i = password.length; i < options.length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)]
    }

    // Embaralha a senha
    return password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("")
}

/**
 * Calcula a força de uma senha
 */
export function calculatePasswordStrength(password: string): {
    score: number
    label: string
    color: string
} {
    let score = 0

    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (password.length >= 16) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++

    if (score <= 2) return { score, label: "Fraca", color: "text-destructive" }
    if (score <= 4) return { score, label: "Média", color: "text-yellow-500" }
    if (score <= 6) return { score, label: "Forte", color: "text-accent" }
    return { score, label: "Muito Forte", color: "text-green-600" }
}

/**
 * Gera múltiplas senhas
 */
export function generateMultiplePasswords(count: number, options: PasswordOptions): string[] {
    return Array.from({ length: count }, () => generatePassword(options))
}
