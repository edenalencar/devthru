import { Metadata } from "next"
import { CNHGeneratorPage } from "./client"

const title = "Gerador de CNH - Carteira de Motorista Válida"
const description = "Gere números de CNH (Carteira Nacional de Habilitação) válidos para testes. Suporte a geração em massa."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <CNHGeneratorPage />
}
