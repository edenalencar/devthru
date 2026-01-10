import { Metadata } from "next"
import { BoletoGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Boleto Bancário Mock - Visualização para Testes",
    description: "Crie um boleto bancário fictício para testar interfaces e impressão. Ferramenta para desenvolvedores e designs.",
}

export default function Page() {
    return <BoletoGeneratorPage />
}
