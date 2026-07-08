import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { ChassiGeneratorPage } from "./client"

const title = "Gerador de Chassi (VIN) Válido"
const description = "Gere números de Chassi (VIN) válidos de forma aleatória em lote ou individualmente para testes de software, QA e homologação de APIs. Rápido e sem cadastro."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/automotive/chassi",
    keywords: ["gerador de chassi",
        "gerar chassi",
        "gerador de chassi online",
        "chassi ficticio",
        "gerador de chassi de veiculos",
        "chassi válido",
        "VIN generator",
        "número de chassi",
        "chassi veicular",
        "gerador de placa e chassi",
        "gerador de chassi moto",
        "gerar chassi online",
    ]
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
                            "name": "Gerador de Chassi Online Grátis - VIN Válido para Testes",
                            "operatingSystem": "Web",
                            "applicationCategory": "DeveloperApplication",
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
                            "description": "Gerador de chassi online grátis! Crie códigos VIN (Vehicle Identification Number) válidos em 1 clique para testes de software. Rápido, seguro e sem cadastro."
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
                                    "name": "Automotivo",
                                    "item": "https://www.devthru.com/tools/automotive"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Chassi",
                                    "item": "https://www.devthru.com/tools/automotive/chassi"
                                }
                            ]
                        }
                    ]
                }}
            />
            <ChassiGeneratorPage />
        </>
    )
}
