import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CreditCardGeneratorPage } from "./client"

const title = "Gerador de Cartão de Crédito"
const description = "Gerador de cartão de crédito online gratuito. Gere números de cartão de crédito válidos com nome, validade, CVV e endereço para testes de sistemas de pagamento."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/credit-card-generator",
    keywords: ["gerador de cartao de credito", "gerar cartao de credito", "cartao de credito valido", "algoritmo de luhn", "gerador cartao de credito", "dev tools", "testes de pagamento"]
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
                            "name": "Gerador de Cartão de Crédito Válido para Testes - DevThru",
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
                            "description": "Gere e valide números de cartão de crédito válidos com o algoritmo de Luhn para testes de sistemas de pagamento."
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
                                    "name": "Finanças",
                                    "item": "https://www.devthru.com/tools/finance"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Cartão de Crédito",
                                    "item": "https://www.devthru.com/tools/finance/credit-card-generator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CreditCardGeneratorPage />
        </>
    )
}
