import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { MdfeGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Chave MDF-e Online - Manifesto Eletrônico de Documentos",
    description: "Gere chaves de acesso do Manifesto Eletrônico de Documentos Fiscais (MDF-e) válidas para testes de integração e homologação. Ferramenta gratuita e sem cadastro.",
    keywords: ["gerador mdf-e", "chave mdf-e", "mdfe teste", "manifesto eletronico", "dev tools"],
    alternates: {
        canonical: `${siteConfig.url}/tools/business/mdfe-generator`,
    },
    openGraph: {
        title: "Gerador de Chave MDF-e Online - Manifesto Eletrônico de Documentos",
        description: "Gere chaves de acesso do Manifesto Eletrônico de Documentos Fiscais (MDF-e) válidas para testes de integração e homologação. Ferramenta gratuita e sem cadastro.",
        type: "website",
    }
}

export default function Page() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Gerador de Chave MDF-e",
        "description": "Gere chaves de acesso do Manifesto Eletrônico de Documentos Fiscais (MDF-e) válidas para testes de integração e homologação. Ferramenta gratuita e sem cadastro.",
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
            <MdfeGeneratorPage />
        </>
    )
}
