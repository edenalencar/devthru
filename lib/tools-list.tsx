import {
    Calculator, Car, Shield, Search, Truck, FileText, ShoppingCart,
    Coins, ArrowRightLeft, FileCode, Database, Terminal, Clock,
    Award, CreditCard, Code2, Barcode, Image as ImageIcon,
    MapPin, Mail, User, Phone, Type, Lock, Binary,
    Calendar, Braces, Key, QrCode, Hash, Link, FileDiff, Briefcase,
    Globe, Ruler
} from "lucide-react"
import { LucideIcon } from "lucide-react"

export interface Tool {
    slug: string
    category: string
    title: string
    icon: LucideIcon
}

export const tools: Tool[] = [
    // Automotive
    { slug: 'fipe', category: 'automotive', title: 'Tabela FIPE', icon: Calculator },
    { slug: 'license-plate', category: 'automotive', title: 'Placa', icon: Car },
    { slug: 'chassi', category: 'automotive', title: 'Chassi', icon: Car },
    { slug: 'renavam', category: 'automotive', title: 'Renavam', icon: Shield },

    // Business
    { slug: 'cnae-search', category: 'business', title: 'Busca de CNAE', icon: Briefcase },
    { slug: 'cte-generator', category: 'business', title: 'Gerador de CT-e', icon: Truck },
    { slug: 'mdfe-generator', category: 'business', title: 'Gerador de MDF-e', icon: FileText },
    { slug: 'nfce-generator', category: 'business', title: 'Gerador de NFC-e', icon: ShoppingCart },
    { slug: 'nfe-generator', category: 'business', title: 'Gerador de NF-e', icon: FileText },

    // Converters
    { slug: 'base', category: 'converters', title: 'Conversor de Base', icon: Calculator },
    { slug: 'currency', category: 'converters', title: 'Conversor de Moeda', icon: Coins },
    { slug: 'unit', category: 'converters', title: 'Conversor de Unidades', icon: ArrowRightLeft },

    // Development
    { slug: 'minifier', category: 'development', title: 'Minificador', icon: FileCode },
    { slug: 'mock-data', category: 'development', title: 'Dados de Teste', icon: Database },
    { slug: 'regex', category: 'development', title: 'Regex', icon: Terminal },
    { slug: 'timestamp', category: 'development', title: 'Timestamp', icon: Clock },

    // Documents
    { slug: 'certificate-generator', category: 'documents', title: 'Certificados', icon: Award },
    { slug: 'cnh', category: 'documents', title: 'CNH', icon: CreditCard },
    { slug: 'cnpj', category: 'documents', title: 'CNPJ', icon: Code2 },
    { slug: 'contract-generator', category: 'documents', title: 'Contratos', icon: FileText },
    { slug: 'cpf', category: 'documents', title: 'CPF', icon: FileText },
    { slug: 'inscricao-estadual', category: 'documents', title: 'Inscrição Estadual', icon: FileText },
    { slug: 'pis', category: 'documents', title: 'PIS/PASEP', icon: CreditCard },
    { slug: 'rg', category: 'documents', title: 'RG', icon: CreditCard },
    { slug: 'titulo-eleitor', category: 'documents', title: 'Título de Eleitor', icon: CreditCard },

    // Finance
    { slug: 'boleto-generator', category: 'finance', title: 'Gerador de Boleto', icon: Barcode },
    { slug: 'credit-card-generator', category: 'finance', title: 'Cartão de Crédito', icon: CreditCard },
    { slug: 'iban-validator', category: 'finance', title: 'Validador IBAN', icon: CreditCard },
    { slug: 'tax-calculator', category: 'finance', title: 'Calculadora de Impostos', icon: Calculator },

    // Image
    { slug: 'converter', category: 'image', title: 'Conversor de Imagem', icon: ImageIcon },
    { slug: 'favicon', category: 'image', title: 'Gerador de Favicon', icon: ImageIcon },
    { slug: 'ocr', category: 'image', title: 'OCR', icon: ImageIcon },
    { slug: 'placeholder', category: 'image', title: 'Placeholder', icon: ImageIcon },

    // Personal
    { slug: 'address', category: 'personal', title: 'Endereço (CEP)', icon: MapPin },
    { slug: 'email', category: 'personal', title: 'Gerador de Email', icon: Mail },
    { slug: 'lgpd-data', category: 'personal', title: 'Dados LGPD', icon: Shield },
    { slug: 'name', category: 'personal', title: 'Gerador de Nomes', icon: User },
    { slug: 'person', category: 'personal', title: 'Pessoa Completa', icon: User },
    { slug: 'phone', category: 'personal', title: 'Telefone/Celular', icon: Phone },

    // Text
    { slug: 'case-converter', category: 'text', title: 'Maiúsculas/Minúsculas', icon: Type },
    { slug: 'character-counter', category: 'text', title: 'Contador de Caracteres', icon: Type },
    { slug: 'diff-checker', category: 'text', title: 'Comparador de Texto', icon: FileDiff },
    { slug: 'email-signature', category: 'text', title: 'Assinatura de Email', icon: Mail },
    { slug: 'email-validator', category: 'text', title: 'Validador de Email', icon: Mail },
    { slug: 'slug-generator', category: 'text', title: 'Gerador de Slug', icon: Link },

    // Utilities
    { slug: 'base64', category: 'utilities', title: 'Base64', icon: Binary },
    { slug: 'deadline-calculator', category: 'utilities', title: 'Calculadora de Prazo', icon: Calendar },
    { slug: 'hash', category: 'utilities', title: 'Gerador de Hash', icon: Hash },
    { slug: 'json', category: 'utilities', title: 'Formatador JSON', icon: Braces },
    { slug: 'lorem', category: 'utilities', title: 'Lorem Ipsum', icon: Type },
    { slug: 'password', category: 'utilities', title: 'Gerador de Senha', icon: Key },
    { slug: 'qrcode', category: 'utilities', title: 'QR Code', icon: QrCode },
    { slug: 'uuid', category: 'utilities', title: 'Gerador de UUID', icon: Hash },
    { slug: 'xml-validator', category: 'utilities', title: 'Validador XML', icon: FileCode },
    { slug: 'url-encoder', category: 'utilities', title: 'URL Encoder/Decoder', icon: Globe },

    // Growth Tools (New)
    { slug: 'pixel-to-rem', category: 'converters', title: 'Pixel para REM', icon: Ruler },
    { slug: 'sql-formatter', category: 'development', title: 'SQL Formatter', icon: Database },
    { slug: 'jwt-debugger', category: 'development', title: 'JWT Debugger', icon: Shield },
]
