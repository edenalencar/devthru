import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"
import { TOOL_META_DESCRIPTIONS } from "@/lib/seo/meta-descriptions"

import { FipePage } from "./client"

const title = "Tabela FIPE: Preço de Veículos"
const description = TOOL_META_DESCRIPTIONS.fipe

export const metadata: Metadata = generateToolMetadata({
    title: "Tabela FIPE Atualizada - Consulte o Preço de Veículos",
    description,
    path: "/tools/automotive/fipe",
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
                            "name": "Tabela FIPE - Consulta Grátis",
                            "operatingSystem": "Web",
                            "applicationCategory": "AutomotivoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": description,
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
                                    "name": "Automotivo",
                                    "item": "https://www.devthru.com/tools/automotive"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Tabela FIPE",
                                    "item": "https://www.devthru.com/tools/automotive/fipe"
                                }
                            ]
                        }
                    ]
                }}
            />
            <FipePage />
        </>
    )
}
