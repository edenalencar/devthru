import { Metadata } from "next"
import { ApiDocsPage } from "./client"

export const metadata: Metadata = {
    title: "Documentação da API",
    description: "Documentação completa da API REST do DevThru para integração de ferramentas de desenvolvimento.",
}

export default function Page() {
    return <ApiDocsPage />
}
