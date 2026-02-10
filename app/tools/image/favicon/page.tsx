import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { FaviconGeneratorPage } from "./client"

const title = "Gerador de Favicon Online - Ícones para Sites"
const description = "Crie favicons personalizados para seu site a partir de imagens. Gere todos os tamanhos e formatos necessários."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "SoftwareApplication",
                            "name": "Gerador de Favicon Online - Ícones para Sites",
                            "operatingSystem": "Web",
                            "applicationCategory": "ImagemApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Crie favicons personalizados para seu site a partir de imagens. Gere todos os tamanhos e formatos necessários."
                        },
                        {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://devhubtools.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Ferramentas",
                                    "item": "https://devhubtools.com/ferramentas"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Imagem",
                                    "item": "https://devhubtools.com/tools/image"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Gerador de Favicon",
                                    "item": "https://devhubtools.com/tools/image/favicon"
                                }
                            ]
                        }
                    ]
                }}
            />
            <FaviconGeneratorPage />
        </>
    )
}
