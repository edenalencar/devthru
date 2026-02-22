import { Metadata } from "next"
import { ApiDocsPage } from "./client"

export const metadata: Metadata = {
    title: "Documentação da API REST - Integração e Exemplos de Código",
    description: "Documentação completa da API REST do DevThru. Integre geradores de CPF, CNPJ, dados pessoais e mais de 40 ferramentas em seus sistemas com exemplos de código e autenticação.",
}

export default function Page() {
    return <ApiDocsPage />
}
