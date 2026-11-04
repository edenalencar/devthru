// Faixas de CEP por UF (Correios). Cada faixa usa os 5 primeiros dígitos (prefixo).
// Um CEP dentro da faixa é válido para o estado, mas não garante que o logradouro exista.

export type UF =
    | 'AC' | 'AL' | 'AM' | 'AP' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MG' | 'MS' | 'MT' | 'PA'
    | 'PB' | 'PE' | 'PI' | 'PR' | 'RJ' | 'RN' | 'RO' | 'RR' | 'RS' | 'SC' | 'SE' | 'SP' | 'TO'

type Range = [number, number]

export const CEP_RANGES: Record<UF, Range[]> = {
    SP: [[1000, 19999]],
    RJ: [[20000, 28999]],
    ES: [[29000, 29999]],
    MG: [[30000, 39999]],
    BA: [[40000, 48999]],
    SE: [[49000, 49999]],
    PE: [[50000, 56999]],
    AL: [[57000, 57999]],
    PB: [[58000, 58999]],
    RN: [[59000, 59999]],
    CE: [[60000, 63999]],
    PI: [[64000, 64999]],
    MA: [[65000, 65999]],
    PA: [[66000, 68899]],
    AP: [[68900, 68999]],
    AM: [[69000, 69299], [69400, 69899]],
    RR: [[69300, 69399]],
    AC: [[69900, 69999]],
    DF: [[70000, 72799], [73000, 73699]],
    GO: [[72800, 72999], [73700, 76799]],
    RO: [[76800, 76999], [78900, 78999]],
    TO: [[77000, 77999]],
    MT: [[78000, 78899]],
    MS: [[79000, 79999]],
    PR: [[80000, 87999]],
    SC: [[88000, 89999]],
    RS: [[90000, 99999]],
}

export const UF_NAMES: Record<UF, string> = {
    AC: 'Acre', AL: 'Alagoas', AM: 'Amazonas', AP: 'Amapá', BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal',
    ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MG: 'Minas Gerais', MS: 'Mato Grosso do Sul',
    MT: 'Mato Grosso', PA: 'Pará', PB: 'Paraíba', PE: 'Pernambuco', PI: 'Piauí', PR: 'Paraná',
    RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RO: 'Rondônia', RR: 'Roraima', RS: 'Rio Grande do Sul',
    SC: 'Santa Catarina', SE: 'Sergipe', SP: 'São Paulo', TO: 'Tocantins',
}

/** Faixas das capitais, usadas pelo gerador de endereço para o CEP bater com a cidade. */
export const CAPITAL_CEP_RANGES: Record<string, Range[]> = {
    'São Paulo': [[1000, 5999], [8000, 8499]],
    'Rio de Janeiro': [[20000, 23799]],
    'Belo Horizonte': [[30000, 31999]],
    'Curitiba': [[80000, 82999]],
    'Porto Alegre': [[90000, 91999]],
    'Salvador': [[40000, 42599]],
    'Recife': [[50000, 52999]],
    'Fortaleza': [[60000, 61599]],
    'Brasília': [[70000, 72799], [73000, 73699]],
    'Manaus': [[69000, 69099]],
    'Goiânia': [[74000, 74899]],
    'Belém': [[66000, 66999]],
}

export const ALL_UFS = Object.keys(CEP_RANGES) as UF[]

function pickPrefix(ranges: Range[], random: () => number): number {
    const total = ranges.reduce((acc, [a, b]) => acc + (b - a + 1), 0)
    let n = Math.floor(random() * total)
    for (const [a, b] of ranges) {
        const size = b - a + 1
        if (n < size) return a + n
        n -= size
    }
    return ranges[0][0]
}

export function formatCep(digits: string, withMask = true): string {
    return withMask ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
}

function buildCep(ranges: Range[], withMask: boolean, random: () => number): string {
    const prefix = pickPrefix(ranges, random).toString().padStart(5, '0')
    // Sufixo 000 a 899: 900–999 são reservados a CEPs especiais (Caixas Postais, grandes usuários).
    const suffix = Math.floor(random() * 900).toString().padStart(3, '0')
    return formatCep(prefix + suffix, withMask)
}

/** CEP aleatório válido para a UF informada (ou para qualquer UF). */
export function generateCep(uf?: UF, withMask = true, random: () => number = Math.random): string {
    const state = uf ?? ALL_UFS[Math.floor(random() * ALL_UFS.length)]
    return buildCep(CEP_RANGES[state], withMask, random)
}

/** CEP aleatório que pertence à cidade (capitais) ou, se não houver faixa da cidade, à UF. */
export function generateCepForCity(city: string, uf: UF, withMask = true, random: () => number = Math.random): string {
    return buildCep(CAPITAL_CEP_RANGES[city] ?? CEP_RANGES[uf], withMask, random)
}

/** Identifica a UF de um CEP pela faixa. Retorna null se o formato for inválido ou fora das faixas. */
export function findUfByCep(cep: string): UF | null {
    const digits = cep.replace(/\D/g, '')
    if (digits.length !== 8) return null
    const prefix = Number(digits.slice(0, 5))
    for (const uf of ALL_UFS) {
        if (CEP_RANGES[uf].some(([a, b]) => prefix >= a && prefix <= b)) return uf
    }
    return null
}
