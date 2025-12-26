import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Crie sua Conta | DevThru",
    description: "Cadastre-se no DevThru para acessar ferramentas exclusivas, salvar configurações e aumentar seus limites de uso.",
}

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
