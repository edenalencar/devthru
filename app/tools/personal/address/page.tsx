import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { AddressGeneratorPage } from "./client"

const title = "Gerador de Endereço Aleatório"
const description = "Gere endereços brasileiros completos com CEP, rua, bairro e cidade para testes de sistemas e formulários."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Endereço Aleatório - CEP e Rua Válidos [Grátis]",
    description: "Gere endereços brasileiros fictícios e válidos com CEP, rua, número, bairro, cidade e estado em 1 clique. Geração individual ou em lote para testes.",
    path: "/tools/personal/address",
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
                            "name": "Gerador de Endereço Aleatório",
                            "operatingSystem": "Web",
                            "applicationCategory": "PessoalApplication",
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
                            "description": "Gere endereços brasileiros completos com CEP, rua, bairro e cidade para testes de sistemas e formulários."
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
                                    "name": "Pessoal",
                                    "item": "https://www.devthru.com/tools/personal"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Endereço (CEP)",
                                    "item": "https://www.devthru.com/tools/personal/address"
                                }
                            ]
                        }
                    ]
                }}
            />
            <AddressGeneratorPage />
        </>
    )
}
