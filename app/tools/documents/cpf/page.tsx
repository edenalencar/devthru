import { Metadata } from "next"
import { CPFGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de CPF",
    description: "Gere e valide CPFs (Cadastro de Pessoas Físicas) para testes de software. Ferramenta online rápida e gratuita.",
}

export default function Page() {
    return <CPFGeneratorPage />
}
