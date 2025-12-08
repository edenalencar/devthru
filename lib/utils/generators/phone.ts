export type PhoneType = "mobile" | "landline"

// DDDs mais comuns do Brasil
const COMMON_DDDS = [
    "11", "12", "13", "14", "15", "16", "17", "18", "19", // SP
    "21", "22", "24", // RJ
    "27", "28", // ES
    "31", "32", "33", "34", "35", "37", "38", // MG
    "41", "42", "43", "44", "45", "46", // PR
    "47", "48", "49", // SC
    "51", "53", "54", "55", // RS
    "61", // DF
    "62", "64", // GO
    "63", // TO
    "65", "66", // MT
    "67", // MS
    "68", // AC
    "69", // RO
    "71", "73", "74", "75", "77", // BA
    "79", // SE
    "81", "87", // PE
    "82", // AL
    "83", // PB
    "84", // RN
    "85", "88", // CE
    "86", "89", // PI
    "91", "93", "94", // PA
    "92", "97", // AM
    "95", // RR
    "96", // AP
    "98", "99", // MA
]

/**
 * Gera um telefone celular
 */
export function generateMobile(ddd?: string): string {
    const selectedDDD = ddd || COMMON_DDDS[Math.floor(Math.random() * COMMON_DDDS.length)]

    // Celular sempre começa com 9
    const firstDigit = 9
    const remainingDigits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))

    return `${selectedDDD}${firstDigit}${remainingDigits.join("")}`
}

/**
 * Gera um telefone fixo
 */
export function generateLandline(ddd?: string): string {
    const selectedDDD = ddd || COMMON_DDDS[Math.floor(Math.random() * COMMON_DDDS.length)]

    // Fixo começa com 2, 3, 4 ou 5
    const firstDigit = [2, 3, 4, 5][Math.floor(Math.random() * 4)]
    const remainingDigits = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10))

    return `${selectedDDD}${firstDigit}${remainingDigits.join("")}`
}

/**
 * Gera um telefone (móvel ou fixo)
 */
export function generatePhone(type: PhoneType = "mobile", ddd?: string): string {
    return type === "mobile" ? generateMobile(ddd) : generateLandline(ddd)
}

/**
 * Formata um telefone
 */
export function formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, "")

    if (cleaned.length === 11) {
        // Celular: (XX) 9XXXX-XXXX
        return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    } else if (cleaned.length === 10) {
        // Fixo: (XX) XXXX-XXXX
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    }

    return phone
}

/**
 * Gera múltiplos telefones
 */
export function generateMultiplePhones(count: number, type: PhoneType = "mobile", ddd?: string): string[] {
    return Array.from({ length: count }, () => generatePhone(type, ddd))
}

/**
 * Retorna lista de DDDs
 */
export function getDDDs(): string[] {
    return COMMON_DDDS
}
