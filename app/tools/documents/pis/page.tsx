import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { PISPage } from './client'
import { generateToolMetadata } from "@/lib/seo-config"

const title = 'Gerador de PIS/PASEP Online - Gerar e Validar PIS Grátis'
const description = 'Ferramenta online gratuita para gerar e validar números de PIS/PASEP válidos para testes. Ideal para desenvolvedores e analistas de QA.'

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/pis",
    keywords: ["gerador pis", "validador pis", "pis pasep", "numero pis", "dev tools"]
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
                            "name": "PIS/PASEP",
                            "operatingSystem": "Web",
                            "applicationCategory": "DocumentosApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Ferramenta PIS/PASEP"
                        },
                        {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://devhubtools.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Ferramentas",
                                    "item": "https://devhubtools.com/ferramentas"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Documentos",
                                    "item": "https://devhubtools.com/tools/documents"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "PIS/PASEP",
                                    "item": "https://devhubtools.com/tools/documents/pis"
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
