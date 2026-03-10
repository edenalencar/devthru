import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { ChassiGeneratorPage } from "./client"

const title = "Gerador de Chassi (VIN) de Veículo Válido [Grátis]"
const description = "Gerador de chassi online grátis! Crie códigos VIN (Vehicle Identification Number) e chassi fictício válido em 1 clique para testes de software. Rápido e sem cadastro."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Chassi (VIN) de Veículo Válido [Grátis]",
    description: "Gerador de chassi online grátis. Crie códigos VIN e chassi fictício válido em 1 clique para testes de software autmotivo. Rápido e sem cadastro.",
    path: "/tools/automotive/chassi",
    keywords: ["gerador de chassi",
        "gerar chassi",
        "gerador de chassi online",
        "chassi ficticio",
        "gerador de chassi de veiculos",
        "chassi válido",
        "VIN generator",
        "número de chassi",
        "chassi veicular",]
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
                            "applicationCategory": "AutomotivoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
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
