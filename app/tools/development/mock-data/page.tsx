import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { MockDataGeneratorPage } from "./client"

const title = "Gerador de Dados Mock (Fictícios)"
const description = "Gere dados fictícios (Mock Data) em JSON para testes e protótipos de software. Crie usuários, produtos, endereços e mais com esquemas personalizáveis gratuitamente."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Dados Mock (Fictícios) - Exportação JSON",
    description: "Gere dados fictícios (Mock Data) em JSON para testes e protótipos de software. Crie usuários, produtos e endereços com esquemas personalizáveis.",
    path: "/tools/development/mock-data",
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
                            "name": "Gerador de Dados Mock (Fictícios) - JSON",
                            "operatingSystem": "Web",
                            "applicationCategory": "DesenvolvimentoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.8",
                                "ratingCount": "120"
                            },
                            "description": "Gere dados fictícios (Mock Data) em JSON para testes e protótipos. Crie usuários, produtos e mais."
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
                                    "name": "Dados de Teste",
                                    "item": "https://www.devthru.com/tools/development/mock-data"
                                }
                            ]
                        }
                    ]
                }}
            />
            <MockDataGeneratorPage />
        </>
    )
}
