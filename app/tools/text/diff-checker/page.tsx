import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { DiffCheckerPage } from "./client"

const title = "Comparador de Texto Online - Diff Checker de Código e Texto"
const description = "Compare dois textos e visualize as diferenças instantaneamente com nosso Diff Checker online. Identifique adições e remoções por caractere, palavra ou linha."

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
                            "name": "Comparador de Texto Online - Diff Checker de Código e Texto",
                            "operatingSystem": "Web",
                            "applicationCategory": "TextoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Compare dois textos e visualize as diferenças instantaneamente com nosso Diff Checker online. Identifique adições e remoções por caractere, palavra ou linha."
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
                                    "name": "Comparador de Texto",
                                    "item": "https://devhubtools.com/tools/text/diff-checker"
                                }
                            ]
                        }
                    ]
                }}
            />
            <DiffCheckerPage />
        </>
    )
}
