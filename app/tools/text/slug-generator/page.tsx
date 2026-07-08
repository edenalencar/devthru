import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { SlugGeneratorPage } from "./client"

const title = "Gerador de Slug Url Amigável Online"
const description = "Transforme títulos e textos em URLs amigáveis (slugs) otimizadas para SEO. Remova acentos e caracteres especiais para links limpos."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Slug Url Amigável Online",
    description: "Transforme títulos e textos em URLs amigáveis (slugs) otimizadas para SEO. Remova acentos e caracteres especiais para links limpos.",
    path: "/tools/text/slug-generator",
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
                            "name": "Gerador de Slug Url Amigável Online",
                            "operatingSystem": "Web",
                            "applicationCategory": "TextoApplication",
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
                            "description": "Transforme títulos e textos em URLs amigáveis (slugs) otimizadas para SEO. Remova acentos e caracteres especiais para links limpos."
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
                                    "name": "Texto",
                                    "item": "https://www.devthru.com/tools/text"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Gerador de Slug",
                                    "item": "https://www.devthru.com/tools/text/slug-generator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <SlugGeneratorPage />
        </>
    )
}
