import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { UUIDGeneratorPage } from "./client"

const title = "Gerador de UUID v4 Online"
const description = "Gere UUIDs (v4) únicos e seguros aleatoriamente para seus projetos e bancos de dados. Identificadores universais prontos para uso em desenvolvimento de software."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de UUID v4 e v7 Online - Rápido e em Lote (100% Privado)",
    description: "Gere UUIDs versão 4 (aleatório) e versão 7 (ordenável no tempo) individuais ou em massa. Copie em um clique para seus projetos. Rápido, seguro e livre de anúncios.",
    path: "/tools/utilities/uuid",
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
                            "name": "Gerador de UUID v4 Online",
                            "operatingSystem": "Web",
                            "applicationCategory": "UtilidadesApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere UUIDs (v4) únicos e seguros aleatoriamente para seus projetos e bancos de dados. Identificadores universais prontos para uso em desenvolvimento de software."
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
                                    "name": "Utilidades",
                                    "item": "https://www.devthru.com/tools/utilities"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Gerador de UUID",
                                    "item": "https://www.devthru.com/tools/utilities/uuid"
                                }
                            ]
                        }
                    ]
                }}
            />
            <UUIDGeneratorPage />
        </>
    )
}
