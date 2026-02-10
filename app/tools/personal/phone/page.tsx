import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { PhoneGeneratorPage } from "./client"

const title = "Gerador de Telefone e Celular - Números Válidos com DDD"
const description = "Gere números de telefone fixo e celular brasileiros válidos com DDD para testes de software. Ferramenta flexível com opções de formatação para desenvolvedores."

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
                            "name": "Gerador de Telefone e Celular - Números Válidos com DDD",
                            "operatingSystem": "Web",
                            "applicationCategory": "PessoalApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere números de telefone fixo e celular brasileiros válidos com DDD para testes de software. Ferramenta flexível com opções de formatação para desenvolvedores."
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
                                    "name": "Telefone/Celular",
                                    "item": "https://devhubtools.com/tools/personal/phone"
                                }
                            ]
                        }
                    ]
                }}
            />
            <PhoneGeneratorPage />
        </>
    )
}
