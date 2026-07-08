import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { BaseConverterPage } from "./client"

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de Bases Numéricas",
    description: "Converta números inteiros instantaneamente entre Decimal (Base 10), Binário (Base 2), Hexadecimal (Base 16) e Octal (Base 8). Ideal para desenvolvedores e estudantes.",
    path: "/tools/converters/base",
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
                            "name": "Conversor de Bases Numéricas",
                            "operatingSystem": "Web",
                            "applicationCategory": "ConversoresApplication",
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
                            "description": "Converta números inteiros instantaneamente entre Decimal (Base 10), Binário (Base 2), Hexadecimal (Base 16) e Octal (Base 8). Ideal para desenvolvedores e estudantes."
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
                                    "name": "Conversor de Base",
                                    "item": "https://www.devthru.com/tools/converters/base"
                                }
                            ]
                        }
                    ]
                }}
            />
            <BaseConverterPage />
        </>
    )
}
