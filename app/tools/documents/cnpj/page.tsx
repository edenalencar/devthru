import { Metadata } from "next"
import { CNPJGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de CNPJ",
    description: "Gere e valide CNPJs (Cadastro Nacional da Pessoa Jurídica) para testes. Suporte a CNPJ alfanumérico.",
}

export default function Page() {
    return <CNPJGeneratorPage />
}
