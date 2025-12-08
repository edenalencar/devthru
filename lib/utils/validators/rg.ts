const BRAZILIAN_STATES = [
    { code: "AC", name: "Acre" },
    { code: "AL", name: "Alagoas" },
    { code: "AP", name: "Amapá" },
    { code: "AM", name: "Amazonas" },
    { code: "BA", name: "Bahia" },
    { code: "CE", name: "Ceará" },
    { code: "DF", name: "Distrito Federal" },
    { code: "ES", name: "Espírito Santo" },
    { code: "GO", name: "Goiás" },
    { code: "MA", name: "Maranhão" },
    { code: "MT", name: "Mato Grosso" },
    { code: "MS", name: "Mato Grosso do Sul" },
    { code: "MG", name: "Minas Gerais" },
    { code: "PA", name: "Pará" },
    { code: "PB", name: "Paraíba" },
    { code: "PR", name: "Paraná" },
    { code: "PE", name: "Pernambuco" },
    { code: "PI", name: "Piauí" },
    { code: "RJ", name: "Rio de Janeiro" },
    { code: "RN", name: "Rio Grande do Norte" },
    { code: "RS", name: "Rio Grande do Sul" },
    { code: "RO", name: "Rondônia" },
    { code: "RR", name: "Roraima" },
    { code: "SC", name: "Santa Catarina" },
    { code: "SP", name: "São Paulo" },
    { code: "SE", name: "Sergipe" },
    { code: "TO", name: "Tocantins" },
]

/**
 * Gera um RG válido
 */
export function generateRG(stateCode?: string): string {
    // Gera 8 dígitos aleatórios
    const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))

    // Calcula o dígito verificador (simplificado)
    const sum = digits.reduce((acc, digit, index) => acc + digit * (9 - index), 0)
    const checkDigit = sum % 11

    return [...digits, checkDigit].join("")
}

/**
 * Formata um RG
 */
export function formatRG(rg: string): string {
    const cleaned = rg.replace(/\D/g, "")
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4")
}

/**
 * Gera múltiplos RGs
 */
export function generateMultipleRGs(count: number, formatted: boolean = false): string[] {
    return Array.from({ length: count }, () => {
        const rg = generateRG()
        return formatted ? formatRG(rg) : rg
    })
}

/**
 * Retorna lista de estados brasileiros
 */
export function getBrazilianStates() {
    return BRAZILIAN_STATES
}
