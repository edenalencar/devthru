import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"
import { TOOL_META_DESCRIPTIONS } from "@/lib/seo/meta-descriptions"

import { CaseConverterPage } from "./client"

const title = "Conversor de Case Online"
const description = TOOL_META_DESCRIPTIONS.caseConverter

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de Case: Maiúsculas, Minúsculas e camelCase",
    description,
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
                            "description": description
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
