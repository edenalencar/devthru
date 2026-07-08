import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CurrencyConverterPage } from "./client"

const title = "Conversor de Moedas Online"
const description = "Converta moedas como Dólar, Euro, Libra e Real com cotação atualizada diariamente. Conversor de câmbio online, gratuito, rápido e sem necessidade de cadastro."

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de Moedas Online",
    description: "Converta moedas como Dólar, Euro, Libra e Real com cotação atualizada diariamente. Conversor de câmbio online, gratuito, rápido e sem necessidade de cadastro.",
    path: "/tools/converters/currency",
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
                            "name": "Conversor de Moedas Online - Cotação Atualizada",
                            "operatingSystem": "Web",
                            "applicationCategory": "ConversoresApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Converta moedas como Dólar, Euro, Libra e Real com cotação atualizada diariamente. Conversor de câmbio online, gratuito, rápido e sem necessidade de cadastro.",
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
                                    "name": "Conversores",
                                    "item": "https://www.devthru.com/tools/converters"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Conversor de Moeda",
                                    "item": "https://www.devthru.com/tools/converters/currency"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CurrencyConverterPage />
        </>
    )
}
