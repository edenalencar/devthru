import { Metadata } from "next"
import { TaxCalculatorPage } from "./client"

export const metadata: Metadata = {
    title: "Calculadora Simples Nacional - DAS e Alíquota Efetiva",
    description: "Calcule o valor do DAS e a alíquota efetiva do Simples Nacional com base no faturamento. Atualizada 2024/2025.",
}

export default function Page() {
    return <TaxCalculatorPage />
}
