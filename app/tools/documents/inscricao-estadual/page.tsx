import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { InscricaoEstadualPage } from './client'
import { generateToolMetadata } from "@/lib/seo-config"

const title = 'Gerador de Inscrição Estadual'
const description = 'Gere e valide Inscrição Estadual (IE) de todos os 27 estados do Brasil em 1 clique. Ferramenta online grátis para testes de software e emissão de notas fiscais.'

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/inscricao-estadual",
    keywords: ["inscricao estadual", "validador ie", "gerador ie", "consultar ie", "sintegra", "cadastro contribuinte", "testes de software", "validate_docbr", "desenvolvedores"]
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
                            "name": "Inscrição Estadual",
                            "operatingSystem": "Web",
                            "applicationCategory": "DocumentosApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Ferramenta Inscrição Estadual"
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
                                    "name": "Inscrição Estadual",
                                    "item": "https://www.devthru.com/tools/documents/inscricao-estadual"
                                }
                            ]
                        }
                    ]
                }}
            />
            <InscricaoEstadualPage />
        </>
    )
}
