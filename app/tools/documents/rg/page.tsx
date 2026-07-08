import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { RGGeneratorPage } from "./client"

const title = "Gerador e Validador de RG Online [Grátis]"
const description = "Gere e valide números de RG (Registro Geral) válidos com dígito verificador em 1 clique. Ferramenta online gratuita para testes e homologação de sistemas."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/rg",
    keywords: ["gerador de rg", "validador de rg", "registro geral", "gerador rg", "rg valido", "dev tools", "testes de software"]
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
                            "name": "Gerador e Validador de RG Online - DevThru",
                            "operatingSystem": "Web",
                            "applicationCategory": "DeveloperApplication",
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
                            "description": "Gere e valide números de RG (Registro Geral) válidos de forma gratuita para testes e homologação de sistemas."
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
                                    "name": "RG",
                                    "item": "https://www.devthru.com/tools/documents/rg"
                                }
                            ]
                        }
                    ]
                }}
            />
            <RGGeneratorPage />
        </>
    )
}
