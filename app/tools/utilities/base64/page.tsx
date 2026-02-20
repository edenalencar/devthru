import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { Base64Page } from "./client"

const title = "Codificador e Decodificador Base64 Online"
const description = "Codifique e decodifique textos e strings em Base64 instantaneamente. Ferramenta essencial para desenvolvedores que precisam transmitir dados binários em texto."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/utilities/base64`,
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
                            "name": "Codificador e Decodificador Base64 Online",
                            "operatingSystem": "Web",
                            "applicationCategory": "UtilidadesApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Codifique e decodifique textos e strings em Base64 instantaneamente. Ferramenta essencial para desenvolvedores que precisam transmitir dados binários em texto."
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
                                    "name": "Utilidades",
                                    "item": "https://www.devthru.com/tools/utilities"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Base64",
                                    "item": "https://www.devthru.com/tools/utilities/base64"
                                }
                            ]
                        }
                    ]
                }}
            />
            <Base64Page />
        </>
    )
}
