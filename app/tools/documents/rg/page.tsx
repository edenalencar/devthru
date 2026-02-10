import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { RGGeneratorPage } from "./client"

const title = "Gerador de RG - Registro Geral Válido para Testes"
const description = "Crie números de RG (Registro Geral) aleatórios e válidos para testes de validação de formulários e sistemas."

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
                            "name": "Gerador de RG - Registro Geral Válido para Testes",
                            "operatingSystem": "Web",
                            "applicationCategory": "DocumentosApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Crie números de RG (Registro Geral) aleatórios e válidos para testes de validação de formulários e sistemas."
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
                                    "name": "Documentos",
                                    "item": "https://devhubtools.com/tools/documents"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "RG",
                                    "item": "https://devhubtools.com/tools/documents/rg"
                                }
                            ]
                        }
                    ]
                }}
            />
            <RGGeneratorPage />
        </>
    )
}
