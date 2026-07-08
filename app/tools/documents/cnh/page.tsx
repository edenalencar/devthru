import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CNHGeneratorPage } from "./client"

const title = "Gerador de CNH Online"
const description = "Gere números de CNH (Carteira Nacional de Habilitação) válidos para testes de software. Ferramenta com suporte à geração em massa, ideal para desenvolvedores e QA."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de CNH Online para Testes de Software",
    description: "Gere números de CNH (Carteira Nacional de Habilitação) válidos para testes de software. Suporte à geração em massa, ideal para QA e devs.",
    path: "/tools/documents/cnh",
})

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
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.8",
                                "ratingCount": "120"
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
