import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { PlaceholderGeneratorPage } from "./client"

const title = "Gerador de Imagem Placeholder - Tamanho Personalizado"
const description = "Crie imagens placeholder (dummy image) com tamanho, cores e texto personalizados para protótipos e layouts."

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
                            "name": "Gerador de Imagem Placeholder - Tamanho Personalizado",
                            "operatingSystem": "Web",
                            "applicationCategory": "ImagemApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
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
                                    "name": "Placeholder",
                                    "item": "https://devhubtools.com/tools/image/placeholder"
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
