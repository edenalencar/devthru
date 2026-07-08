import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { PlaceholderGeneratorPage } from "./client"

const title = "Gerador de Imagem Placeholder"
const description = "Crie imagens placeholder (dummy image) com tamanho, cores e texto personalizados para protótipos e layouts."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Imagem Placeholder",
    description: "Crie imagens placeholder (dummy image) com tamanho, cores e texto personalizados para protótipos e layouts.",
    path: "/tools/image/placeholder",
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
                            "name": "Gerador de Imagem Placeholder - Tamanho Personalizado",
                            "operatingSystem": "Web",
                            "applicationCategory": "ImagemApplication",
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
                            "description": "Crie imagens placeholder (dummy image) com tamanho, cores e texto personalizados para protótipos e layouts."
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
                                    "name": "Imagem",
                                    "item": "https://www.devthru.com/tools/image"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Placeholder",
                                    "item": "https://www.devthru.com/tools/image/placeholder"
                                }
                            ]
                        }
                    ]
                }}
            />
            <PlaceholderGeneratorPage />
        </>
    )
}
