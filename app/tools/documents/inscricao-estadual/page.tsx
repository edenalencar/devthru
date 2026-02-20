import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { InscricaoEstadualPage } from './client'
import { generateToolMetadata } from "@/lib/seo-config"

const title = 'Gerador de Inscrição Estadual (IE) - Validador Online Grátis'
const description = 'Gere e valide Inscrição Estadual (IE) de todos os estados do Brasil (SP, RJ, MG, RS, etc). Ferramenta essencial para testes fiscais e tributários.'

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/inscricao-estadual",
    keywords: ["inscricao estadual", "consultar ie", "validador ie", "sintegra", "cadastro contribuinte"]
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
