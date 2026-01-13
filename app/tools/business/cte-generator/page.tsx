import { Metadata } from "next"
import { CteGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Chave CT-e - Conhecimento de Transporte",
    description: "Gere chaves de acesso de Conhecimento de Transporte Eletrônico (CT-e) válidas para testes de integração.",
    keywords: ["gerador ct-e", "chave de acesso ct-e", "cte teste", "dev tools", "documentos fiscais"],
    openGraph: {
        title: "Gerador de Chave CT-e | DevHub Tools",
        description: "Gere chaves de acesso de Conhecimento de Transporte Eletrônico (CT-e) válidas para testes.",
        type: "website",
    }
}

export default function Page() {
    return <CteGeneratorPage />
}
