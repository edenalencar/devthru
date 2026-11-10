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
            "Validar o formato não substitui uma consulta à base oficial: um CPF ou CNPJ com dígitos corretos pode não estar cadastrado ou estar irregular. A checagem algorítmica serve para barrar erros de digitação e números inventados logo na entrada do formulário, antes de chamar serviços externos, o que economiza requisições e deixa a experiência de quem preenche mais rápida.",
        ],
    },
    generation: {
        name: "Geração",
        intro: [
            "Gerar identificadores e codificar dados do jeito certo é uma tarefa comum em APIs, integrações e testes automatizados. Os guias desta seção cobrem a criação de UUIDs, a codificação e decodificação em Base64 e a codificação de URLs, explicando quando usar cada formato e quais cuidados tomar com caracteres especiais e acentos.",
            "Todos os exemplos usam apenas a biblioteca padrão de cada linguagem, com versões em JavaScript, Python, Java e C#. Depois de entender o código, você pode conferir a saída na ferramenta online equivalente do DevThru.",
            "Um cuidado comum aos três assuntos é não confundir codificação com segurança. Base64 e a codificação de URLs apenas transformam o texto para que ele trafegue sem quebrar, e qualquer pessoa consegue desfazer a conversão. Já o UUID v4 é gerado de forma aleatória e serve como identificador único, mas não deve ser usado como senha ou token secreto. Os guias explicam essas diferenças com exemplos e mostram como decodificar o resultado para conferir que nada se perdeu na conversão.",
        ],
    },
    formatting: {
        name: "Formatação",
        intro: [
            "Um JSON bem formatado é mais fácil de ler, revisar e depurar. Os guias desta seção mostram como transformar um JSON compacto em texto indentado (o chamado prettify) usando a biblioteca padrão de cada linguagem, e como tratar um JSON inválido sem derrubar a aplicação.",
            "Os exemplos estão em JavaScript e Python e podem ser usados em scripts, rotinas de importação ou ferramentas internas. Para formatar um arquivo rapidamente sem escrever código, use o formatador de JSON online do DevThru.",
            "Formatar também ajuda a encontrar problemas. Quando o JSON está todo numa linha só, uma vírgula sobrando, uma aspa simples no lugar de aspas duplas ou uma chave sem fechamento passam despercebidas. Ao indentar o conteúdo, a estrutura de objetos e listas fica visível e a mensagem de erro aponta a posição exata do problema, o que acelera a correção em arquivos de configuração e respostas de APIs.",
            "Nos exemplos, você também vê como definir o tamanho da indentação, quantos espaços cada nível recebe, e como ordenar as chaves em ordem alfabética, o que facilita comparar dois arquivos parecidos e revisar mudanças em configurações e respostas de APIs ao longo do tempo.",
        ],
    },
}

export const GUIDES_INDEX_INTRO = [
    "Os guias de implementação do DevThru reúnem o passo a passo dos algoritmos por trás das nossas ferramentas: o cálculo do dígito verificador de CPF e CNPJ, a montagem da chave de acesso de documentos fiscais eletrônicos, a validação de cartões pelo algoritmo de Luhn, a geração de UUIDs e a codificação em Base64 e de URLs.",
    "Cada guia traz a explicação da regra, um código completo em uma linguagem popular (JavaScript, Python, Java ou C#) e um link para a ferramenta online correspondente, onde você confere o resultado. O código não depende de bibliotecas externas, então funciona em qualquer projeto. Escolha uma categoria abaixo ou vá direto ao guia da linguagem que você usa.",
    "Os guias estão organizados em três categorias: validação, com documentos brasileiros, cartões e chaves fiscais; geração, com identificadores e codificação de dados; e formatação, com JSON. Novos guias são adicionados conforme surgem ferramentas no DevThru, sempre com a mesma estrutura: o problema que o código resolve, a regra explicada em português, o código comentado e os erros mais comuns ao implementar.",
]

export function guideCategoryName(category: string): string {
    return GUIDE_CATEGORY_INFO[category]?.name ?? category
}
