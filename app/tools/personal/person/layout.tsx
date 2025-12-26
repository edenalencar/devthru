import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Gerador de Pessoas Aleatórias | DevThru",
    description: "Gere dados de pessoas completas para testes: Nome, CPF, RG, Endereço, Email e mais. Dados válidos para testes de software.",
    keywords: ["gerador de pessoas", "dados falsos", "gerador cpf", "gerador rg", "teste de software", "massa de dados"]
}

export default function PersonGeneratorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
