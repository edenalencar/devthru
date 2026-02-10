import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { XMLValidatorPage } from "./client"

const title = "Validador de XML Online - Verificar Sintaxe e Formatação"
const description = "Valide a sintaxe de seus arquivos XML instantaneamente com nosso Validador de XML online. Identifique erros de formatação e tags inválidas gratuitamente."

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
                                    "name": "Validador XML",
                                    "item": "https://devhubtools.com/tools/utilities/xml-validator"
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
