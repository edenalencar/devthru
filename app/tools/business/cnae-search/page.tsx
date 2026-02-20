import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { CnaeSearchPage } from "./client"

export const metadata: Metadata = {
    title: "Busca de CNAE - Classificação Nacional de Atividades",
    description: "Pesquise códigos e descrições da Classificação Nacional de Atividades Econômicas (CNAE) atualizados via IBGE.",
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
                            "name": "Busca de CNAE - Classificação Nacional de Atividades",
                            "operatingSystem": "Web",
                            "applicationCategory": "BusinessApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Pesquise códigos e descrições da Classificação Nacional de Atividades Econômicas (CNAE) atualizados via IBGE."
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
