import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { LoremIpsumPage } from "./client"

const title = "Gerador de Lorem Ipsum - Texto de Preenchimento"
const description = "Gere texto Lorem Ipsum personalizado para seus projetos. Crie parágrafos, frases e listas aleatórias para preencher layouts e protótipos de design com facilidade."

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
                            "name": "Gerador de Lorem Ipsum - Texto de Preenchimento",
                            "operatingSystem": "Web",
                            "applicationCategory": "UtilidadesApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere texto Lorem Ipsum personalizado para seus projetos. Crie parágrafos, frases e listas aleatórias para preencher layouts e protótipos de design com facilidade."
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
                                    "name": "Utilidades",
                                    "item": "https://devhubtools.com/tools/utilities"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Lorem Ipsum",
                                    "item": "https://devhubtools.com/tools/utilities/lorem"
                                }
                            ]
                        }
                    ]
                }}
            />
            <LoremIpsumPage />
        </>
    )
}
