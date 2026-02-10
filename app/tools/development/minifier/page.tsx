import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { MinifierPage } from "./client"

const title = "Minificador de Código - CSS, JSON, SQL, HTML e JS"
const description = "Minifique e formate (beautify) seus códigos CSS, JSON, SQL e HTML online para melhorar a performance."

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
                            "name": "Minificador de Código - CSS, JSON, SQL, HTML e JS",
                            "operatingSystem": "Web",
                            "applicationCategory": "DesenvolvimentoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Minifique e formate (beautify) seus códigos CSS, JSON, SQL e HTML online para melhorar a performance."
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
                                    "name": "Minificador",
                                    "item": "https://devhubtools.com/tools/development/minifier"
                                }
                            ]
                        }
                    ]
                }}
            />
            <MinifierPage />
        </>
    )
}
