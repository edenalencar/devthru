import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { UrlEncoderPage } from "./client"

const title = "URL Encode e Decode Online | Ferramenta Grátis"
const description = "Codifique e decodifique URLs online. Converta caracteres especiais para o formato URL-safe e vice-versa. Ferramenta essencial para desenvolvedores web."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/utilities/url-encoder`,
    },
    openGraph: {
        title,
        description,
    },
    keywords: ["url encode", "url decode", "codificar url", "decodificar url", "percent encoding", "ferramentas dev"],
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
                            "name": title,
                            "operatingSystem": "Web",
                            "applicationCategory": "UtilitiesApplication",
                            "description": description,
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            }
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
                                    "item": "https://www.devthru.com/tools"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "URL Encoder",
                                    "item": "https://www.devthru.com/tools/utilities/url-encoder"
                                }
                            ]
                        }
                    ]
                }}
            />
            <UrlEncoderPage />
        </>
    )
}
