import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { TimestampConverterPage } from "./client"

const title = "Conversor de Timestamp Online - Unix para Data e Vice-Versa"
const description = "Converta timestamps Unix (segundos/milissegundos) para datas legíveis e vice-versa. Ferramenta online essencial para desenvolvedores, com suporte a múltiplos formatos."

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de Timestamp Online - Unix para Data e Vice-Versa",
    description: "Converta timestamps Unix (segundos ou milissegundos) para datas legíveis e vice-versa. Ferramenta online gratuita para devs, com múltiplos formatos.",
    path: "/tools/development/timestamp",
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
                            "name": "Conversor de Timestamp Online - Unix para Data e Vice-Versa",
                            "operatingSystem": "Web",
                            "applicationCategory": "DesenvolvimentoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Converta timestamps Unix (segundos/milissegundos) para datas legíveis e vice-versa. Ferramenta essencial para desenvolvedores."
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
                                    "name": "Desenvolvimento",
                                    "item": "https://www.devthru.com/tools/development"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Timestamp",
                                    "item": "https://www.devthru.com/tools/development/timestamp"
                                }
                            ]
                        }
                    ]
                }}
            />
            <TimestampConverterPage />
        </>
    )
}
