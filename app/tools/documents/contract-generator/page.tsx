import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { ContractGeneratorPage } from "./client"

const title = "Gerador de Contratos Online - Modelos Editáveis em PDF"
const description = "Crie contratos personalizados em minutos com nossos modelos editáveis. Ideal para prestação de serviços e locação. Gere documentos profissionais em PDF ou texto."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/documents/contract-generator`,
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
                            "name": "Gerador de Contratos Online - Modelos Editáveis em PDF",
                            "operatingSystem": "Web",
                            "applicationCategory": "DocumentosApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Crie contratos personalizados em minutos com nossos modelos editáveis. Ideal para prestação de serviços e locação. Gere documentos profissionais em PDF ou texto."
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
                                    "name": "Contratos",
                                    "item": "https://www.devthru.com/tools/documents/contract-generator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <ContractGeneratorPage />
        </>
    )
}
