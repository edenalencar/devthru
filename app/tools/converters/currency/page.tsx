import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { CurrencyConverterPage } from "./client"

const title = "Conversor de Moedas Online Grátis - Cotação Atualizada Hoje"
const description = "Converta moedas como Dólar, Euro, Libra e Real com cotação atualizada diariamente. Conversor de câmbio online, gratuito, rápido e sem necessidade de cadastro."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/converters/currency`,
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
