import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { MockDataGeneratorPage } from "./client"

const title = "Gerador de Dados Mock (Fictícios) - JSON"
const description = "Gere dados fictícios (Mock Data) em JSON para testes e protótipos. Crie usuários, produtos e mais."

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
                            "name": "Gerador de Dados Mock (Fictícios) - JSON",
                            "operatingSystem": "Web",
                            "applicationCategory": "DesenvolvimentoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere dados fictícios (Mock Data) em JSON para testes e protótipos. Crie usuários, produtos e mais."
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
                                    "name": "Desenvolvimento",
                                    "item": "https://devhubtools.com/tools/development"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Dados de Teste",
                                    "item": "https://devhubtools.com/tools/development/mock-data"
                                }
                            ]
                        }
                    ]
                }}
            />
            <MockDataGeneratorPage />
        </>
    )
}
