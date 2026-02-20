import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { CNPJGeneratorPage } from "./client"

const title = "Gerador e Validador de CNPJ Válido Online | DevThru"
const description = "Gere e valide números de CNPJ para testes de software. Sistema completo para desenvolvedores e QA com suporte a CNPJ alfanumérico."

export const metadata: Metadata = {
    title,
    description,
    keywords: ["gerador de cnpj", "validador de cnpj", "testes de software", "gerador cnpj", "qa", "massa de dados"],
    alternates: {
        canonical: `${siteConfig.url}/tools/documents/cnpj`,
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
                            "name": "Gerador e Validador de CNPJ Válido Online | DevThru",
                            "operatingSystem": "Web",
                            "applicationCategory": "DocumentosApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere e valide números de CNPJ para testes de software. Sistema completo para desenvolvedores e QA com suporte a CNPJ alfanumérico."
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
                                    "name": "CNPJ",
                                    "item": "https://www.devthru.com/tools/documents/cnpj"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CNPJGeneratorPage />
        </>
    )
}
