import { Metadata } from "next"
import { CNPJGeneratorPage } from "./client"

const title = "Gerador de CNPJ Válido Online - Cadastro Pessoa Jurídica"
const description = "Gere números de CNPJ válidos com suporte a formato alfanumérico. Ferramenta essencial para testes de sistemas, validação de softwares e automação de QA."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <CNPJGeneratorPage />
}
