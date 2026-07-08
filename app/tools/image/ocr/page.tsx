import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { OCRPage } from "./client"

export const metadata: Metadata = generateToolMetadata({
    title: "OCR Online Gratuito",
    description: "Extraia texto de imagens (JPG, PNG) e documentos instantaneamente com OCR gratuito. Converta fotos em texto editável sem instalar programas.",
    path: "/tools/image/ocr",
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
                            "name": "OCR Online Gratuito",
                            "operatingSystem": "Web",
                            "applicationCategory": "ImagemApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "OCR Online Gratuito: Extraia texto de imagens (JPG, PNG) e documentos instantaneamente. Converta fotos em texto editável para copiar e colar sem instalar programas."
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
                                    "name": "OCR",
                                    "item": "https://www.devthru.com/tools/image/ocr"
                                }
                            ]
                        }
                    ]
                }}
            />
            <OCRPage />
        </>
    )
}
