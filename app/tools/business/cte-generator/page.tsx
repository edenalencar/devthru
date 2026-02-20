import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { Graph } from "schema-dts"
import { CteGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Chave CT-e - Conhecimento de Transporte",
    description: "Gere chaves de acesso de Conhecimento de Transporte Eletrônico (CT-e) válidas para testes de integração.",
    keywords: ["gerador ct-e", "chave de acesso ct-e", "cte teste", "dev tools", "documentos fiscais"],
    alternates: {
        canonical: `${siteConfig.url}/tools/business/cte-generator`,
    },
    openGraph: {
        title: "Gerador de Chave CT-e | DevHub Tools",
        description: "Gere chaves de acesso de Conhecimento de Transporte Eletrônico (CT-e) válidas para testes.",
        type: "website",
    }
}

export default function Page() {
    const jsonLd: Graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "Gerador de Chave CT-e",
                "description": "Gere chaves de acesso de Conhecimento de Transporte Eletrônico (CT-e) válidas para testes de integração.",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "BRL"
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://www.devthru.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Ferramentas",
                        "item": "https://www.devthru.com/ferramentas"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Negócios",
                        "item": "https://www.devthru.com/ferramentas-fiscais"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "Gerador de CT-e",
                        "item": "https://www.devthru.com/tools/business/cte-generator"
                    }
                ]
            }
        ]
    }

    return (
        <>
            <JsonLd data={jsonLd} />
            <CteGeneratorPage />
        </>
    )
}
