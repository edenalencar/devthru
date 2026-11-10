/**
 * Dígito verificador do RG no padrão de São Paulo (o mais aceito por validadores):
 * pesos 2 a 9 sobre os 8 primeiros dígitos, DV = 11 - (soma % 11),
 * com 10 virando "X" e 11 virando "0". É a mesma regra do código exibido na página.
 */
export function calculateRGCheckDigit(base: string): string {
    const sum = base.split('').reduce((acc, d, i) => acc + Number(d) * (i + 2), 0)
    const dv = 11 - (sum % 11)
    if (dv === 11) return '0'
    if (dv === 10) return 'X'
    return String(dv)
}

export function generateRG(formatted: boolean = false): string {
    const base = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('')
    const rg = base + calculateRGCheckDigit(base)

    if (formatted) {
        return `${rg.slice(0, 2)}.${rg.slice(2, 5)}.${rg.slice(5, 8)}-${rg.slice(8)}`
    }

    return rg
}
