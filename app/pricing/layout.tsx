import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Planos e Preços",
    description: "Escolha o melhor plano para você ou sua equipe. Opções gratuitas e profissionais com acesso a API e gerações em lote.",
}

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
