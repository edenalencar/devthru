import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { ChassiGeneratorPage } from "./client"

const title = "Gerador de Chassi Online Grátis - VIN Válido para Testes"
const description = "Gerador de chassi online grátis! Crie códigos VIN (Vehicle Identification Number) válidos em 1 clique para testes de software. Rápido, seguro e sem cadastro."

export const metadata: Metadata = {
    title,
    description,
    keywords: [
        "gerador de chassi",
        "gerar chassi",
        "gerador de chassi online",
        "chassi válido",
        "VIN generator",
        "número de chassi",
        "chassi veicular",
    ],
    alternates: {
        canonical: `${siteConfig.url}/tools/automotive/chassi`,
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
