import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { LGPDDataPage } from "./client"

const title = "Gerador de Dados Fictícios e Anonimizador para LGPD"
const description = "Gere dados pessoais fictícios e anonimize textos com informações sensíveis para conformidade com a LGPD. Ferramenta essencial para testes seguros e proteção de dados."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/personal/lgpd-data`,
    },
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
                                    "name": "Pessoal",
                                    "item": "https://www.devthru.com/tools/personal"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Dados LGPD",
                                    "item": "https://www.devthru.com/tools/personal/lgpd-data"
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
