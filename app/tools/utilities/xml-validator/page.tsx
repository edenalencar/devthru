import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { XMLValidatorPage } from "./client"

const title = "Formatador e Validador de XML Online [Instantâneo]"
const description = "Verifique a sintaxe e formate qualquer arquivo XML em segundos. Ferramenta poderosa que não envia seus dados ou notas fiscais para o servidor. 100% Client-Side Seguro."

export const metadata: Metadata = generateToolMetadata({
    title: "Formatador e Validador de XML Online [Instantâneo]",
    description: "Verifique a sintaxe e formate qualquer arquivo XML em segundos. Ferramenta poderosa, segura (100% Client-Side) que não envia seus dados para nuvem.",
    path: "/tools/utilities/xml-validator",
    keywords: ["validador xml", "formatador xml", "verificar sintaxe xml", "nfe xml", "validar nota fiscal xml", "xml parser", "desenvolvedores"]
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
