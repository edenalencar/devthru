import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { UUIDGeneratorPage } from "./client"

const title = "Gerador de UUID v4 Online - Identificador Único Universal"
const description = "Gere UUIDs (v4) únicos e seguros aleatoriamente para seus projetos e bancos de dados. Identificadores universais prontos para uso em desenvolvimento de software."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/utilities/uuid`,
    },
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "SoftwareApplication",
                            "name": "Gerador de UUID v4 Online - Identificador Único Universal",
                            "operatingSystem": "Web",
                            "applicationCategory": "UtilidadesApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere UUIDs (v4) únicos e seguros aleatoriamente para seus projetos e bancos de dados. Identificadores universais prontos para uso em desenvolvimento de software."
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
                                    "name": "Utilidades",
                                    "item": "https://www.devthru.com/tools/utilities"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Gerador de UUID",
                                    "item": "https://www.devthru.com/tools/utilities/uuid"
                                }
                            ]
                        }
                    ]
                }}
            />
            <UUIDGeneratorPage />
        </>
    )
}
