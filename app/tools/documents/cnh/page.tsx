import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { CNHGeneratorPage } from "./client"

const title = "Gerador de CNH - Carteira de Motorista Válida"
const description = "Gere números de CNH (Carteira Nacional de Habilitação) válidos para testes. Suporte a geração em massa."

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
                            "name": "Gerador de CNH - Carteira de Motorista Válida",
                            "operatingSystem": "Web",
                            "applicationCategory": "DocumentosApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere números de CNH (Carteira Nacional de Habilitação) válidos para testes. Suporte a geração em massa."
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
                                    "name": "CNH",
                                    "item": "https://devhubtools.com/tools/documents/cnh"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CNHGeneratorPage />
        </>
    )
}
