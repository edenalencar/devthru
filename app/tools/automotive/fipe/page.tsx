import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { FipePage } from "./client"

const title = "Tabela FIPE Atualizada - Consulta de Preço de Veículos Grátis"
const description = "Consulte a Tabela FIPE atualizada com preços médios de carros, motos e caminhões no mercado brasileiro. Pesquise por marca, modelo e ano de fabricação gratuitamente."

export const metadata: Metadata = generateToolMetadata({
    title: "Tabela FIPE Atualizada - Consulte o Preço de Veículos",
    description: "Consulte a Tabela FIPE com preços médios de carros, motos e caminhões no mercado brasileiro. Pesquise por marca, modelo e ano de fabricação grátis.",
    path: "/tools/automotive/fipe",
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
                            "name": "Tabela FIPE - Consulta Grátis",
                            "operatingSystem": "Web",
                            "applicationCategory": "AutomotivoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Consulte a Tabela FIPE atualizada com preços médios de carros, motos e caminhões no mercado brasileiro. Pesquise por marca, modelo e ano de fabricação gratuitamente.",
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
                                    "name": "Automotivo",
                                    "item": "https://www.devthru.com/tools/automotive"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Tabela FIPE",
                                    "item": "https://www.devthru.com/tools/automotive/fipe"
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
