
export interface ProgrammaticContent {
    toolId: string
    languageId: string
    title: string
    description: string
    category: 'validation' | 'formatting' | 'generation'
    toolCategory: 'documents' | 'utilities' | 'business' | 'text' | 'finance'
    content: {
        intro: string
        algorithm: string
        code: string
        explanation: string
    }
}

export const PROGRAMMATIC_CONTENT: ProgrammaticContent[] = [
    // CPF - Python
    {
        toolId: "cpf",
        languageId: "python",
        title: "Como Validar CPF em Python (Algoritmo Completo)",
        description: "Aprenda a implementar um validador de CPF em Python. Código pronto, explicação do algoritmo e exemplos de uso.",
        category: "validation",
        toolCategory: "documents",
        content: {
            intro: "Validar CPF é uma tarefa comum em sistemas brasileiros. Neste guia, você vai aprender a validar o Cadastro de Pessoas Físicas usando Python puro, sem dependências externas.",
            algorithm: "O algoritmo de validação do CPF funciona calculando dois dígitos verificadores com base nos 9 primeiros dígitos. Se os dígitos calculados forem iguais aos informados, o CPF é válido.",
            code: `def validate_cpf(cpf: str) -> bool:
    # Remove caracteres não numéricos
    cpf = ''.join(filter(str.isdigit, cpf))

    # Verifica se tem 11 dígitos ou se todos são iguais
    if len(cpf) != 11 or len(set(cpf)) == 1:
        return False

    # Validação do primeiro dígito
    sum_val = sum(int(cpf[i]) * (10 - i) for i in range(9))
    digit_1 = (sum_val * 10) % 11
    if digit_1 == 10: digit_1 = 0

    if digit_1 != int(cpf[9]):
        return False

    # Validação do segundo dígito
    sum_val = sum(int(cpf[i]) * (11 - i) for i in range(10))
    digit_2 = (sum_val * 10) % 11
    if digit_2 == 10: digit_2 = 0

    return digit_2 == int(cpf[10])`,
            explanation: "A função `validate_cpf` primeiro limpa a entrada, removendo pontos e traços. Em seguida, verifica se a string resultante tem o comprimento correto (11) e se não é uma sequência de dígitos iguais (o que invalidaria o cálculo). Depois, aplica o cálculo padrão dos dois dígitos verificadores."
        }
    },
    // CPF - JavaScript
    {
        toolId: "cpf",
        languageId: "javascript",
        title: "Como Validar CPF em JavaScript (Frontend e Backend)",
        description: "Snippet JavaScript otimizado para validação de CPF. Funciona no navegador e no Node.js.",
        category: "validation",
        toolCategory: "documents",
        content: {
            intro: "A validação de CPF no lado do cliente melhora a experiência do usuário, fornecendo feedback imediato. Este código JavaScript é leve e eficiente.",
            algorithm: "A lógica segue o padrão da Receita Federal: cálculo do primeiro dígito verificador usando pesos de 10 a 2, e do segundo usando pesos de 11 a 2. O resto da divisão por 11 define o dígito.",
            code: `function validateCPF(cpf) {
    cpf = cpf.replace(/[^\\d]+/g, '');

    if (cpf.length !== 11 || /^(\\d)\\1+$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) 
        sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
    
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) 
        sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
    
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}`,
            explanation: "Esta função Javascript utiliza expressões regulares para limpar a entrada e verificar dígitos repetidos. Em seguida, realiza os loops de cálculo para cada dígito verificador. É compatível com qualquer ambiente JS moderno."
        }
    },
    // CNPJ - Python
    {
        toolId: "cnpj",
        languageId: "python",
        title: "Como Validar CNPJ em Python (Script Simples)",
        description: "Aprenda a criar uma função de validação de CNPJ em Python. Entenda o cálculo dos dígitos verificadores.",
        category: "validation",
        toolCategory: "documents",
        content: {
            intro: "O CNPJ (Cadastro Nacional da Pessoa Jurídica) possui um algoritmo de validação específico. Este tutorial mostra como implementar essa verificação em Python.",
            algorithm: "O algoritmo utiliza pesos de 2 a 9 para calcular os dois dígitos verificadores. A soma é dividida por 11 e o resto determina o dígito.",
            code: `import re

def validate_cnpj(cnpj: str) -> bool:
    cnpj = re.sub(r'[^0-9]', '', cnpj)

    if len(cnpj) != 14 or len(set(cnpj)) == 1:
        return False

    # Validação do primeiro dígito
    weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    sum_val = sum(int(cnpj[i]) * weights[i] for i in range(12))
    remainder = sum_val % 11
    digit_1 = 0 if remainder < 2 else 11 - remainder

    if int(cnpj[12]) != digit_1:
        return False

    # Validação do segundo dígito
    weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    sum_val = sum(int(cnpj[i]) * weights[i] for i in range(13))
    remainder = sum_val % 11
    digit_2 = 0 if remainder < 2 else 11 - remainder

    return int(cnpj[13]) == digit_2`,
            explanation: "O código remove caracteres não numéricos e verifica o tamanho. Em seguida, aplica os pesos definidos pela Receita Federal para validar cada um dos dois dígitos finais."
        }
    },
    // CNPJ - JavaScript
    {
        toolId: "cnpj",
        languageId: "javascript",
        title: "Como Validar CNPJ em JavaScript (Validar Formulário)",
        description: "Valide CNPJ no frontend ou no Node.js com este snippet de código JavaScript otimizado.",
        category: "validation",
        toolCategory: "documents",
        content: {
            intro: "Validar CNPJ no cliente é essencial para evitar erros de digitação em formulários corporativos. Veja como fazer isso com JavaScript puro.",
            algorithm: "Semelhante ao CPF, mas com 14 dígitos e pesos diferentes. O cálculo dos dois digitos verificadores garante a integridade do número.",
            code: `function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\\d]+/g, '');

    if (cnpj.length !== 14 || /^(\\d)\\1+$/.test(cnpj)) return false;

    let size = cnpj.length - 2
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(0)) return false;

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(1)) return false;

    return true;
}`,
            explanation: "A função percorre os dígitos applicando os pesos necessários (que variam de 2 a 9 e reiniciam). Se o resto da divisão bater com os dígitos verificadores, o CNPJ é válido."
        }
    },
    // JSON - Python
    {
        toolId: "json",
        languageId: "python",
        title: "Como Formatar JSON em Python (Prettify)",
        description: "Aprenda a identar e formatar strings JSON em Python usando a biblioteca padrão 'json'.",
        category: "formatting",
        toolCategory: "utilities",
        content: {
            intro: "Manipular JSON é essencial em Python, especialmente para APIs e configuração. Veja como formatar JSON para leitura humana.",
            algorithm: "A biblioteca `json` nativa do Python possui o método `dumps` com o parâmetro `indent`, que faz todo o trabalho pesado.",
            code: `import json

def format_json(json_str: str) -> str:
    try:
        parsed = json.loads(json_str)
        return json.dumps(parsed, indent=4, sort_keys=True)
    except json.JSONDecodeError:
        return "JSON Inválido"

# Exemplo
raw_json = '{"nome":"Maria","idade":25,"cidade":"São Paulo"}'
formatted = format_json(raw_json)
print(formatted)`,
            explanation: "Primeiro convertemos a string JSON em um dicionário Python com `json.loads`. Depois, usamos `json.dumps` com `indent=4` para criar a string formatada. `sort_keys=True` organiza as chaves alfabeticamente."
        }
    },
    // JSON - JavaScript
    {
        toolId: "json",
        languageId: "javascript",
        title: "Como Formatar JSON em JavaScript (Prettify)",
        description: "Formate objetos JSON em strings legíveis usando JSON.stringify no JavaScript.",
        category: "formatting",
        toolCategory: "utilities",
        content: {
            intro: "Em JavaScript, formatar JSON é extremamente simples graças à API nativa do navegador/Node.js.",
            algorithm: "O método `JSON.stringify` aceita um terceiro argumento que define o número de espaços para indentação.",
            code: `function formatJSON(jsonString) {
    try {
        const obj = JSON.parse(jsonString);
        return JSON.stringify(obj, null, 4);
    } catch (e) {
        return "JSON Inválido";
    }
}

const raw = '{"id":1,"status":"active"}';
console.log(formatJSON(raw));`,
            explanation: "O terceiro parâmetro de `JSON.stringify(obj, replacer, space)` define a indentação. Usamos 4 espaços para máxima legibilidade."
        }
    },
    // Fiscal Keys (NF-e/NFC-e/CT-e/MDF-e) - Python
    {
        toolId: "nfe-generator",
        languageId: "python",
        title: "Como Validar Chave de Acesso NF-e em Python",
        description: "Aprenda o algoritmo Módulo 11 usado para validar chaves de Nota Fiscal Eletrônica (NF-e).",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "A Chave de Acesso da NF-e é composta por 44 dígitos que contêm informações como UF, Data, CNPJ e Modelo. O último dígito é o verificador (DV).",
            algorithm: "O DV é calculado usando o Módulo 11 com pesos de 2 a 9. Se o resto for 0 ou 1, o DV é 0. Caso contrário, é 11 menos o resto.",
            code: `def validate_access_key(key: str) -> bool:
    if len(key) != 44 or not key.isdigit():
        return False
    
    # Validação do DV (Dígito Verificador)
    base_key = key[:43]
    weights = [2, 3, 4, 5, 6, 7, 8, 9]
    total = 0
    weight_index = 0
    
    # Percorre de trás para frente
    for digit in reversed(base_key):
        total += int(digit) * weights[weight_index]
        weight_index = (weight_index + 1) % 8
        
    remainder = total % 11
    dv = 0 if remainder < 2 else 11 - remainder
    
    return int(key[43]) == dv`,
            explanation: "A função verifica se a chave tem 44 dígitos numéricos. Em seguida, percorre os primeiros 43 dígitos de trás para frente, multiplicando por pesos de 2 a 9 (ciclicamente). O DV calculado é comparado com o último dígito da chave."
        }
    },
    {
        toolId: "nfe-generator",
        languageId: "javascript",
        title: "Como Validar Chave de NF-e em JavaScript",
        description: "Valide chaves de acesso fiscal (NF-e, NFC-e, CT-e, MDF-e) no seu frontend ou backend Node.js.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "A validação da chave de acesso é crucial para garantir a integridade de documentos fiscais eletrônicos antes do envio à SEFAZ.",
            algorithm: "O dígito verificador (DV) é o 44º caractere. Ele é obtido através do cálculo do Módulo 11 sobre os 43 caracteres anteriores.",
            code: `function validateAccessKey(key) {
    if (key.length !== 44 || !/^\\d+$/.test(key)) return false;
    
    const baseKey = key.substring(0, 43);
    const existingDv = parseInt(key.charAt(43));
    let total = 0;
    let weight = 2;
    
    for (let i = 42; i >= 0; i--) {
        total += parseInt(baseKey.charAt(i)) * weight;
        weight++;
        if (weight > 9) weight = 2;
    }
    
    const remainder = total % 11;
    const calculatedDv = remainder < 2 ? 0 : 11 - remainder;
    
    return calculatedDv === existingDv;
}`,
            explanation: "O código itera sobre os 43 dígitos da chave base de trás para frente, aplicando pesos de 2 a 9. O resultado determina o dígito verificador esperado."
        }
    },
    // CT-e - Python
    {
        toolId: "cte-generator",
        languageId: "python",
        title: "Como Validar Chave de Acesso CT-e em Python",
        description: "Aprenda a validar chaves de Conhecimento de Transporte Eletrônico (CT-e) com este script Python.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "O CT-e (modelo 57) utiliza a mesma lógica de validação da NF-e. A chave de acesso possui 44 posições e garante a autenticidade do documento.",
            algorithm: "O dígito verificador é calculado via Módulo 11 (pesos 2-9). O resto da divisão por 11 determina o dígito final.",
            code: `def validate_cte_key(key: str) -> bool:
    if len(key) != 44 or not key.isdigit():
        return False
    
    # Validação do DV (Dígito Verificador)
    base_key = key[:43]
    weights = [2, 3, 4, 5, 6, 7, 8, 9]
    total = 0
    weight_index = 0
    
    # Percorre de trás para frente
    for digit in reversed(base_key):
        total += int(digit) * weights[weight_index]
        weight_index = (weight_index + 1) % 8
        
    remainder = total % 11
    dv = 0 if remainder < 2 else 11 - remainder
    
    return int(key[43]) == dv`,
            explanation: "O algoritmo verifica o tamanho da chave e calcula o dígito verificador. Se o dígito calculado for igual ao informado, a chave é matematicamente válida."
        }
    },
    // CT-e - JavaScript
    {
        toolId: "cte-generator",
        languageId: "javascript",
        title: "Como Validar Chave de CT-e em JavaScript",
        description: "Valide chaves de acesso CT-e no navegador ou servidor Node.js com alta performance.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "A validação frontend de chaves CT-e evita erros de digitação antes do envio para o backend ou SEFAZ.",
            algorithm: "O algoritmo padrão Modulo 11 é utilizado para calcular o dígito verificador da chave de 44 dígitos.",
            code: `function validateCteKey(key) {
    if (key.length !== 44 || !/^\\d+$/.test(key)) return false;
    
    const baseKey = key.substring(0, 43);
    const existingDv = parseInt(key.charAt(43));
    let total = 0;
    let weight = 2;
    
    for (let i = 42; i >= 0; i--) {
        total += parseInt(baseKey.charAt(i)) * weight;
        weight++;
        if (weight > 9) weight = 2;
    }
    
    const remainder = total % 11;
    const calculatedDv = remainder < 2 ? 0 : 11 - remainder;
    
    return calculatedDv === existingDv;
}`,
            explanation: "Esta função é otimizada para performance, evitando alocações de array desnecessárias durante o cálculo do peso."
        }
    },
    // MDF-e - Python
    {
        toolId: "mdfe-generator",
        languageId: "python",
        title: "Como Validar Chave de MDF-e em Python",
        description: "Script Python para validar chaves de Manifesto Eletrônico de Documentos Fiscais (MDF-e).",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "O MDF-e (modelo 58) é obrigatório no transporte interestadual. Sua chave de acesso segue o padrão nacional de documentos fiscais.",
            algorithm: "A validação consiste em recalcular o último dígito (DV) usando o algoritmo Módulo 11 sobre os 43 dígitos anteriores.",
            code: `def validate_mdfe_key(key: str) -> bool:
    # A lógica é idêntica à da NF-e e CT-e
    if len(key) != 44 or not key.isdigit():
        return False
    
    base_key = key[:43]
    weights = [2, 3, 4, 5, 6, 7, 8, 9]
    total = 0
    weight_index = 0
    
    for digit in reversed(base_key):
        total += int(digit) * weights[weight_index]
        weight_index = (weight_index + 1) % 8
        
    remainder = total % 11
    dv = 0 if remainder < 2 else 11 - remainder
    
    return int(key[43]) == dv`,
            explanation: "O código implementa o algoritmo oficial. Note que o MDF-e se diferencia apenas pelo modelo (58) na composição da chave, mas o cálculo do DV é o mesmo."
        }
    },
    // MDF-e - JavaScript
    {
        toolId: "mdfe-generator",
        languageId: "javascript",
        title: "Como Validar Chave de MDF-e em JavaScript",
        description: "Implementação JavaScript da validação de chave de acesso para MDF-e.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "Garanta a consistência da chave de acesso do MDF-e em suas aplicações web com esta função de validação simples.",
            algorithm: "Utiliza aritmética modular (Mod 11) com pesos de 2 a 9 para verificar a integridade da chave.",
            code: `function validateMdfeKey(key) {
    if (key.length !== 44 || !/^\\d+$/.test(key)) return false;
    
    const baseKey = key.substring(0, 43);
    const existingDv = parseInt(key.charAt(43));
    let total = 0;
    let weight = 2;
    
    for (let i = 42; i >= 0; i--) {
        total += parseInt(baseKey.charAt(i)) * weight;
        weight++;
        if (weight > 9) weight = 2;
    }
    
    const remainder = total % 11;
    const calculatedDv = remainder < 2 ? 0 : 11 - remainder;
    
    return calculatedDv === existingDv;
}`,
            explanation: "A função valida o formato e o dígito verificador, retornando true apenas se a chave for válida."
        }
    },
    // NFC-e - Python
    {
        toolId: "nfce-generator",
        languageId: "python",
        title: "Como Validar Chave de NFC-e em Python",
        description: "Valide chaves de Nota Fiscal de Consumidor Eletrônica (NFC-e) com Python.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "A NFC-e (modelo 65) substitui o cupom fiscal. Sua chave de acesso é validada da mesma forma que a NF-e.",
            algorithm: "O dígito verificador é obtido pelo Módulo 11 dos 43 dígitos anteriores, garantindo que não houve erro de digitação.",
            code: `def validate_nfce_key(key: str) -> bool:
    if len(key) != 44 or not key.isdigit():
        return False
    
    base_key = key[:43]
    weights = [2, 3, 4, 5, 6, 7, 8, 9]
    total = 0
    weight_index = 0
    
    for digit in reversed(base_key):
        total += int(digit) * weights[weight_index]
        weight_index = (weight_index + 1) % 8
        
    remainder = total % 11
    dv = 0 if remainder < 2 else 11 - remainder
    
    return int(key[43]) == dv`,
            explanation: "Simples e direto: verifica tamanho, compõe apenas números e recalcula o DV."
        }
    },
    // NFC-e - JavaScript
    {
        toolId: "nfce-generator",
        languageId: "javascript",
        title: "Como Validar Chave de NFC-e em JavaScript",
        description: "Snippet para validar chave de acesso de NFC-e em aplicações web e mobile.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "A validação de NFC-e no ponto de venda (PDV) ou apps de consumo é vital. Este código resolve isso de forma leve.",
            algorithm: "O cálculo do dígito verificador segue o padrão global de documentos fiscais eletrônicos brasileiros.",
            code: `function validateNfceKey(key) {
    if (key.length !== 44 || !/^\\d+$/.test(key)) return false;
    
    const baseKey = key.substring(0, 43);
    const existingDv = parseInt(key.charAt(43));
    let total = 0;
    let weight = 2;
    
    for (let i = 42; i >= 0; i--) {
        total += parseInt(baseKey.charAt(i)) * weight;
        weight++;
        if (weight > 9) weight = 2;
    }
    
    const remainder = total % 11;
    const calculatedDv = remainder < 2 ? 0 : 11 - remainder;
    
    return calculatedDv === existingDv;
}`,
            explanation: "Compatível com qualquer framework JavaScript (React, Vue, Angular, etc) e Node.js."
        }
    },
    // Fiscal Keys (NF-e/NFC-e/CT-e/MDF-e) - Java
    {
        toolId: "nfe-generator",
        languageId: "java",
        title: "Como Validar Chave de Acesso NF-e em Java",
        description: "Validação robusta de chaves de Nota Fiscal Eletrônica (NF-e) para sistemas corporativos Java.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "Em ambientes corporativos Java, a validação de chaves de acesso NF-e é crítica para garantir a integridade dos dados fiscais antes da transmissão para a SEFAZ.",
            algorithm: "O cálculo do Dígito Verificador (DV) utiliza o algoritmo Módulo 11. A chave de 43 dígitos é percorrida inversamente com pesos de 2 a 9.",
            code: `public class NfeValidator {
    public static boolean validate(String key) {
        if (key == null || key.length() != 44 || !key.matches("\\\\d+")) {
            return false;
        }
        
        String baseKey = key.substring(0, 43);
        int[] weights = {2, 3, 4, 5, 6, 7, 8, 9};
        int total = 0;
        int weightIndex = 0;
        
        for (int i = baseKey.length() - 1; i >= 0; i--) {
            total += Character.getNumericValue(baseKey.charAt(i)) * weights[weightIndex];
            weightIndex = (weightIndex + 1) % 8;
        }
        
        int remainder = total % 11;
        int dv = (remainder < 2) ? 0 : 11 - remainder;
        
        return Character.getNumericValue(key.charAt(43)) == dv;
    }
}`,
            explanation: "O método recebe a chave como String e verifica o tamanho e se é numérica. O loop calcula a soma ponderada dos 43 primeiros dígitos. O DV calculado é comparado com o último dígito da chave."
        }
    },
    {
        toolId: "nfe-generator",
        languageId: "csharp",
        title: "Como Validar Chave de Acesso NF-e em C#",
        description: "Validação de chaves de Nota Fiscal Eletrônica (NF-e) em C# (.NET).",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "Para aplicações .NET que lidam com documentos fiscais, validar a chave de acesso da NF-e é essencial. Este guia mostra como implementar a validação do DV.",
            algorithm: "Utiliza-se o algoritmo Módulo 11 com pesos de 2 a 9 sobre os 43 primeiros dígitos da chave para calcular o dígito verificador.",
            code: `public static bool ValidateNfeKey(string key)
{
    if (string.IsNullOrEmpty(key) || key.Length != 44 || !key.All(char.IsDigit))
        return false;

    string baseKey = key.Substring(0, 43);
    int[] weights = { 2, 3, 4, 5, 6, 7, 8, 9 };
    int total = 0;
    int weightIndex = 0;

    for (int i = baseKey.Length - 1; i >= 0; i--)
    {
        total += (int)char.GetNumericValue(baseKey[i]) * weights[weightIndex];
        weightIndex = (weightIndex + 1) % 8;
    }

    int remainder = total % 11;
    int dv = (remainder < 2) ? 0 : 11 - remainder;

    return (int)char.GetNumericValue(key[43]) == dv;
}`,
            explanation: "A função verifica se a string é nula, tem tamanho incorreto ou caracteres não numéricos. O cálculo do DV é feito iterando a chave de trás para frente com os pesos apropriados."
        }
    },
    // CT-e
    {
        toolId: "cte-generator",
        languageId: "java",
        title: "Como Validar Chave de Acesso CT-e em Java",
        description: "Validação de chaves de Conhecimento de Transporte Eletrônico (CT-e) em Java.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "A validação do CT-e segue a mesma lógica da NF-e, sendo fundamental em sistemas de logística e transporte desenvolvidos em Java.",
            algorithm: "O algoritmo Módulo 11 é aplicado aos 43 dígitos base da chave para encontrar o dígito verificador.",
            code: `public class CteValidator {
    public static boolean validate(String key) {
        if (key == null || key.length() != 44 || !key.matches("\\\\d+")) return false;
        
        String baseKey = key.substring(0, 43);
        int[] weights = {2, 3, 4, 5, 6, 7, 8, 9};
        int total = 0;
        int weightIndex = 0;
        
        for (int i = baseKey.length() - 1; i >= 0; i--) {
            total += Character.getNumericValue(baseKey.charAt(i)) * weights[weightIndex];
            weightIndex = (weightIndex + 1) % 8;
        }
        
        int remainder = total % 11;
        int dv = (remainder < 2) ? 0 : 11 - remainder;
        return Character.getNumericValue(key.charAt(43)) == dv;
    }
}`,
            explanation: "Implementação padrão do Módulo 11 para chaves fiscais. Garante que o CT-e possui um formato válido antes do processamento."
        }
    },
    {
        toolId: "cte-generator",
        languageId: "csharp",
        title: "Como Validar Chave de Acesso CT-e em C#",
        description: "Validação de chaves de Conhecimento de Transporte Eletrônico (CT-e) em C#.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "Sistemas de gestão de transporte (TMS) em .NET requerem validação precisa de chaves CT-e.",
            algorithm: "Cálculo do dígito verificador via Módulo 11 sobre os 43 caracteres iniciais.",
            code: `public static bool ValidateCteKey(string key)
{
    if (string.IsNullOrEmpty(key) || key.Length != 44 || !key.All(char.IsDigit)) return false;

    string baseKey = key.Substring(0, 43);
    int[] weights = { 2, 3, 4, 5, 6, 7, 8, 9 };
    int total = 0;
    int weightIndex = 0;

    for (int i = baseKey.Length - 1; i >= 0; i--)
    {
        total += (int)char.GetNumericValue(baseKey[i]) * weights[weightIndex];
        weightIndex = (weightIndex + 1) % 8;
    }

    int remainder = total % 11;
    int dv = (remainder < 2) ? 0 : 11 - remainder;
    return (int)char.GetNumericValue(key[43]) == dv;
}`,
            explanation: "Código otimizado para validação de chaves fiscais em C#, utilizando `char.GetNumericValue` e manipulação de strings."
        }
    },
    // MDF-e
    {
        toolId: "mdfe-generator",
        languageId: "java",
        title: "Como Validar Chave de Acesso MDF-e em Java",
        description: "Validação de chaves de Manifesto Eletrônico de Documentos Fiscais (MDF-e) em Java.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "MDF-e é crucial para o transporte interestadual. Sua validação em Java garante conformidade fiscal.",
            algorithm: "Usa o Módulo 11 padrão para calcular o dígito verificador da chave de 44 posições.",
            code: `public class MdfeValidator {
    public static boolean validate(String key) {
        if (key == null || key.length() != 44 || !key.matches("\\\\d+")) return false;
        
        String baseKey = key.substring(0, 43);
        int[] weights = {2, 3, 4, 5, 6, 7, 8, 9};
        int total = 0;
        int weightIndex = 0;
        
        for (int i = baseKey.length() - 1; i >= 0; i--) {
            total += Character.getNumericValue(baseKey.charAt(i)) * weights[weightIndex];
            weightIndex = (weightIndex + 1) % 8;
        }
        
        int remainder = total % 11;
        int dv = (remainder < 2) ? 0 : 11 - remainder;
        return Character.getNumericValue(key.charAt(43)) == dv;
    }
}`,
            explanation: "Validador estático simples e thread-safe para chaves MDF-e em aplicações Java."
        }
    },
    {
        toolId: "mdfe-generator",
        languageId: "csharp",
        title: "Como Validar Chave de Acesso MDF-e em C#",
        description: "Validação de chaves de Manifesto Eletrônico (MDF-e) em C#.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "Validação de MDF-e para sistemas logísticos desenvolvidos em plataforma Microsoft .NET.",
            algorithm: "Módulo 11 aplicado aos 43 primeiros dígitos, com pesos de 2 a 9.",
            code: `public static bool ValidateMdfeKey(string key)
{
    if (string.IsNullOrEmpty(key) || key.Length != 44 || !key.All(char.IsDigit)) return false;

    string baseKey = key.Substring(0, 43);
    int[] weights = { 2, 3, 4, 5, 6, 7, 8, 9 };
    int total = 0;
    int weightIndex = 0;

    for (int i = baseKey.Length - 1; i >= 0; i--)
    {
        total += (int)char.GetNumericValue(baseKey[i]) * weights[weightIndex];
        weightIndex = (weightIndex + 1) % 8;
    }

    int remainder = total % 11;
    int dv = (remainder < 2) ? 0 : 11 - remainder;
    return (int)char.GetNumericValue(key[43]) == dv;
}`,
            explanation: "Método auxiliar estático para validação rápida de chaves de acesso MDF-e."
        }
    },
    // NFC-e
    {
        toolId: "nfce-generator",
        languageId: "java",
        title: "Como Validar Chave de Acesso NFC-e em Java",
        description: "Validação de chaves de Nota Fiscal de Consumidor Eletrônica (NFC-e) em Java.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "NFC-e substitui o cupom fiscal. Sua validação é vital para sistemas de PDV (Ponto de Venda) em Java.",
            algorithm: "Segue o padrão nacional de chaves de acesso (44 dígitos, DV calculado por Módulo 11).",
            code: `public class NfceValidator {
    public static boolean validate(String key) {
        if (key == null || key.length() != 44 || !key.matches("\\\\d+")) return false;
        
        String baseKey = key.substring(0, 43);
        int[] weights = {2, 3, 4, 5, 6, 7, 8, 9};
        int total = 0;
        int weightIndex = 0;
        
        for (int i = baseKey.length() - 1; i >= 0; i--) {
            total += Character.getNumericValue(baseKey.charAt(i)) * weights[weightIndex];
            weightIndex = (weightIndex + 1) % 8;
        }
        
        int remainder = total % 11;
        int dv = (remainder < 2) ? 0 : 11 - remainder;
        return Character.getNumericValue(key.charAt(43)) == dv;
    }
}`,
            explanation: "Lógica encapsulada para validação de chaves NFC-e, ideal para integração em PDVs Java Desktop ou Web."
        }
    },
    // NFC-e - C#
    {
        toolId: "nfce-generator",
        languageId: "csharp",
        title: "Como Validar Chave de Acesso NFC-e em C#",
        description: "Validação de chaves de Nota Fiscal de Consumidor Eletrônica (NFC-e) em C#.",
        category: "validation",
        toolCategory: "business",
        content: {
            intro: "Desenvolvedores de automação comercial e PDV em .NET precisam validar chaves NFC-e constantemente.",
            algorithm: "Cálculo do dígito verificador da chave de 44 posições usando Módulo 11.",
            code: `public static bool ValidateNfceKey(string key)
{
    if (string.IsNullOrEmpty(key) || key.Length != 44 || !key.All(char.IsDigit)) return false;

    string baseKey = key.Substring(0, 43);
    int[] weights = { 2, 3, 4, 5, 6, 7, 8, 9 };
    int total = 0;
    int weightIndex = 0;

    for (int i = baseKey.Length - 1; i >= 0; i--)
    {
        total += (int)char.GetNumericValue(baseKey[i]) * weights[weightIndex];
        weightIndex = (weightIndex + 1) % 8;
    }

    int remainder = total % 11;
    int dv = (remainder < 2) ? 0 : 11 - remainder;
    return (int)char.GetNumericValue(key[43]) == dv;
}`,
            explanation: "Validação performática em C# para garantir que a chave lida ou gerada está correta antes de enviar para a SEFAZ."
        }
    },
    // UUID - Python
    {
        toolId: "uuid-generator",
        languageId: "python",
        title: "Como Gerar UUID v4 em Python",
        description: "Gere identificadores únicos universais (UUIDs) em Python usando o módulo nativo `uuid`.",
        category: "generation",
        toolCategory: "utilities",
        content: {
            intro: "UUIDs (Universally Unique Identifiers) são essenciais para chaves primárias e identificação de recursos. Python facilita isso com sua biblioteca padrão.",
            algorithm: "UUID v4 é gerado aleatoriamente. A probabilidade de colisão é astronomicamente baixa.",
            code: `import uuid

# Gerar um UUID v4 aleatório
random_uuid = uuid.uuid4()
print(f"UUID Gerado: {random_uuid}")

# Converter para string
uuid_str = str(random_uuid)
print(f"String UUID: {uuid_str}")

# Gerar UUID com base em namespace (v5)
name_uuid = uuid.uuid5(uuid.NAMESPACE_DNS, 'example.com')
print(f"UUID v5: {name_uuid}")`,
            explanation: "O módulo `uuid` é parte da biblioteca padrão do Python. `uuid.uuid4()` gera um ID aleatório seguro. Use `str()` para converter o objeto UUID para string formatada."
        }
    },
    // UUID - JavaScript
    {
        toolId: "uuid-generator",
        languageId: "javascript",
        title: "Como Gerar UUID v4 em JavaScript/Node.js",
        description: "Métodos modernos para gerar UUIDs em JavaScript usando `crypto.randomUUID()`.",
        category: "generation",
        toolCategory: "utilities",
        content: {
            intro: "Historicamente, gerar UUIDs em JS exigia hacks com `Math.random()`. Hoje, temos APIs criptograficamente seguras.",
            algorithm: "A API `crypto` (Node.js e Browsers modernos) fornece geradores de entropia de alta qualidade.",
            code: `// Método Moderno (Node.js 14.17+ e Browsers Modernos)
const uuid = crypto.randomUUID();
console.log(uuid);

// Método legado (para compatibilidade antiga)
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
console.log(generateUUID());`,
            explanation: "Prefira sempre `crypto.randomUUID()` pela performance e segurança. O método manual só deve ser usado se compatibilidade com IE for necessária."
        }
    },
    // UUID - Java
    {
        toolId: "uuid-generator",
        languageId: "java",
        title: "Como Gerar UUID em Java",
        description: "Use a classe `java.util.UUID` para criar identificadores únicos em aplicações Java.",
        category: "generation",
        toolCategory: "utilities",
        content: {
            intro: "Java possui suporte nativo a UUIDs desde a versão 1.5. É a maneira padrão de gerar IDs para entidades JPA/Hibernate.",
            algorithm: "Utiliza `SecureRandom` internamente para garantir a unicidade do identificador.",
            code: `import java.util.UUID;

public class UUIDGenerator {
    public static void main(String[] args) {
        // Gerar UUID v4 aleatório
        UUID uuid = UUID.randomUUID();
        
        System.out.println("UUID: " + uuid.toString());
        
        // Remover hifens (comum em bancos de dados)
        String cleanUuid = uuid.toString().replace("-", "");
        System.out.println("Sem hifens: " + cleanUuid);
        
        // Criar UUID a partir de string
        UUID fromString = UUID.fromString("c0a80101-0000-0000-0000-000000000046");
    }
}`,
            explanation: "A classe `java.util.UUID` é imutável e thread-safe. `randomUUID()` é o método estático mais utilizado para gerar chaves primárias."
        }
    },
    // UUID - C#
    {
        toolId: "uuid-generator",
        languageId: "csharp",
        title: "Como Gerar GUID/UUID em C# .NET",
        description: "Em .NET, UUIDs são chamados de GUIDs. Veja como gerá-los e formatá-los.",
        category: "generation",
        toolCategory: "utilities",
        content: {
            intro: "No ecossistema Microsoft, o termo utilizado é GUID (Globally Unique Identifier), mas é tecnicamente idêntico ao UUID v4 padrão.",
            algorithm: "A struct `System.Guid` oferece métodos otimizados para criação e comparação de identificadores.",
            code: `using System;

public class Program
{
    public static void Main()
    {
        // Gerar novo GUID
        Guid myGuid = Guid.NewGuid();
        
        // Formatos comuns
        Console.WriteLine(myGuid.ToString());       // xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        Console.WriteLine(myGuid.ToString("N"));    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (sem hifens)
        Console.WriteLine(myGuid.ToString("B"));    // {xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}
        Console.WriteLine(myGuid.ToString("X"));    // {0x...,0x...,...} (Hexadecimal)
        
        // GUID Vazio (00000000-0000-0000-0000-000000000000)
        Guid empty = Guid.Empty;
    }
}`,
            explanation: "`Guid.NewGuid()` é o método padrão. O método `.ToString()` aceita argumentos de formatação que são muito úteis para integração com sistemas legados ou bancos de dados."
        }
    },
    // Base64 - Python
    {
        toolId: "base64-encoder",
        languageId: "python",
        title: "Como Codificar e Decodificar Base64 em Python",
        description: "Tutorial completo sobre o módulo `base64` do Python para conversão de strings e binários.",
        category: "generation",
        toolCategory: "utilities",
        content: {
            intro: "Base64 é ubíquo na computação para representar dados binários em strings ASCII. Python lida com isso nativamente.",
            algorithm: "O algoritmo divide os dados em grupos de 3 bytes (24 bits) e os converte em 4 caracteres de 6 bits da tabela Base64.",
            code: `import base64

# Codificar (String -> Base64)
message = "Olá Mundo"
message_bytes = message.encode('utf-8')
base64_bytes = base64.b64encode(message_bytes)
base64_str = base64_bytes.decode('utf-8')

print(f"Codificado: {base64_str}")

# Decodificar (Base64 -> String)
decoded_bytes = base64.b64decode(base64_str)
decoded_str = decoded_bytes.decode('utf-8')

print(f"Decodificado: {decoded_str}")`,
            explanation: "Lembre-se sempre de codificar strings para bytes (`.encode('utf-8')`) antes de passar para `base64.b64encode`, pois ele espera objetos bytes-like."
        }
    },
    // Base64 - JavaScript
    {
        toolId: "base64-encoder",
        languageId: "javascript",
        title: "Base64 em JavaScript: btoa() e atob()",
        description: "Entenda como usar as funções nativas `btoa` e `atob` no navegador e `Buffer` no Node.js.",
        category: "generation",
        toolCategory: "utilities",
        content: {
            intro: "No JavaScript moderno, temos diferenças entre Browser e Node.js para manipulação de Base64.",
            algorithm: "No browser, usamos `btoa` (binary to ASCII) e `atob` (ASCII to binary). No backend, usamos Buffers.",
            code: `// --- No Navegador ---
const text = "Olá Mundo";
const encoded = btoa(unescape(encodeURIComponent(text))); // Suporte a UTF-8
console.log(encoded);

const decoded = decodeURIComponent(escape(atob(encoded)));
console.log(decoded);

// --- No Node.js ---
const buffer = Buffer.from("Olá Mundo", "utf-8");
const base64Node = buffer.toString("base64");
console.log(base64Node);

const fromBase64 = Buffer.from(base64Node, "base64").toString("utf-8");
console.log(fromBase64);`,
            explanation: "Aviso: `btoa` direto falha com caracteres UTF-8 (acentos). O truque `encodeURIComponent` resolve isso no navegador."
        }
    },
    // Base64 - Java
    {
        toolId: "base64-encoder",
        languageId: "java",
        title: "Guia de Base64 em Java (java.util.Base64)",
        description: "Use a classe `java.util.Base64` introduzida no Java 8 para codificação e decodificação eficiente.",
        category: "generation",
        toolCategory: "utilities",
        content: {
            intro: "Antes do Java 8, usava-se bibliotecas externas (Apache Commons). Agora temos uma API robusta e nativa.",
            algorithm: "A classe `Base64` oferece codificadores para URL-safe, MIME e Basic.",
            code: `import java.util.Base64;
import java.nio.charset.StandardCharsets;

public class Base64Example {
    public static void main(String[] args) {
        String original = "Olá Mundo";
        
        // Codificar
        String encoded = Base64.getEncoder()
            .encodeToString(original.getBytes(StandardCharsets.UTF_8));
        System.out.println("Codificado: " + encoded);
        
        // Decodificar
        byte[] decodedBytes = Base64.getDecoder().decode(encoded);
        String decoded = new String(decodedBytes, StandardCharsets.UTF_8);
        System.out.println("Decodificado: " + decoded);
    }
}`,
            explanation: "Sempre especifique o charset (UTF-8) para evitar problemas de encoding dependentes da plataforma."
        }
    },
    // Base64 - C#
    {
        toolId: "base64-encoder",
        languageId: "csharp",
        title: "Base64 em C#: Convert.ToBase64String",
        description: "Aprenda a converter arrays de bytes para strings Base64 e vice-versa em .NET.",
        category: "generation",
        toolCategory: "utilities",
        content: {
            intro: "No .NET, a manipulação de Base64 é feita através da classe estática `System.Convert`.",
            algorithm: "Converte um array de inteiros sem sinal de 8 bits em sua representação string equivalente.",
            code: `using System;
using System.Text;

class Program {
    static void Main() {
        string text = "Olá Mundo";
        
        // Texto -> Bytes -> Base64
        byte[] textBytes = Encoding.UTF8.GetBytes(text);
        string encoded = Convert.ToBase64String(textBytes);
        Console.WriteLine($"Base64: {encoded}");
        
        // Base64 -> Bytes -> Texto
        byte[] decodedBytes = Convert.FromBase64String(encoded);
        string decoded = Encoding.UTF8.GetString(decodedBytes);
        Console.WriteLine($"Texto: {decoded}");
    }
}`,
            explanation: "`Convert.ToBase64String` e `Convert.FromBase64String` são os métodos padrão. Lembre-se de usar a codificação (Encoding) correta para obter os bytes."
        }
    },
    // Email Validator - Python
    {
        toolId: "email-validator",
        languageId: "python",
        title: "Como Validar Email com Regex em Python",
        description: "Implemente validação de email usando expressões regulares em Python, com verificação de formato e domínio.",
        category: "validation",
        toolCategory: "text",
        content: {
            intro: "Validar endereços de email é uma necessidade básica em formulários e APIs. Python oferece o módulo `re` para isso.",
            algorithm: "A expressão regular verifica: prefixo válido (letras, números, pontos, hífens), símbolo @, domínio com pelo menos uma extensão.",
            code: `import re

def validate_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

# Exemplos
emails = [
    "usuario@gmail.com",
    "nome.sobrenome@empresa.com.br",
    "invalido@",
    "sem-arroba.com",
    "test@dominio.co"
]

for email in emails:
    status = "Válido" if validate_email(email) else "Inválido"
    print(f"{email}: {status}")`,
            explanation: "O padrão regex verifica a estrutura básica de um email. Para validação em produção, considere usar a biblioteca `email-validator` do PyPI, que também verifica DNS do domínio."
        }
    },
    // Email Validator - JavaScript
    {
        toolId: "email-validator",
        languageId: "javascript",
        title: "Validar Email em JavaScript com Regex",
        description: "Snippet JavaScript para validação de email no frontend e backend com expressões regulares.",
        category: "validation",
        toolCategory: "text",
        content: {
            intro: "A validação de email no cliente proporciona feedback instantâneo. JavaScript é ideal para isso.",
            algorithm: "Utiliza uma expressão regular que verifica a presença de @ e um domínio válido com extensão.",
            code: `function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Uso com formulários HTML
const emailInput = document.getElementById('email');
emailInput?.addEventListener('blur', function() {
    const isValid = validateEmail(this.value);
    this.classList.toggle('border-red-500', !isValid);
    this.classList.toggle('border-green-500', isValid);
});

// Testes
console.log(validateEmail("user@example.com"));   // true
console.log(validateEmail("invalid-email"));       // false
console.log(validateEmail("nome@dominio.com.br")); // true`,
            explanation: "A regex cobre os cenários mais comuns. Para validação completa segundo a RFC 5322, use bibliotecas como `validator.js` ou a Constraint Validation API nativa do HTML5."
        }
    },
    // Email Validator - Java
    {
        toolId: "email-validator",
        languageId: "java",
        title: "Validação de Email em Java com Regex",
        description: "Use `java.util.regex.Pattern` para validar endereços de email em aplicações Java.",
        category: "validation",
        toolCategory: "text",
        content: {
            intro: "Em aplicações Java, validar email é comum em cadastros e formulários web. Veja como usar regex nativa.",
            algorithm: "A classe Pattern compila a expressão regular uma única vez para máxima performance em validações repetidas.",
            code: `import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class EmailValidator {
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$"
    );
    
    public static boolean isValid(String email) {
        if (email == null || email.isBlank()) return false;
        Matcher matcher = EMAIL_PATTERN.matcher(email);
        return matcher.matches();
    }
    
    public static void main(String[] args) {
        System.out.println(isValid("user@domain.com"));    // true
        System.out.println(isValid("invalido@"));          // false
        System.out.println(isValid("teste@empresa.com.br")); // true
    }
}`,
            explanation: "O Pattern é compilado como `static final` para evitar recompilação a cada chamada. Para validação avançada em Spring, use a annotation `@Email` do Bean Validation."
        }
    },
    // Email Validator - C#
    {
        toolId: "email-validator",
        languageId: "csharp",
        title: "Validar Email em C# (.NET)",
        description: "Valide endereços de email em C# usando Regex ou a classe MailAddress do .NET.",
        category: "validation",
        toolCategory: "text",
        content: {
            intro: "O .NET oferece duas abordagens: Regex manual ou a classe `MailAddress` que faz parsing completo.",
            algorithm: "A classe `MailAddress` tenta parsear o email e lança exceção se for inválido, evitando a necessidade de regex manual.",
            code: `using System;
using System.Net.Mail;
using System.Text.RegularExpressions;

public class EmailValidator
{
    // Método 1: Usando MailAddress (recomendado)
    public static bool IsValidEmail(string email)
    {
        try
        {
            var addr = new MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }
    
    // Método 2: Usando Regex
    public static bool IsValidEmailRegex(string email)
    {
        string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        return Regex.IsMatch(email, pattern);
    }
    
    public static void Main()
    {
        Console.WriteLine(IsValidEmail("user@domain.com"));  // True
        Console.WriteLine(IsValidEmail("invalido@"));        // False
    }
}`,
            explanation: "O método `MailAddress` é preferido em .NET por não depender da manutenção de regex. Em ASP.NET, use o atributo `[EmailAddress]` nos modelos."
        }
    },
    // Credit Card - Python
    {
        toolId: "credit-card-generator",
        languageId: "python",
        title: "Algoritmo de Luhn em Python (Validar Cartão de Crédito)",
        description: "Implemente o algoritmo de Luhn em Python para validar e gerar números de cartão de crédito para testes.",
        category: "validation",
        toolCategory: "finance",
        content: {
            intro: "O algoritmo de Luhn (ou Módulo 10) é usado mundialmente para validar números de cartão de crédito, IMEI e outros identificadores.",
            algorithm: "Percorre os dígitos da direita para a esquerda, dobrando cada segundo dígito. Se o dobro for maior que 9, subtrai-se 9. A soma total deve ser divisível por 10.",
            code: `def luhn_validate(number: str) -> bool:
    digits = [int(d) for d in number if d.isdigit()]
    digits.reverse()
    
    total = 0
    for i, digit in enumerate(digits):
        if i % 2 == 1:
            digit *= 2
            if digit > 9:
                digit -= 9
        total += digit
    
    return total % 10 == 0

def generate_card(prefix: str, length: int = 16) -> str:
    import random
    number = prefix
    while len(number) < length - 1:
        number += str(random.randint(0, 9))
    
    # Calcular dígito verificador
    for check_digit in range(10):
        if luhn_validate(number + str(check_digit)):
            return number + str(check_digit)
    return number + "0"

# Gerar cartão Visa para testes
print(generate_card("4"))    # Visa
print(generate_card("51"))   # Mastercard`,
            explanation: "A função `luhn_validate` verifica se o número é válido. A função `generate_card` cria um número válido a partir de um prefixo de bandeira (Visa=4, Mastercard=51-55)."
        }
    },
    // Credit Card - JavaScript
    {
        toolId: "credit-card-generator",
        languageId: "javascript",
        title: "Algoritmo de Luhn em JavaScript (Cartão de Crédito)",
        description: "Validação e geração de números de cartão de crédito em JavaScript usando o algoritmo de Luhn.",
        category: "validation",
        toolCategory: "finance",
        content: {
            intro: "O algoritmo de Luhn é essencial para validar cartões em checkouts de e-commerce antes de enviar ao gateway.",
            algorithm: "O Módulo 10 processa os dígitos em pares, dobrando alternadamente. Se o resultado não for divisível por 10, o número é inválido.",
            code: `function luhnValidate(number) {
    const digits = number.replace(/\\D/g, '').split('').reverse().map(Number);
    let sum = 0;
    
    for (let i = 0; i < digits.length; i++) {
        let digit = digits[i];
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
}

function generateCard(prefix, length = 16) {
    let number = prefix;
    while (number.length < length - 1) {
        number += Math.floor(Math.random() * 10);
    }
    
    for (let i = 0; i < 10; i++) {
        if (luhnValidate(number + i)) return number + i;
    }
    return number + '0';
}

// Gerar para testes
console.log(generateCard('4'));    // Visa
console.log(generateCard('51'));   // Mastercard`,
            explanation: "Esta implementação funciona tanto no browser quanto no Node.js. Use para validação instant em formulários de checkout antes de enviar ao servidor."
        }
    },
    // Credit Card - Java
    {
        toolId: "credit-card-generator",
        languageId: "java",
        title: "Algoritmo de Luhn em Java (Validação de Cartão)",
        description: "Implementação robusta do algoritmo de Luhn em Java para validar números de cartão de crédito.",
        category: "validation",
        toolCategory: "finance",
        content: {
            intro: "Em sistemas de pagamento Java (Spring Boot, Jakarta EE), o algoritmo de Luhn é o primeiro filtro de validação.",
            algorithm: "Módulo 10 com multiplicação alternada. Garante integridade do número antes de consultar o gateway.",
            code: `public class LuhnValidator {
    public static boolean validate(String number) {
        number = number.replaceAll("[^0-9]", "");
        if (number.isEmpty()) return false;
        
        int sum = 0;
        boolean alternate = false;
        
        for (int i = number.length() - 1; i >= 0; i--) {
            int n = Character.getNumericValue(number.charAt(i));
            if (alternate) {
                n *= 2;
                if (n > 9) n -= 9;
            }
            sum += n;
            alternate = !alternate;
        }
        return sum % 10 == 0;
    }
    
    public static void main(String[] args) {
        System.out.println(validate("4539578763621486")); // true
        System.out.println(validate("1234567890123456")); // false
    }
}`,
            explanation: "Método estático e thread-safe. Remove caracteres não numéricos (espaços, hífens) antes da validação, facilitando o uso com inputs formatados."
        }
    },
    // Credit Card - C#
    {
        toolId: "credit-card-generator",
        languageId: "csharp",
        title: "Algoritmo de Luhn em C# .NET",
        description: "Valide números de cartão de crédito em C# com o algoritmo de Luhn (Módulo 10).",
        category: "validation",
        toolCategory: "finance",
        content: {
            intro: "Em aplicações .NET de e-commerce, validar cartões localmente economiza chamadas desnecessárias ao gateway de pagamento.",
            algorithm: "O algoritmo percorre os dígitos da direita para a esquerda, duplicando dígitos alternados e verificando se a soma é divisível por 10.",
            code: `using System;
using System.Linq;

public class LuhnValidator
{
    public static bool Validate(string number)
    {
        number = new string(number.Where(char.IsDigit).ToArray());
        if (string.IsNullOrEmpty(number)) return false;
        
        int sum = 0;
        bool alternate = false;
        
        for (int i = number.Length - 1; i >= 0; i--)
        {
            int n = number[i] - '0';
            if (alternate)
            {
                n *= 2;
                if (n > 9) n -= 9;
            }
            sum += n;
            alternate = !alternate;
        }
        return sum % 10 == 0;
    }
    
    public static void Main()
    {
        Console.WriteLine(Validate("4539 5787 6362 1486")); // True
        Console.WriteLine(Validate("1234567890123456"));     // False
    }
}`,
            explanation: "Usa LINQ para limpar a string de entrada. O operador `- '0'` converte o char diretamente para inteiro sem precisar de métodos auxiliares."
        }
    },
    // URL Encoder - Python
    {
        toolId: "url-encoder",
        languageId: "python",
        title: "URL Encode/Decode em Python (urllib)",
        description: "Codifique e decodifique URLs em Python usando o módulo `urllib.parse`.",
        category: "generation",
        toolCategory: "utilities",
        content: {
            intro: "Manipular URLs é essencial para web scraping, APIs e desenvolvimento backend em Python.",
            algorithm: "O percent-encoding substitui caracteres não-ASCII e especiais por sequências '%XX' onde XX é o valor hexadecimal.",
            code: `from urllib.parse import quote, unquote, urlencode

# Codificar string para URL
text = "Olá Mundo & amigos=verdadeiro"
encoded = quote(text)
print(f"Codificado: {encoded}")

# Decodificar URL
decoded = unquote(encoded)
print(f"Decodificado: {decoded}")

# Codificar parâmetros de query
params = {"nome": "João Silva", "cidade": "São Paulo", "ativo": "sim"}
query_string = urlencode(params)
print(f"Query String: {query_string}")

# URL completa
base_url = "https://api.example.com/search"
full_url = f"{base_url}?{query_string}"
print(f"URL Final: {full_url}")`,
            explanation: "`quote` codifica uma string individual, enquanto `urlencode` é ideal para dicionários de parâmetros. Use `quote_plus` se precisar que espaços virem `+` em vez de `%20`."
        }
    },
    // URL Encoder - JavaScript
    {
        toolId: "url-encoder",
        languageId: "javascript",
        title: "encodeURIComponent vs encodeURI em JavaScript",
        description: "Entenda a diferença entre encodeURI e encodeURIComponent e quando usar cada um.",
        category: "generation",
        toolCategory: "utilities",
        content: {
            intro: "JavaScript tem duas funções nativas para encoding de URLs. Usar a errada pode quebrar suas URLs.",
            algorithm: "encodeURI preserva a estrutura da URL. encodeURIComponent codifica TUDO, incluindo /, ? e &.",
            code: `// encodeURIComponent - Para valores de parâmetros
const param = "nome=João & Silva";
const encoded = encodeURIComponent(param);
console.log(encoded); // nome%3DJo%C3%A3o%20%26%20Silva

// encodeURI - Para URLs completas (preserva :, /, ?, &)
const url = "https://site.com/busca?q=São Paulo&lang=pt";
const encodedUrl = encodeURI(url);
console.log(encodedUrl);

// Decodificar
console.log(decodeURIComponent(encoded));
console.log(decodeURI(encodedUrl));

// URLSearchParams - API moderna para query strings
const params = new URLSearchParams({
    nome: "João Silva",
    cidade: "São Paulo"
});
console.log(params.toString()); // nome=Jo%C3%A3o+Silva&cidade=S%C3%A3o+Paulo`,
            explanation: "Regra de ouro: use `encodeURIComponent` para valores de parâmetros individuais e `encodeURI` para URLs completas. `URLSearchParams` é a API moderna preferida."
        }
    },
    // URL Encoder - Java
    {
        toolId: "url-encoder",
        languageId: "java",
        title: "URL Encoding em Java (URLEncoder)",
        description: "Codifique e decodifique URLs em Java usando as classes `URLEncoder` e `URLDecoder`.",
        category: "generation",
        toolCategory: "utilities",
        content: {
            intro: "Em aplicações Java web, a codificação de URLs é necessária ao construir requisições HTTP ou processar parâmetros.",
            algorithm: "O `URLEncoder` converte strings para o formato `application/x-www-form-urlencoded` onde caracteres especiais são substituídos por sequências percentuais.",
            code: `import java.net.URLEncoder;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

public class UrlEncoderExample {
    public static void main(String[] args) {
        String text = "Olá Mundo & amigos=verdadeiro";
        
        // Codificar
        String encoded = URLEncoder.encode(text, StandardCharsets.UTF_8);
        System.out.println("Codificado: " + encoded);
        
        // Decodificar
        String decoded = URLDecoder.decode(encoded, StandardCharsets.UTF_8);
        System.out.println("Decodificado: " + decoded);
        
        // Construir URL com parâmetros
        String baseUrl = "https://api.example.com/search";
        String param1 = URLEncoder.encode("São Paulo", StandardCharsets.UTF_8);
        String param2 = URLEncoder.encode("João", StandardCharsets.UTF_8);
        String fullUrl = baseUrl + "?cidade=" + param1 + "&nome=" + param2;
        System.out.println("URL: " + fullUrl);
    }
}`,
            explanation: "Sempre especifique o charset (UTF-8). As versões sem charset estão deprecated desde o Java 10. Lembre-se que URLEncoder converte espaços em `+`, não em `%20`."
        }
    },
    // URL Encoder - C#
    {
        toolId: "url-encoder",
        languageId: "csharp",
        title: "URL Encoding em C# .NET",
        description: "Use as classes `Uri`, `WebUtility` e `HttpUtility` para manipular URLs em C#.",
        category: "generation",
        toolCategory: "utilities",
        content: {
            intro: "O .NET oferece várias opções para encoding de URLs, cada uma com seu caso de uso específico.",
            algorithm: "O percent-encoding converte caracteres especiais para representações hexadecimais seguras para URLs.",
            code: `using System;
using System.Net;
using System.Web;

class Program {
    static void Main() {
        string text = "Olá Mundo & amigos=verdadeiro";
        
        // WebUtility (System.Net) - Recomendado para .NET Core
        string encoded = WebUtility.UrlEncode(text);
        Console.WriteLine($"Codificado: {encoded}");
        
        string decoded = WebUtility.UrlDecode(encoded);
        Console.WriteLine($"Decodificado: {decoded}");
        
        // Uri.EscapeDataString - Para valores de parâmetros
        string paramValue = Uri.EscapeDataString("São Paulo");
        string url = $"https://api.example.com/search?cidade={paramValue}";
        Console.WriteLine($"URL: {url}");
        
        // Uri.UnescapeDataString - Para decodificar
        string unescaped = Uri.UnescapeDataString(paramValue);
        Console.WriteLine($"Original: {unescaped}");
    }
}`,
            explanation: "Use `WebUtility.UrlEncode` para propósito geral, `Uri.EscapeDataString` para valores de parâmetros individuais (codifica mais caracteres), e `HttpUtility.UrlEncode` apenas em projetos ASP.NET clássico."
        }
    }
]
