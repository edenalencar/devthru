import { Metadata } from "next"
import { DeadlineCalculatorPage } from "./client"

const title = "Calculadora de Prazos Online - Dias Úteis e Corridos"
const description = "Calcule prazos com precisão considerando feriados nacionais e fins de semana. Ferramenta essencial para advogados, gerenciamento de projetos e planejamento."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <DeadlineCalculatorPage />
}
