import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { Base64Page } from "./client"

const title = "Codificador e Decodificador Base64"
const description = "Codifique e decodifique textos e strings em Base64 instantaneamente. Ferramenta essencial para desenvolvedores que precisam transmitir dados binários em texto."

export const metadata: Metadata = generateToolMetadata({
    title: "Codificador e Decodificador Base64 Online Gratuito",
    description: "Codifique e decodifique textos e strings em Base64 instantaneamente. Ferramenta essencial para desenvolvedores que precisam transmitir dados binários em texto.",
    path: "/tools/utilities/base64",
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
                            "name": "Codificador e Decodificador Base64 Online",
                            "operatingSystem": "Web",
                            "applicationCategory": "UtilidadesApplication",
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
                            "description": "Codifique e decodifique textos e strings em Base64 instantaneamente. Ferramenta essencial para desenvolvedores que precisam transmitir dados binários em texto."
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
                                    "name": "Base64",
                                    "item": "https://www.devthru.com/tools/utilities/base64"
                                }
                            ]
                        }
                    ]
                }}
            />
            <Base64Page />
        </>
    )
}
