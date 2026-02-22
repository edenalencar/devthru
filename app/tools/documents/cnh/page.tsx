import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { CNHGeneratorPage } from "./client"

const title = "Gerador de CNH Online - Carteira Nacional de Habilitação para Testes"
const description = "Gere números de CNH (Carteira Nacional de Habilitação) válidos para testes de software. Ferramenta com suporte à geração em massa, ideal para desenvolvedores e QA."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/documents/cnh`,
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
                            "name": "Gerador de CNH - Carteira de Motorista Válida",
                            "operatingSystem": "Web",
                            "applicationCategory": "DocumentosApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere números de CNH (Carteira Nacional de Habilitação) válidos para testes de software. Ferramenta com suporte à geração em massa, ideal para desenvolvedores e QA."
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
                                    "name": "Documentos",
                                    "item": "https://www.devthru.com/tools/documents"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "CNH",
                                    "item": "https://www.devthru.com/tools/documents/cnh"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CNHGeneratorPage />
        </>
    )
}
