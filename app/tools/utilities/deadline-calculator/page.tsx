import { Metadata } from "next"
import { DeadlineCalculatorPage } from "./client"

export const metadata: Metadata = {
    title: "Calculadora de Prazos Online - Dias Úteis e Corridos",
    description: "Calcule a data final de um prazo considerando dias úteis, fins de semana e feriados nacionais brasileiros.",
}

export default function Page() {
    return <DeadlineCalculatorPage />
}
