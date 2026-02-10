import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { CaseConverterPage } from "./client"

const title = "Conversor de Case - Maiúsculas e Minúsculas"
const description = "Transforme textos para UPPERCASE, lowercase, camelCase, Title Case e mais instantaneamente."

export const metadata: Metadata = {
    title,
    description,
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
                                    "item": "https://devhubtools.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Ferramentas",
                                    "item": "https://devhubtools.com/ferramentas"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Texto",
                                    "item": "https://devhubtools.com/tools/text"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Maiúsculas/Minúsculas",
                                    "item": "https://devhubtools.com/tools/text/case-converter"
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
