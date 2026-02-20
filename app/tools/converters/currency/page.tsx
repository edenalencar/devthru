import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { CurrencyConverterPage } from "./client"

const title = "Conversor de Moedas Online - Cotação Atualizada"
const description = "Converta moedas (Dólar, Euro, Real, etc) com cotação atualizada diariamente. Rápido e fácil."

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
                            "description": "Converta moedas (Dólar, Euro, Real, etc) com cotação atualizada diariamente. Rápido e fácil."
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
