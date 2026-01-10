import { Metadata } from "next"
import { CPFGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de CPF",
    description: "Gere números de CPF válidos para testes de software com nosso Gerador de CPF online. Ferramenta rápida, gratuita e essencial para desenvolvedores e testes de QA.",
}

export default function Page() {
    return <CPFGeneratorPage />
}
