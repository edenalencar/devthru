import { Metadata } from "next"
import { ContractGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Contratos - Modelos Editáveis",
    description: "Crie e personalize contratos profissionais rapidamente. Modelos para prestação de serviços, locação e mais.",
}

export default function Page() {
    return <ContractGeneratorPage />
}
