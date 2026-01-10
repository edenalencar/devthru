import { Metadata } from "next"
import { DeadlineCalculatorPage } from "./client"

export const metadata: Metadata = {
    title: "Calculadora de Prazos Online - Dias Úteis e Corridos",
    description: "Calcule prazos com precisão considerando feriados nacionais e fins de semana. Ferramenta essencial para advogados, gerenciamento de projetos e planejamento.",
}

export default function Page() {
    return <DeadlineCalculatorPage />
}
