import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { RenavamGeneratorPage } from "./client"

const title = "Gerador de RENAVAM Online Grátis - Código Válido para Testes"
const description = "Gerador de RENAVAM online e gratuito! Gere números de RENAVAM válidos (11 dígitos) para testes de sistemas automotivos. Rápido, seguro e sem cadastro."

export const metadata: Metadata = {
    title,
    description,
    keywords: [
        "gerador de renavam",
        "gerar renavam",
        "renavam válido",
        "número renavam",
        "renavam online",
        "gerador renavam grátis",
    ],
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
                            "name": "Gerador de RENAVAM Online Grátis - Código Válido para Testes",
                            "operatingSystem": "Web",
                            "applicationCategory": "AutomotivoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gerador de RENAVAM online e gratuito! Gere números de RENAVAM válidos (11 dígitos) para testes de sistemas automotivos. Rápido, seguro e sem cadastro."
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
                                    "name": "Automotivo",
                                    "item": "https://devhubtools.com/tools/automotive"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Renavam",
                                    "item": "https://devhubtools.com/tools/automotive/renavam"
                                }
                            ]
                        }
                    ]
                }}
            />
            <RenavamGeneratorPage />
        </>
    )
}
