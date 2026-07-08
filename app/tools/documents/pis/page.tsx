import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { PISPage } from './client'
import { generateToolMetadata } from "@/lib/seo-config"

const title = 'Gerador de PIS Válido Online'
const description = "Gerador de PIS online gratuito. Gere números de PIS/PASEP e NIS válidos em lote ou individualmente para testes de software com nosso algoritmo oficial."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/pis",
    keywords: [
        "gerador de pis", 
        "gerador de pis online", 
        "gerador de pis válido", 
        "gerador de pis pasep", 
        "gerador de numero pis", 
        "gerador de pis ficticio", 
        "gerador de pis para teste", 
        "gerador de nis", 
        "gerador de nit", 
        "gerar pis aleatorio", 
        "numero pis online", 
        "gerar pis falso", 
        "pis para testes", 
        "validar pis", 
        "dev tools"
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
                            "name": "Gerador de PIS/PASEP e NIS/NIT Online Grátis - DevThru",
                            "operatingSystem": "Web",
                            "applicationCategory": "DeveloperApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere e valide números de PIS, PASEP, NIS e NIT válidos matematicamente em 1 clique para testes de software, QA e automação de sistemas."
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
                                    "name": "PIS/PASEP",
                                    "item": "https://www.devthru.com/tools/documents/pis"
                                }
                            ]
                        }
                    ]
                }}
            />
            <PISPage />
        </>
    )
}
