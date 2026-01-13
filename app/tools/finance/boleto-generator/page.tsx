import { Metadata } from "next"
import { BoletoGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Boleto Bancário Mock - Visualização para Testes",
    description: "Gerador de Boleto Bancário Mock para testes de software. Crie boletos fictícios com código de barras validável e PDF para homologar seu sistema de pagamentos de forma segura.",
}

export default function Page() {
    return <BoletoGeneratorPage />
}
