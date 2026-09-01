export interface SefazKeyDecoded {
    rawKey: string
    formattedKey: string
    isValidLength: boolean
    isValidDv: boolean
    calculatedDv: number
    providedDv: number
    uf: {
        code: string
        name: string
        state: string
    }
    yearMonth: {
        raw: string
        formatted: string
        year: string
        month: string
    }
    cnpj: {
        raw: string
        formatted: string
    }
    model: {
        code: string
        name: string
        description: string
    }
    series: string
    number: {
        raw: string
        formatted: string
    }
    emissionType: {
        code: string
        name: string
        description: string
    }
    numericCode: string
}

export const UF_IBGE_MAP: Record<string, { name: string; state: string }> = {
    "11": { state: "RO", name: "Rondônia" },
    "12": { state: "AC", name: "Acre" },
    "13": { state: "AM", name: "Amazonas" },
    "14": { state: "RR", name: "Roraima" },
    "15": { state: "PA", name: "Pará" },
    "16": { state: "AP", name: "Amapá" },
    "17": { state: "TO", name: "Tocantins" },
    "21": { state: "MA", name: "Maranhão" },
    "22": { state: "PI", name: "Piauí" },
    "23": { state: "CE", name: "Ceará" },
    "24": { state: "RN", name: "Rio Grande do Norte" },
    "25": { state: "PB", name: "Paraíba" },
    "26": { state: "PE", name: "Pernambuco" },
    "27": { state: "AL", name: "Alagoas" },
    "28": { state: "SE", name: "Sergipe" },
    "29": { state: "BA", name: "Bahia" },
    "31": { state: "MG", name: "Minas Gerais" },
    "32": { state: "ES", name: "Espírito Santo" },
    "33": { state: "RJ", name: "Rio de Janeiro" },
    "35": { state: "SP", name: "São Paulo" },
    "41": { state: "PR", name: "Paraná" },
    "42": { state: "SC", name: "Santa Catarina" },
    "43": { state: "RS", name: "Rio Grande do Sul" },
    "50": { state: "MS", name: "Mato Grosso do Sul" },
    "51": { state: "MT", name: "Mato Grosso" },
    "52": { state: "GO", name: "Goiás" },
    "53": { state: "DF", name: "Distrito Federal" },
}

export const FISCAL_MODELS: Record<string, { name: string; description: string }> = {
    "55": { name: "NF-e", description: "Nota Fiscal Eletrônica (Operações Comerciais / B2B e B2C)" },
    "65": { name: "NFC-e", description: "Nota Fiscal de Consumidor Eletrônica (Varejo / Cupom Fiscal)" },
    "57": { name: "CT-e", description: "Conhecimento de Transporte Eletrônico (Logística / Fretes)" },
    "58": { name: "MDF-e", description: "Manifesto Eletrônico de Documentos Fiscais (Cargas Consolidadas)" },
    "67": { name: "CT-e OS", description: "Conhecimento de Transporte Eletrônico para Outros Serviços" },
}

export const EMISSION_TYPES: Record<string, { name: string; description: string }> = {
    "1": { name: "Normal", description: "Emissão normal com autorização em tempo real na SEFAZ" },
    "2": { name: "Contingência FS-IA", description: "Contingência com Formulário de Segurança para Impressão de Documento Auxiliar" },
    "3": { name: "Contingência SCAN", description: "Contingência Sistema de Contingência do Ambiente Nacional (descontinuado)" },
    "4": { name: "Contingência DPEC", description: "Contingência Declaração Prévia de Emissão em Contingência" },
    "5": { name: "Contingência FS-DA", description: "Contingência com Formulário de Segurança de Documento Auxiliar" },
    "6": { name: "Contingência SVC-AN", description: "Contingência SEFAZ Virtual de Contingência Ambiente Nacional" },
    "7": { name: "Contingência SVC-RS", description: "Contingência SEFAZ Virtual de Contingência Rio Grande do Sul" },
    "9": { name: "Contingência Offline NFC-e", description: "Contingência off-line padrão para emissão no varejo (NFC-e)" },
}

export function calculateSefazDv(keyWithoutDv: string): number {
    if (keyWithoutDv.length !== 43) return -1
    
    let sum = 0
    let weight = 2
    
    for (let i = 42; i >= 0; i--) {
        const digit = parseInt(keyWithoutDv.charAt(i), 10)
        if (isNaN(digit)) return -1
        sum += digit * weight
        weight = weight === 9 ? 2 : weight + 1
    }
    
    const remainder = sum % 11
    if (remainder === 0 || remainder === 1) {
        return 0
    }
    return 11 - remainder
}

export function formatCnpj(cnpj: string): string {
    const clean = cnpj.replace(/\D/g, '')
    if (clean.length !== 14) return cnpj
    return clean.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
}

export function formatSefazKey(key: string): string {
    const clean = key.replace(/\D/g, '')
    if (clean.length !== 44) return key
    return clean.replace(/(\d{4})/g, '$1 ').trim()
}

export function decodeSefazKey(rawInput: string): SefazKeyDecoded | null {
    const clean = rawInput.replace(/\D/g, '')
    if (clean.length < 43) return null

    const cUf = clean.substring(0, 2)
    const aaMm = clean.substring(2, 6)
    const cnpjRaw = clean.substring(6, 20)
    const mod = clean.substring(20, 22)
    const serie = clean.substring(22, 25)
    const nNf = clean.substring(25, 34)
    const tpEmis = clean.substring(34, 35)
    const cNf = clean.substring(35, 43)
    const providedDv = clean.length === 44 ? parseInt(clean.substring(43, 44), 10) : -1

    const key43 = clean.substring(0, 43)
    const calculatedDv = calculateSefazDv(key43)

    const ufInfo = UF_IBGE_MAP[cUf] || { state: "Desconhecido", name: `Código ${cUf}` }
    const modelInfo = FISCAL_MODELS[mod] || { name: `Modelo ${mod}`, description: "Documento fiscal customizado ou não reconhecido" }
    const emissionInfo = EMISSION_TYPES[tpEmis] || { name: `Tipo ${tpEmis}`, description: "Modalidade de emissão não catalogada" }

    const year = "20" + aaMm.substring(0, 2)
    const month = aaMm.substring(2, 4)
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const monthIndex = parseInt(month, 10) - 1
    const monthName = monthIndex >= 0 && monthIndex < 12 ? monthNames[monthIndex] : `Mês ${month}`

    return {
        rawKey: clean,
        formattedKey: formatSefazKey(clean.length === 43 ? clean + calculatedDv : clean),
        isValidLength: clean.length === 44,
        isValidDv: clean.length === 44 && providedDv === calculatedDv,
        calculatedDv,
        providedDv,
        uf: {
            code: cUf,
            name: ufInfo.name,
            state: ufInfo.state,
        },
        yearMonth: {
            raw: aaMm,
            formatted: `${monthName} de ${year}`,
            year,
            month,
        },
        cnpj: {
            raw: cnpjRaw,
            formatted: formatCnpj(cnpjRaw),
        },
        model: {
            code: mod,
            name: modelInfo.name,
            description: modelInfo.description,
        },
        series: parseInt(serie, 10).toString(),
        number: {
            raw: nNf,
            formatted: parseInt(nNf, 10).toLocaleString("pt-BR"),
        },
        emissionType: {
            code: tpEmis,
            name: emissionInfo.name,
            description: emissionInfo.description,
        },
        numericCode: cNf,
    }
}
