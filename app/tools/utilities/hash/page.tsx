import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { HashGeneratorPage } from "./client"

const title = "Gerador de Hash Online - SHA-256, SHA-512 e SHA-1"
const description = "Gere hashes seguros (SHA-256, MD5, SHA-512) para proteger senhas e verificar integridade de arquivos. Ferramenta de criptografia online rápida e privada."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/utilities/hash`,
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
                            "name": "Gerador de Hash Online - SHA-256, SHA-512 e SHA-1",
                            "operatingSystem": "Web",
                            "applicationCategory": "UtilidadesApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere hashes seguros (SHA-256, MD5, SHA-512) para proteger senhas e verificar integridade de arquivos. Ferramenta de criptografia online rápida e privada."
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
                                    "name": "Gerador de Hash",
                                    "item": "https://www.devthru.com/tools/utilities/hash"
                                }
                            ]
                        }
                    ]
                }}
            />
            <HashGeneratorPage />
        </>
    )
}
