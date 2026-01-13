import { Metadata } from "next"
import { TaxCalculatorPage } from "./client"

const title = "Calculadora Simples Nacional 2025 - DAS e Alíquota Efetiva"
const description = "Calcule facilmente o DAS e a alíquota efetiva do Simples Nacional. Simulador atualizado para 2024/2025, ideal para planejamento tributário e financeiro preciso."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <TaxCalculatorPage />
}
