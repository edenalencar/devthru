import { Metadata } from "next"
import { ContractGeneratorPage } from "./client"

const title = "Gerador de Contratos Online - Modelos Editáveis em PDF"
const description = "Crie contratos personalizados em minutos com nossos modelos editáveis. Ideal para prestação de serviços e locação. Gere documentos profissionais em PDF ou texto."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <ContractGeneratorPage />
}
