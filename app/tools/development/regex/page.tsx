import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { RegexGeneratorPage } from "./client"

const title = "Gerador e Testador de Regex - Validar Expressões Regulares"
const description = "Crie, teste e valide expressões regulares (Regex) em tempo real com nossa ferramenta online. Suporte completo a flags e exemplos práticos para desenvolvedores."

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
                            "name": "Gerador e Testador de Regex - Validar Expressões Regulares",
                            "operatingSystem": "Web",
                            "applicationCategory": "DesenvolvimentoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Crie, teste e valide expressões regulares (Regex) em tempo real com nossa ferramenta online. Suporte completo a flags e exemplos práticos para desenvolvedores."
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
                                    "name": "Regex",
                                    "item": "https://devhubtools.com/tools/development/regex"
                                }
                            ]
                        }
                    ]
                }}
            />
            <RegexGeneratorPage />
        </>
    )
}
