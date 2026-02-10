import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { ContractGeneratorPage } from "./client"

const title = "Gerador de Contratos Online - Modelos Editáveis em PDF"
const description = "Crie contratos personalizados em minutos com nossos modelos editáveis. Ideal para prestação de serviços e locação. Gere documentos profissionais em PDF ou texto."

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
                                    "name": "Contratos",
                                    "item": "https://devhubtools.com/tools/documents/contract-generator"
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
