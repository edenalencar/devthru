import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { CPFGeneratorPage } from "./client"

const title = "Gerador de CPF Válido Online | DevThru"
const description = "Gere números de CPF válidos para testes de software com nosso Gerador de CPF. Ferramenta rápida, gratuita e essencial para desenvolvedores e testes de QA."

export const metadata: Metadata = {
    title,
    description,
    keywords: ["gerador de cpf", "cpf valido", "testar cpf", "gerador cpf", "cpf generator", "massa de dados"],
    alternates: {
        canonical: `${siteConfig.url}/tools/documents/cpf`,
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
                            "name": "Gerador de CPF Válido Online | DevThru",
                            "operatingSystem": "Web",
                            "applicationCategory": "DocumentosApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere números de CPF válidos para testes de software com nosso Gerador de CPF. Ferramenta rápida, gratuita e essencial para desenvolvedores e testes de QA."
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
                                    "name": "CPF",
                                    "item": "https://www.devthru.com/tools/documents/cpf"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CPFGeneratorPage />
        </>
    )
}
