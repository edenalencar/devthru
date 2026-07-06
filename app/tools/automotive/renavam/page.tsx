import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { RenavamGeneratorPage } from "./client"

const title = "Gerador de Renavam Válido Online - Em Lote (Grátis)"
const description = "Gere números de Renavam válidos de 11 dígitos em lote ou único para testes de software automotivos. Ferramenta online gratuita para desenvolvedores e QAs."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/automotive/renavam",
    keywords: [
        "gerador de renavam",
        "gerador de renavam online",
        "gerador de renavam e placa",
        "gerador de renavam e chassi",
        "gerador de renavam para teste",
        "gerar renavam",
        "renavam válido",
        "número renavam",
        "gerador renavam grátis"
    ]
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
                            "name": "Gerador de RENAVAM Online Grátis - Código Válido para Testes",
                            "operatingSystem": "Web",
                            "applicationCategory": "DeveloperApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gerador de RENAVAM online e gratuito! Gere números de RENAVAM válidos (11 dígitos) para testes de sistemas automotivos. Rápido, seguro e sem cadastro."
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
                                    "name": "Renavam",
                                    "item": "https://www.devthru.com/tools/automotive/renavam"
                                }
                            ]
                        }
                    ]
                }}
            />
            <RenavamGeneratorPage />
        </>
    )
}
