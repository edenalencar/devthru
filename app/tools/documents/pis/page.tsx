import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { PISPage } from './client'
import { generateToolMetadata } from "@/lib/seo-config"

const title = 'Gerador de PIS Válido Online - Em Lote e Sem Anúncios'
const description = 'Gere números de PIS/PASEP e NIS válidos em lote para ambiente de testes de software. Interface rápida, exemplos de código em várias linguagens e sem anúncios.'

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/pis",
    keywords: ["gerador de pis", "gerador pis válido", "pis pasep", "gerador de nis", "gerador de nit", "gerar pis aleatorio", "numero pis online", "gerar pis falso", "pis para testes", "validar pis", "dev tools"]
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
