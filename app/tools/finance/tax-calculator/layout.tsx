import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Calculadora de Impostos (CLT/PJ) | DevThru",
    description: "Simule cálculos de impostos e verifique prazos fiscais de forma simples. Ferramenta prática para desenvolvedores e freelancers.",
    keywords: ["calculadora impostos", "clt x pj", "imposto renda", "simulador salario"]
}

export default function TaxCalculatorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
