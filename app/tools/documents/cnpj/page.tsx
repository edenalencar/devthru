import { Metadata } from "next"
import { CNPJGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de CNPJ Válido Online - Cadastro Pessoa Jurídica",
    description: "Gere números de CNPJ válidos com suporte a formato alfanumérico. Ferramenta essencial para testes de sistemas, validação de softwares e automação de QA.",
}

export default function Page() {
    return <CNPJGeneratorPage />
}
