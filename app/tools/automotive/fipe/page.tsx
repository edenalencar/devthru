import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { FipePage } from "./client"

const title = "Tabela FIPE - Consulta Grátis"
const description = "Consulte a Tabela FIPE atualizada. Veja preços médios de carros, motos e caminhões no mercado brasileiro."

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
                            "name": "Tabela FIPE - Consulta Grátis",
                            "operatingSystem": "Web",
                            "applicationCategory": "AutomotivoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Consulte a Tabela FIPE atualizada. Veja preços médios de carros, motos e caminhões no mercado brasileiro."
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
                                    "name": "Automotivo",
                                    "item": "https://devhubtools.com/tools/automotive"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Tabela FIPE",
                                    "item": "https://devhubtools.com/tools/automotive/fipe"
                                }
                            ]
                        }
                    ]
                }}
            />
            <FipePage />
        </>
    )
}
