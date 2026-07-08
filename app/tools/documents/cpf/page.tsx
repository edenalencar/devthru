import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CPFGeneratorPage } from "./client"

const title = "Gerador e Validador de CPF Válido Online [Grátis]"
const description = "Gerador de CPF online gratuito. Gere e valide CPFs válidos em 1 clique para testes de software, QA e desenvolvimento com algoritmo oficial."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/cpf",
    keywords: ["gerador de cpf", "validador de cpf", "gerar cpf valido", "testar cpf", "gerador cpf", "cpf generator", "massa de dados", "dev tools"]
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
                            "name": "Gerador e Validador de CPF Válido Online - DevThru",
                            "operatingSystem": "Web",
                            "applicationCategory": "DeveloperApplication",
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
                            "description": "Gere e valide CPFs válidos em 1 clique para testes de software. Ferramenta online gratuita para desenvolvedores e analistas de QA com algoritmo oficial."
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
                                    "name": "Documentos",
                                    "item": "https://www.devthru.com/tools/documents"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "CPF",
                                    "item": "https://www.devthru.com/tools/documents/cpf"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CPFGeneratorPage />
        </>
    )
}
