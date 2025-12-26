import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Gerador de CPF Válido | DevThru",
    description: "Gere CPFs válidos para testes de software. Ferramenta online rápida com validação de algoritmo e dígitos verificadores.",
    keywords: ["gerador cpf", "cpf valido", "validar cpf", "testar cpf", "algoritmo cpf"]
}

export default function CpfGeneratorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
