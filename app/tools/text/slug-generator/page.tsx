import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { SlugGeneratorPage } from "./client"

const title = "Gerador de Slug Url Amigável Online"
const description = "Transforme títulos e textos em URLs amigáveis (slugs) otimizadas para SEO. Remova acentos e caracteres especiais para links limpos."

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
                            "name": "Gerador de Slug Url Amigável Online",
                            "operatingSystem": "Web",
                            "applicationCategory": "TextoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
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
                                    "name": "Texto",
                                    "item": "https://devhubtools.com/tools/text"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Gerador de Slug",
                                    "item": "https://devhubtools.com/tools/text/slug-generator"
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
