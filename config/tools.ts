import { FileText, Code2, Hash, Key, Type, User, MapPin, Phone, Mail, CreditCard, Car, Shield, Binary, QrCode, Braces } from "lucide-react"

export interface Tool {
    id: string
    name: string
    title: string
    description: string
    category: string
    icon: any
    href: string
    isPro?: boolean
}

export const toolCategories = [
    { id: "documents", name: "Documentos Pessoais", icon: FileText },
    { id: "business", name: "Dados Empresariais", icon: Code2 },
    { id: "personal", name: "Dados Pessoais", icon: User },
    { id: "utilities", name: "Utilidades", icon: Hash },
    { id: "financial", name: "Dados Financeiros", icon: CreditCard },
    { id: "vehicles", name: "Veículos", icon: Car },
]

export const tools: Tool[] = [
    // Documentos Pessoais
    {
        id: "cpf",
        name: "Gerador de CPF",
        title: "Gerador de CPF",
        description: "Gere e valide CPFs válidos para testes e desenvolvimento",
        category: "documents",
        icon: FileText,
        href: "/tools/documents/cpf",
    },
    {
        id: "cnpj",
        name: "Gerador de CNPJ",
        title: "Gerador de CNPJ",
        description: "Gere e valide CNPJs válidos para testes e desenvolvimento",
        category: "documents",
        icon: Code2,
        href: "/tools/documents/cnpj",
    },
    {
        id: "rg",
        name: "Gerador de RG",
        title: "Gerador de RG",
        description: "Gere RGs válidos por estado brasileiro",
        category: "documents",
        icon: Shield,
        href: "/tools/documents/rg",
    },
    {
        id: "cnh",
        name: "Gerador de CNH",
        title: "Gerador de CNH",
        description: "Gere CNHs válidas com categoria selecionável",
        category: "documents",
        icon: Car,
        href: "/tools/documents/cnh",
    },

    // Dados Pessoais
    {
        id: "name",
        name: "Gerador de Nomes",
        title: "Gerador de Nomes",
        description: "Gere nomes brasileiros completos (masculino/feminino)",
        category: "personal",
        icon: User,
        href: "/tools/personal/name",
    },
    {
        id: "address",
        name: "Gerador de Endereços",
        title: "Gerador de Endereços",
        description: "Gere endereços brasileiros completos com CEP",
        category: "personal",
        icon: MapPin,
        href: "/tools/personal/address",
    },
    {
        id: "phone",
        name: "Gerador de Telefone",
        title: "Gerador de Telefone",
        description: "Gere telefones brasileiros (celular e fixo)",
        category: "personal",
        icon: Phone,
        href: "/tools/personal/phone",
    },
    {
        id: "email",
        name: "Gerador de Email",
        title: "Gerador de Email",
        description: "Gere endereços de email com domínios populares",
        category: "personal",
        icon: Mail,
        href: "/tools/personal/email",
    },

    // Utilidades
    {
        id: "uuid",
        name: "Gerador de UUID",
        title: "Gerador de UUID",
        description: "Gere identificadores únicos universais (UUID v4)",
        category: "utilities",
        icon: Hash,
        href: "/tools/utilities/uuid",
    },
    {
        id: "password",
        name: "Gerador de Senhas",
        title: "Gerador de Senhas",
        description: "Crie senhas fortes e seguras personalizadas",
        category: "utilities",
        icon: Key,
        href: "/tools/utilities/password",
    },
    {
        id: "lorem",
        name: "Lorem Ipsum",
        title: "Lorem Ipsum",
        description: "Gere texto placeholder para seus projetos",
        category: "utilities",
        icon: Type,
        href: "/tools/utilities/lorem",
    },
    {
        id: "hash",
        name: "Gerador de Hash",
        title: "Gerador de Hash",
        description: "Gere hashes SHA-1, SHA-256 e SHA-512",
        category: "utilities",
        icon: Binary,
        href: "/tools/utilities/hash",
    },
    {
        id: "base64",
        name: "Base64 Encoder/Decoder",
        title: "Base64 Encoder/Decoder",
        description: "Codifique e decodifique texto em Base64",
        category: "utilities",
        icon: Binary,
        href: "/tools/utilities/base64",
    },
    {
        id: "qrcode",
        name: "Gerador de QR Code",
        title: "Gerador de QR Code",
        description: "Gere QR Codes a partir de texto ou URL",
        category: "utilities",
        icon: QrCode,
        href: "/tools/utilities/qrcode",
    },
    {
        id: "json",
        name: "JSON Formatter",
        title: "JSON Formatter",
        description: "Formate, valide e minifique JSON",
        category: "utilities",
        icon: Braces,
        href: "/tools/utilities/json",
    },
]

export function getToolsByCategory(categoryId: string): Tool[] {
    return tools.filter((tool) => tool.category === categoryId)
}

export function getToolById(id: string): Tool | undefined {
    return tools.find((tool) => tool.id === id)
}
