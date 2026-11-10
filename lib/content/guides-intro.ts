/** Nome e texto de apresentação de cada categoria de guias (/guides e /guides/[category]). */
export interface GuideCategoryInfo {
    name: string
    intro: string[]
}

export const GUIDE_CATEGORY_INFO: Record<string, GuideCategoryInfo> = {
    validation: {
        name: "Validação",
        intro: [
            "Validar um dado antes de gravá-lo evita retrabalho, cadastros duplicados e notas fiscais rejeitadas. Os guias desta seção mostram como conferir CPF, CNPJ, e-mail, números de cartão e chaves de acesso de NF-e, NFC-e, CT-e e MDF-e usando o mesmo cálculo de dígito verificador que a Receita Federal e as SEFAZ aplicam.",
            "Cada guia explica a regra passo a passo e traz uma implementação completa em JavaScript, Python, Java ou C#, sem bibliotecas externas. Você pode copiar o código para o seu projeto e comparar o resultado com a ferramenta online correspondente do DevThru, que roda a mesma validação direto no navegador.",
        ],
    },
    generation: {
        name: "Geração",
        intro: [
            "Gerar identificadores e codificar dados do jeito certo é uma tarefa comum em APIs, integrações e testes automatizados. Os guias desta seção cobrem a criação de UUIDs, a codificação e decodificação em Base64 e a codificação de URLs, explicando quando usar cada formato e quais cuidados tomar com caracteres especiais e acentos.",
            "Todos os exemplos usam apenas a biblioteca padrão de cada linguagem, com versões em JavaScript, Python, Java e C#. Depois de entender o código, você pode conferir a saída na ferramenta online equivalente do DevThru.",
        ],
    },
    formatting: {
        name: "Formatação",
        intro: [
            "Um JSON bem formatado é mais fácil de ler, revisar e depurar. Os guias desta seção mostram como transformar um JSON compacto em texto indentado (o chamado prettify) usando a biblioteca padrão de cada linguagem, e como tratar um JSON inválido sem derrubar a aplicação.",
            "Os exemplos estão em JavaScript e Python e podem ser usados em scripts, rotinas de importação ou ferramentas internas. Para formatar um arquivo rapidamente sem escrever código, use o formatador de JSON online do DevThru.",
        ],
    },
}

export const GUIDES_INDEX_INTRO = [
    "Os guias de implementação do DevThru reúnem o passo a passo dos algoritmos por trás das nossas ferramentas: o cálculo do dígito verificador de CPF e CNPJ, a montagem da chave de acesso de documentos fiscais eletrônicos, a validação de cartões pelo algoritmo de Luhn, a geração de UUIDs e a codificação em Base64 e de URLs.",
    "Cada guia traz a explicação da regra, um código completo em uma linguagem popular (JavaScript, Python, Java ou C#) e um link para a ferramenta online correspondente, onde você confere o resultado. O código não depende de bibliotecas externas, então funciona em qualquer projeto. Escolha uma categoria abaixo ou vá direto ao guia da linguagem que você usa.",
]

export function guideCategoryName(category: string): string {
    return GUIDE_CATEGORY_INFO[category]?.name ?? category
}
