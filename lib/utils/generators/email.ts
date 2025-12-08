const COMMON_DOMAINS = [
    "gmail.com",
    "outlook.com",
    "hotmail.com",
    "yahoo.com",
    "icloud.com",
    "protonmail.com",
    "live.com",
    "msn.com",
]

const USERNAME_PREFIXES = [
    "user", "contact", "info", "admin", "support", "hello", "mail",
    "dev", "test", "demo", "sample", "example"
]

/**
 * Gera um nome de usuário aleatório
 */
function generateUsername(): string {
    const prefix = USERNAME_PREFIXES[Math.floor(Math.random() * USERNAME_PREFIXES.length)]
    const number = Math.floor(Math.random() * 9999)
    return `${prefix}${number}`
}

/**
 * Gera um email
 */
export function generateEmail(domain?: string): string {
    const selectedDomain = domain || COMMON_DOMAINS[Math.floor(Math.random() * COMMON_DOMAINS.length)]
    const username = generateUsername()

    return `${username}@${selectedDomain}`
}

/**
 * Gera um email a partir de um nome
 */
export function generateEmailFromName(name: string, domain?: string): string {
    const selectedDomain = domain || COMMON_DOMAINS[Math.floor(Math.random() * COMMON_DOMAINS.length)]

    // Remove acentos e caracteres especiais
    const cleanName = name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, ".")

    return `${cleanName}@${selectedDomain}`
}

/**
 * Gera múltiplos emails
 */
export function generateMultipleEmails(count: number, domain?: string): string[] {
    return Array.from({ length: count }, () => generateEmail(domain))
}

/**
 * Valida formato de email
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Retorna lista de domínios comuns
 */
export function getCommonDomains(): string[] {
    return COMMON_DOMAINS
}
