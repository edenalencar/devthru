import { Metadata } from "next"
import { NfeGeneratorPage } from "./client"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = {
    title: "Gerador de Chave NF-e - Nota Fiscal Eletrônica",
    description: "Gere chaves de acesso de Nota Fiscal Eletrônica (NF-e) e NFC-e válidas para testes de integração.",
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
                            "name": "Gerador de Chave NF-e",
                            "operatingSystem": "Web",
                            "applicationCategory": "BusinessApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Ferramenta online gratuita para gerar chaves de acesso de Nota Fiscal Eletrônica (NF-e) e NFC-e válidas para testes de software e homologação."
                        },
                        {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://devthru.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Ferramentas Fiscais",
                                    "item": "https://devthru.com/ferramentas-fiscais"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Gerador NF-e",
                                    "item": "https://devthru.com/tools/business/nfe-generator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <NfeGeneratorPage />
        </>
    )
}
