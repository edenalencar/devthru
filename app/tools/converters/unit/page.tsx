import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { UnitConverterPage } from "./client"

const title = "Conversor de Medidas e Unidades Online [Grátis]"
const description = "Conversor de medidas e unidades online gratuito. Converta unidades de comprimento, peso, volume, temperatura e área instantaneamente."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/converters/unit",
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
                            "name": "Conversor de Unidades Grátis - Medidas, Pesos e Temperatura",
                            "operatingSystem": "Web",
                            "applicationCategory": "ConversoresApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Converta unidades de medida instantaneamente com nosso Conversor online. Suporte para comprimento, peso, temperatura e muito mais. Prático, rápido e gratuito."
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
                                    "name": "Conversores",
                                    "item": "https://www.devthru.com/tools/converters"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Conversor de Unidades",
                                    "item": "https://www.devthru.com/tools/converters/unit"
                                }
                            ]
                        }
                    ]
                }}
            />
            <UnitConverterPage />
        </>
    )
}
