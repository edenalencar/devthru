import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { RGGeneratorPage } from "./client"

const title = "Gerador de RG - Registro Geral Válido para Testes"
const description = "Crie números de RG (Registro Geral) aleatórios e válidos para testes de validação de formulários e sistemas."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de RG - Registro Geral Válido para Testes",
    description: "Crie números de RG (Registro Geral) aleatórios e válidos para testes de validação de formulários e sistemas.",
    path: "/tools/documents/rg",
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
                                    "name": "Documentos",
                                    "item": "https://www.devthru.com/tools/documents"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "RG",
                                    "item": "https://www.devthru.com/tools/documents/rg"
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
