import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Gerador e Validador de CNPJ Válido Online | DevThru",
    description: "Ferramenta para gerar CNPJs válidos com formatação. Ideal para testes de sistemas empresariais, QA e validação de cadastros.",
    keywords: ["gerador de cnpj", "gerador cnpj", "cnpj valido", "validar cnpj", "testar cnpj", "validador de cnpj", "algoritmo cnpj"]
}

export default function CnpjGeneratorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
