import { Metadata } from "next"
import { CPFGeneratorPage } from "./client"

const title = "Gerador de CPF Válido Online | DevThru"
const description = "Gere números de CPF válidos para testes de software com nosso Gerador de CPF. Ferramenta rápida, gratuita e essencial para desenvolvedores e testes de QA."

export const metadata: Metadata = {
    title,
    description,
    keywords: ["gerador de cpf", "cpf valido", "testar cpf", "gerador cpf", "cpf generator", "massa de dados"],
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <CPFGeneratorPage />
}
