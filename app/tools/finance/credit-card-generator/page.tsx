import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { CreditCardGeneratorPage } from "./client"

const title = "Gerador de Cartão de Crédito Válido para Testes"
const description = "Gere números de cartão de crédito válidos (algoritmo de Luhn) para testes de sistemas de pagamento. Visa, Mastercard, Amex e mais."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/finance/credit-card-generator`,
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
                            "name": "Gerador de Cartão de Crédito Válido para Testes",
                            "operatingSystem": "Web",
                            "applicationCategory": "FinançasApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere números de cartão de crédito válidos (algoritmo de Luhn) para testes de sistemas de pagamento. Visa, Mastercard, Amex e mais."
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
