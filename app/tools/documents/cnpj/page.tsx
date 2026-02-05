import { Metadata } from "next"
import { CNPJGeneratorPage } from "./client"

const title = "Gerador e Validador de CNPJ Válido Online | DevThru"
const description = "Gere e valide números de CNPJ para testes de software. Sistema completo para desenvolvedores e QA com suporte a CNPJ alfanumérico."

export const metadata: Metadata = {
    title,
    description,
    keywords: ["gerador de cnpj", "validador de cnpj", "testes de software", "gerador cnpj", "qa", "massa de dados"],
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <CNPJGeneratorPage />
}
