import { Metadata } from "next"
import { TaxCalculatorPage } from "./client"

export const metadata: Metadata = {
    title: "Calculadora Simples Nacional - DAS e Alíquota Efetiva",
    description: "Calcule facilmente o DAS e a alíquota efetiva do Simples Nacional. Simulador atualizado para 2024/2025, ideal para planejamento tributário e financeiro preciso.",
}

export default function Page() {
    return <TaxCalculatorPage />
}
