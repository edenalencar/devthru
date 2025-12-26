import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Gerador de Chave NF-e | DevThru",
    description: "Gere chaves de acesso válidas para Nota Fiscal Eletrônica (NF-e) para fins de testes e desenvolvimento. Ferramenta gratuita.",
    keywords: ["gerador nfe", "chave nfe", "nota fiscal eletrônica", "chave de acesso", "teste nfe"]
}

export default function NfeGeneratorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
