import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { TituloEleitorPage } from "./client"

const title = "Gerador de Título de Eleitor Válido - Completo"
const description = "Gere e valide números de Título de Eleitor válidos por estado. Ferramenta para desenvolvedores e testes de software."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
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
                            "name": "Gerador de Título de Eleitor Válido - Completo",
                            "operatingSystem": "Web",
                            "applicationCategory": "DocumentosApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere e valide números de Título de Eleitor válidos por estado. Ferramenta para desenvolvedores e testes de software."
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
                                    "name": "Título de Eleitor",
                                    "item": "https://devhubtools.com/tools/documents/titulo-eleitor"
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
