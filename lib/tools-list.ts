export interface Tool {
    slug: string
    category: string
}

export const tools: Tool[] = [
    // Automotive
    { slug: 'fipe', category: 'automotive' },
    { slug: 'license-plate', category: 'automotive' },
    { slug: 'renavam-chassis', category: 'automotive' },

    // Business
    { slug: 'cnae-search', category: 'business' },
    { slug: 'nfe-generator', category: 'business' },

    // Converters
    { slug: 'base', category: 'converters' },
    { slug: 'currency', category: 'converters' },
    { slug: 'unit', category: 'converters' },

    // Development
    { slug: 'minifier', category: 'development' },
    { slug: 'mock-data', category: 'development' },
    { slug: 'regex', category: 'development' },
    { slug: 'timestamp', category: 'development' },

    // Documents
    { slug: 'certificate-generator', category: 'documents' },
    { slug: 'cnh', category: 'documents' },
    { slug: 'cnpj', category: 'documents' },
    { slug: 'contract-generator', category: 'documents' },
    { slug: 'cpf', category: 'documents' },
    { slug: 'inscricao-estadual', category: 'documents' },
    { slug: 'pis', category: 'documents' },
    { slug: 'rg', category: 'documents' },
    { slug: 'titulo-eleitor', category: 'documents' },

    // Finance
    { slug: 'boleto-generator', category: 'finance' },
    { slug: 'credit-card-generator', category: 'finance' },
    { slug: 'iban-validator', category: 'finance' },
    { slug: 'tax-calculator', category: 'finance' },

    // Image
    { slug: 'converter', category: 'image' },
    { slug: 'favicon', category: 'image' },
    { slug: 'ocr', category: 'image' },
    { slug: 'placeholder', category: 'image' },

    // Personal
    { slug: 'address', category: 'personal' },
    { slug: 'email', category: 'personal' },
    { slug: 'lgpd-data', category: 'personal' },
    { slug: 'name', category: 'personal' },
    { slug: 'person', category: 'personal' },
    { slug: 'phone', category: 'personal' },

    // Text
    { slug: 'case-converter', category: 'text' },
    { slug: 'character-counter', category: 'text' },
    { slug: 'diff-checker', category: 'text' },
    { slug: 'email-signature', category: 'text' },
    { slug: 'email-validator', category: 'text' },
    { slug: 'slug-generator', category: 'text' },

    // Utilities
    { slug: 'base64', category: 'utilities' },
    { slug: 'deadline-calculator', category: 'utilities' },
    { slug: 'hash', category: 'utilities' },
    { slug: 'json', category: 'utilities' },
    { slug: 'lorem', category: 'utilities' },
    { slug: 'password', category: 'utilities' },
    { slug: 'qrcode', category: 'utilities' },
    { slug: 'uuid', category: 'utilities' },
    { slug: 'xml-validator', category: 'utilities' },
]
