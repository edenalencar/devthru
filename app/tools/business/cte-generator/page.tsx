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
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Gerador de Chave CT-e",
        "description": "Gere chaves de acesso de Conhecimento de Transporte Eletrônico (CT-e) válidas para testes de integração.",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        }
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CteGeneratorPage />
        </>
    )
}
