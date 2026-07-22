export const MIN_META_DESCRIPTION_LENGTH = 150
export const MAX_META_DESCRIPTION_LENGTH = 165

const LANGUAGE_LABELS: Record<string, string> = {
    python: "Python",
    javascript: "JavaScript",
    java: "Java",
    csharp: "C#",
}

const GUIDE_TOOL_TERMS: Record<string, { verb: string; object: string }> = {
    cpf: { verb: "validar", object: "CPF" },
    cnpj: { verb: "validar", object: "CNPJ" },
    json: { verb: "formatar", object: "JSON" },
    "nfe-generator": { verb: "validar", object: "chaves NF-e" },
    "cte-generator": { verb: "validar", object: "chaves CT-e" },
    "mdfe-generator": { verb: "validar", object: "chaves MDF-e" },
    "nfce-generator": { verb: "validar", object: "chaves NFC-e" },
    "uuid-generator": { verb: "gerar", object: "UUID v4" },
    "base64-encoder": { verb: "codificar e decodificar", object: "Base64" },
    "email-validator": { verb: "validar", object: "emails" },
    "credit-card-generator": { verb: "validar e gerar", object: "cartões" },
    "split-payment": { verb: "simular e calcular", object: "Split Payment de IBS e CBS" },
    "vet-efx-calculator": { verb: "simular e calcular", object: "VET e eFX Cambial" },
    "url-encoder": { verb: "codificar e decodificar", object: "URLs" },
}

export const GUIDE_CATEGORY_META_DESCRIPTIONS: Record<string, string> = {
    validation: "Explore guias de validação do DevThru com exemplos em Python, JavaScript, Java e C# para CPF, email, chaves fiscais e cartões, com código pronto para usar.",
    formatting: "Aprenda formatação de dados no DevThru com guias práticos de JSON, exemplos em linguagens populares e snippets prontos para usar em projetos web modernos.",
    generation: "Veja guias de geração no DevThru para UUID, Base64 e URLs, com exemplos em Python, JavaScript, Java e C# e código pronto para projetos web modernos e APIs.",
}

export const TOOL_META_DESCRIPTIONS = {
    caseConverter: "Transforme textos para UPPERCASE, lowercase, camelCase, PascalCase e snake_case em segundos. Conversor de texto online gratuito, sem cadastro e no navegador.",
    fipe: "Consulte a Tabela FIPE com preços médios de carros, motos e caminhões no mercado brasileiro. Pesquise por marca, modelo e ano de fabricação grátis no DevThru.",
} as const

export function generateGuideMetaDescription(toolId: string, languageId: string): string {
    const languageLabel = LANGUAGE_LABELS[languageId] ?? languageId
    const terms = GUIDE_TOOL_TERMS[toolId] ?? {
        verb: "implementar",
        object: toolId.replace(/-/g, " "),
    }

    let description = `Aprenda a ${terms.verb} ${terms.object} em ${languageLabel} com código pronto, explicação do algoritmo e exemplos para aplicar em APIs, formulários e testes de software.`

    if (description.length < MIN_META_DESCRIPTION_LENGTH) {
        description += " no DevThru."
    }

    return description
}
