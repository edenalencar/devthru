import { Metadata } from "next"
import { MdfeGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Chave MDF-e - Manifesto Eletrônico",
    description: "Gere chaves de acesso de Manifesto Eletrônico de Documentos Fiscais (MDF-e) válidas para testes.",
    keywords: ["gerador mdf-e", "chave mdf-e", "mdfe teste", "manifesto eletronico", "dev tools"],
    openGraph: {
        title: "Gerador de Chave MDF-e | DevHub Tools",
        description: "Gere chaves de acesso de Manifesto Eletrônico (MDF-e) válidas para testes.",
        type: "website",
    }
}

export default function Page() {
    return <MdfeGeneratorPage />
}
