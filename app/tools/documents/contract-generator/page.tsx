import { Metadata } from "next"
import { ContractGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Contratos Online - Modelos Editáveis em PDF",
    description: "Crie contratos personalizados em minutos com nossos modelos editáveis. Ideal para prestação de serviços e locação. Gere documentos profissionais em PDF ou texto.",
}

export default function Page() {
    return <ContractGeneratorPage />
}
