import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { XMLValidatorPage } from "./client"

const title = "Validador de XML Online - Verificar Sintaxe e Formatação"
const description = "Valide a sintaxe de seus arquivos XML instantaneamente com nosso Validador de XML online. Identifique erros de formatação e tags inválidas gratuitamente."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/utilities/xml-validator`,
    },
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
                            "name": "Validador de XML Online - Verificar Sintaxe e Formatação",
                            "operatingSystem": "Web",
                            "applicationCategory": "UtilidadesApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Valide a sintaxe de seus arquivos XML instantaneamente com nosso Validador de XML online. Identifique erros de formatação e tags inválidas gratuitamente."
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
                                    "name": "Utilidades",
                                    "item": "https://www.devthru.com/tools/utilities"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Validador XML",
                                    "item": "https://www.devthru.com/tools/utilities/xml-validator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <XMLValidatorPage />
        </>
    )
}
