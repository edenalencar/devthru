import { Metadata } from "next"
import { CNHGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de CNH - Carteira de Motorista Válida",
    description: "Gere números de CNH (Carteira Nacional de Habilitação) válidos para testes. Suporte a geração em massa.",
}

export default function Page() {
    return <CNHGeneratorPage />
}
