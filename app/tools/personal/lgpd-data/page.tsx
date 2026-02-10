import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { LGPDDataPage } from "./client"

const title = "Gerador de Dados Fictícios e Anonimizador para LGPD"
const description = "Ferramentas para gerar dados pessoais fictícios e anonimizar textos com dados sensíveis para conformidade LGPD."

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
                            "name": "Gerador de Dados Fictícios e Anonimizador para LGPD",
                            "operatingSystem": "Web",
                            "applicationCategory": "PessoalApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Ferramentas para gerar dados pessoais fictícios e anonimizar textos com dados sensíveis para conformidade LGPD."
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
                                    "name": "Pessoal",
                                    "item": "https://devhubtools.com/tools/personal"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Dados LGPD",
                                    "item": "https://devhubtools.com/tools/personal/lgpd-data"
                                }
                            ]
                        }
                    ]
                }}
            />
            <LGPDDataPage />
        </>
    )
}
