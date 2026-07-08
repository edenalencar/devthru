import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CnaeSearchPage } from "./client"

export const metadata: Metadata = generateToolMetadata({
    title: "Busca de CNAE Completa",
    description: "Pesquise códigos e descrições da Classificação Nacional de Atividades Econômicas (CNAE/IBGE). Consulta gratuita com filtros por seção, divisão e classe.",
    path: "/tools/business/cnae-search",
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
                            "name": "Busca de CNAE Completa",
                            "operatingSystem": "Web",
                            "applicationCategory": "BusinessApplication",
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
                            "description": "Pesquise códigos e descrições da Classificação Nacional de Atividades Econômicas (CNAE) atualizados via IBGE. Consulta gratuita com filtros por seção, divisão e classe.",
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
                                    "name": "Negócios",
                                    "item": "https://www.devthru.com/tools/business"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Busca de CNAE",
                                    "item": "https://www.devthru.com/tools/business/cnae-search"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CnaeSearchPage />
        </>
    )
}
