import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { BaseConverterPage } from "./client"

export const metadata: Metadata = {
    title: "Conversor de Bases Numéricas - Binário, Decimal, Hexadecimal",
    description: "Converta números entre bases Decimal, Binária, Hexadecimal e Octal instantaneamente. Ferramenta essencial para estudantes e programadores que trabalham com bits.",
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
                            "name": "Conversor de Bases Numéricas - Binário, Decimal, Hexadecimal",
                            "operatingSystem": "Web",
                            "applicationCategory": "ConversoresApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Converta números entre bases Decimal, Binária, Hexadecimal e Octal instantaneamente. Ferramenta essencial para estudantes e programadores que trabalham com bits."
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
                                    "name": "Conversor de Base",
                                    "item": "https://www.devthru.com/tools/converters/base"
                                }
                            ]
                        }
                    ]
                }}
            />
            <BaseConverterPage />
        </>
    )
}
