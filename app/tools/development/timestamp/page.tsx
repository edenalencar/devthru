import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { TimestampConverterPage } from "./client"

const title = "Conversor de Timestamp Online - Unix para Data e Vice-Versa"
const description = "Converta timestamps Unix (segundos/milissegundos) para datas legíveis e vice-versa. Ferramenta essencial para desenvolvedores."

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
                                    "name": "Desenvolvimento",
                                    "item": "https://devhubtools.com/tools/development"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Timestamp",
                                    "item": "https://devhubtools.com/tools/development/timestamp"
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
