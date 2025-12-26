import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Gerador de UUID v4 Online | DevThru",
    description: "Gere UUIDs (Universal Unique Identifiers) versão 4 de forma rápida e gratuita. Ideal para desenvolvimento e bancos de dados.",
    keywords: ["uuid generator", "gerador uuid", "uuid v4", "guid generator", "identificador único"]
}

export default function UuidGeneratorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
