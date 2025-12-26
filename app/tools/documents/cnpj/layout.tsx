import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Gerador de CNPJ Válido | DevThru",
    description: "Ferramenta para gerar CNPJs válidos com formatação. Ideal para testes de sistemas empresariais e validação de cadastros.",
    keywords: ["gerador cnpj", "cnpj valido", "validar cnpj", "testar cnpj", "algoritmo cnpj"]
}

export default function CnpjGeneratorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
