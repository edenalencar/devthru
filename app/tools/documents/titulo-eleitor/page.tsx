import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { TituloEleitorPage } from "./client"

const title = "Gerador de Título de Eleitor Válido [Grátis Dev]"
const description = "Gere números de Título de Eleitor válidos em um clique para testes unitários de sistemas. Calcula perfeitamente os 12 dígitos, UFs e Zonas Eleitorais. Algoritmo OFICIAL."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Título de Eleitor Válido [Grátis Dev]",
    description: "Gere números de Título de Eleitor válidos em um clique para testes unitários. Calcula perfeitamente os 12 dígitos, UFs e Zonas pelo algoritmo oficial.",
    path: "/tools/documents/titulo-eleitor",
    keywords: ["gerador titulo de eleitor", "titulo eleitor valido", "gerar titulo eleitor", "testes de software", "titulo eleitor teste", "mock eleitoral", "desenvolvedores"]
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
                            "name": "Gerador de Título de Eleitor Válido - Completo",
                            "operatingSystem": "Web",
                            "applicationCategory": "DocumentosApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere e valide números de Título de Eleitor válidos por estado brasileiro. Ferramenta online gratuita para desenvolvedores, testes de software e homologação de sistemas."
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
                                    "name": "Título de Eleitor",
                                    "item": "https://www.devthru.com/tools/documents/titulo-eleitor"
                                }
                            ]
                        }
                    ]
                }}
            />
            <TituloEleitorPage />
        </>
    )
}
