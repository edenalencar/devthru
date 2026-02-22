import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { MinifierPage } from "./client"

const title = "Minificador de Código - CSS, JSON, SQL, HTML e JS"
const description = "Minifique e formate (beautify) códigos CSS, JSON, SQL, HTML e JavaScript online. Reduza o tamanho dos arquivos e melhore a performance do seu site gratuitamente."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/development/minifier`,
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
                                    "name": "Minificador",
                                    "item": "https://www.devthru.com/tools/development/minifier"
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
