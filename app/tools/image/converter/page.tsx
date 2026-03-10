import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { ImageConverterPage } from "./client"

const title = "Conversor de Imagem Online Grátis - PNG, JPG e WEBP"
const description = "Converta imagens entre formatos PNG, JPG e WEBP rapidamente e sem perda de qualidade. Processamento seguro no navegador, sem upload para servidor. 100% gratuito."

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de Imagem Online Grátis - PNG, JPG e WEBP",
    description: "Converta imagens entre PNG, JPG e WEBP rapidamente e sem perda de qualidade. Processamento 100% seguro no navegador, sem uploads para a nuvem.",
    path: "/tools/image/converter",
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
                            "name": "Conversor de Imagem Online Grátis - PNG, JPG e WEBP",
                            "operatingSystem": "Web",
                            "applicationCategory": "ImagemApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Converta imagens entre formatos PNG, JPG e WEBP rapidamente e sem perda de qualidade. Processamento seguro no navegador, sem upload para servidor. 100% gratuito."
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
                                    "name": "Conversor de Imagem",
                                    "item": "https://www.devthru.com/tools/image/converter"
                                }
                            ]
                        }
                    ]
                }}
            />
            <ImageConverterPage />
        </>
    )
}
