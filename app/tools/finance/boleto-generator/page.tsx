import { Metadata } from "next"
import { BoletoGeneratorPage } from "./client"

const title = "Gerador de Boleto Bancário Mock - Visualização para Testes"
const description = "Gerador de Boleto Bancário Mock para testes de software. Crie boletos fictícios com código de barras validável e PDF para homologar seu sistema de pagamentos de forma segura."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <BoletoGeneratorPage />
}
