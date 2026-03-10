import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CaseConverterPage } from "./client"

const title = "Conversor de Case Online - Maiúsculas, Minúsculas e camelCase"
const description = "Transforme textos para UPPERCASE, lowercase, camelCase, PascalCase, Title Case e snake_case instantaneamente. Conversor de texto online, gratuito e sem necessidade de cadastro."

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de Case: Maiúsculas, Minúsculas e camelCase",
    description: "Transforme textos para UPPERCASE, lowercase, camelCase, PascalCase e snake_case instantaneamente. Conversor de texto online gratuito e sem cadastro.",
    path: "/tools/text/case-converter",
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
                            "name": "Conversor de Case - Maiúsculas e Minúsculas",
                            "operatingSystem": "Web",
                            "applicationCategory": "TextoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Transforme textos para UPPERCASE, lowercase, camelCase, Title Case e mais instantaneamente."
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
                                    "name": "Texto",
                                    "item": "https://www.devthru.com/tools/text"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Maiúsculas/Minúsculas",
                                    "item": "https://www.devthru.com/tools/text/case-converter"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CaseConverterPage />
        </>
    )
}
