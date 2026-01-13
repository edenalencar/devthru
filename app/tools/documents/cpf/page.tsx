import { Metadata } from "next"
import { CPFGeneratorPage } from "./client"

const title = "Gerador de CPF Válido Online - Ferramenta para Testes"
const description = "Gere números de CPF válidos para testes de software com nosso Gerador de CPF online. Ferramenta rápida, gratuita e essencial para desenvolvedores e testes de QA."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <CPFGeneratorPage />
}
