import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { AddressGeneratorPage } from "./client"

const title = "Gerador de Endereços Brasileiros Válidos - CEP e Rua"
const description = "Gere endereços brasileiros completos com CEP, rua, bairro e cidade para testes de sistemas e formulários."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/personal/address`,
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
                            "name": "Gerador de Endereços Brasileiros Válidos - CEP e Rua",
                            "operatingSystem": "Web",
                            "applicationCategory": "PessoalApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
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
