// Cálculos do dia a dia: número por extenso, regra de 3, porcentagem e números aleatórios.

const UNITS = [
    'zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove',
    'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove',
]
const TENS = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
const HUNDREDS = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos']
const SCALES: [string, string][] = [
    ['', ''],
    ['mil', 'mil'],
    ['milhão', 'milhões'],
    ['bilhão', 'bilhões'],
    ['trilhão', 'trilhões'],
]

export const MAX_EXTENSO = 999_999_999_999_999

/**
 * Lê números digitados no formato brasileiro ou internacional:
 * "1.234,56", "1234,56", "1.000" (mil) e "1234.56". Retorna null se inválido.
 */
export function parseBrazilianNumber(raw: string): number | null {
    const s = raw.trim().replace(/[R$\s]/g, '')
    if (!s) return null
    let normalized: string
    if (s.includes(',')) normalized = s.replace(/\./g, '').replace(',', '.')
    else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) normalized = s.replace(/\./g, '')
    else normalized = s
    const n = Number(normalized)
    return Number.isFinite(n) ? n : null
}

function groupToWords(n: number): string {
    if (n === 100) return 'cem'
    const parts: string[] = []
    const h = Math.floor(n / 100)
    const rest = n % 100
    if (h > 0) parts.push(HUNDREDS[h])
    if (rest > 0) {
        if (rest < 20) {
            parts.push(UNITS[rest])
        } else {
            const t = Math.floor(rest / 10)
            const u = rest % 10
            parts.push(u > 0 ? `${TENS[t]} e ${UNITS[u]}` : TENS[t])
        }
    }
    return parts.join(' e ')
}

/** Escreve um inteiro (até 999 trilhões) por extenso em português do Brasil. */
export function integerToWords(value: number): string {
    if (!Number.isInteger(value) || Math.abs(value) > MAX_EXTENSO) {
        throw new RangeError('Número fora do intervalo suportado')
    }
    if (value === 0) return 'zero'
    if (value < 0) return `menos ${integerToWords(-value)}`

    const groups: number[] = []
    let n = value
    while (n > 0) {
        groups.push(n % 1000)
        n = Math.floor(n / 1000)
    }

    const words: { text: string; value: number }[] = []
    for (let i = groups.length - 1; i >= 0; i--) {
        const g = groups[i]
        if (g === 0) continue
        let text: string
        if (i === 0) text = groupToWords(g)
        else if (i === 1) text = g === 1 ? 'mil' : `${groupToWords(g)} mil`
        else text = `${groupToWords(g)} ${g === 1 ? SCALES[i][0] : SCALES[i][1]}`
        words.push({ text, value: g })
    }

    // Conector antes do último grupo: "e" quando ele é menor que 100 ou centena exata
    // (mil e cem, dois milhões e cinco); vírgula entre os demais grupos.
    return words.reduce((acc, w, idx) => {
        if (idx === 0) return w.text
        const isLast = idx === words.length - 1
        if (isLast && (w.value < 100 || w.value % 100 === 0)) return `${acc} e ${w.text}`
        return isLast && words.length === 2 ? `${acc} ${w.text}` : `${acc}, ${w.text}`
    }, '')
}

/** Valor monetário por extenso em reais (ex.: 10,50 → "dez reais e cinquenta centavos"). */
export function currencyToWords(value: number): string {
    if (!Number.isFinite(value)) throw new RangeError('Valor inválido')
    const negative = value < 0
    const cents = Math.round(Math.abs(value) * 100)
    const reais = Math.floor(cents / 100)
    const centavos = cents % 100

    const parts: string[] = []
    if (reais > 0) {
        const words = integerToWords(reais)
        // "um milhão de reais", "dois bilhões de reais"
        const de = reais >= 1_000_000 && reais % 1_000_000 === 0 ? ' de' : ''
        parts.push(`${words}${de} ${reais === 1 ? 'real' : 'reais'}`)
    }
    if (centavos > 0) {
        parts.push(`${integerToWords(centavos)} ${centavos === 1 ? 'centavo' : 'centavos'}`)
    }
    if (parts.length === 0) return 'zero real'
    const text = parts.join(' e ')
    return negative ? `menos ${text}` : text
}

/**
 * Regra de três: A está para B assim como C está para X.
 * Direta: X = B·C / A. Inversa: X = A·B / C.
 */
export function ruleOfThree(a: number, b: number, c: number, inverse = false): number {
    if (inverse) {
        if (c === 0) throw new RangeError('C não pode ser zero na regra de três inversa')
        return (a * b) / c
    }
    if (a === 0) throw new RangeError('A não pode ser zero na regra de três direta')
    return (b * c) / a
}

export const percentage = {
    /** Quanto é X% de Y */
    of: (x: number, y: number) => (x * y) / 100,
    /** X é quantos % de Y */
    ratio: (x: number, y: number) => {
        if (y === 0) throw new RangeError('O valor total não pode ser zero')
        return (x / y) * 100
    },
    /** Variação percentual de A para B */
    change: (from: number, to: number) => {
        if (from === 0) throw new RangeError('O valor inicial não pode ser zero')
        return ((to - from) / Math.abs(from)) * 100
    },
    /** Y com aumento de X% */
    increase: (y: number, x: number) => y * (1 + x / 100),
    /** Y com desconto de X% */
    decrease: (y: number, x: number) => y * (1 - x / 100),
}

export interface RandomNumberOptions {
    min: number
    max: number
    count: number
    unique?: boolean
    sort?: boolean
}

/** Inteiro uniforme em [0, range) sem viés de módulo. */
function randomBelow(range: number, randomUint32: () => number): number {
    const limit = Math.floor(0x1_0000_0000 / range) * range
    let x: number
    do {
        x = randomUint32()
    } while (x >= limit)
    return x % range
}

function cryptoUint32(): number {
    const buf = new Uint32Array(1)
    crypto.getRandomValues(buf)
    return buf[0]
}

/** Gera números inteiros aleatórios com gerador criptográfico. */
export function generateRandomNumbers(
    { min, max, count, unique = false, sort = false }: RandomNumberOptions,
    randomUint32: () => number = cryptoUint32,
): number[] {
    if (!Number.isInteger(min) || !Number.isInteger(max)) throw new RangeError('Use números inteiros')
    if (min > max) throw new RangeError('O mínimo deve ser menor ou igual ao máximo')
    const range = max - min + 1
    if (range > 0x1_0000_0000) throw new RangeError('Intervalo muito grande')
    if (!Number.isInteger(count) || count < 1) throw new RangeError('A quantidade deve ser um inteiro maior que zero')
    if (unique && count > range) throw new RangeError('Quantidade maior que o intervalo sem repetição')

    const result: number[] = []
    const seen = new Set<number>()
    while (result.length < count) {
        const n = min + randomBelow(range, randomUint32)
        if (unique) {
            if (seen.has(n)) continue
            seen.add(n)
        }
        result.push(n)
    }
    return sort ? result.sort((a, b) => a - b) : result
}
