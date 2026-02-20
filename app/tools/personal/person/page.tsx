import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { PersonGeneratorPage } from "./client"

const title = "Gerador de Pessoa Completa - Dados Aleatórios para Teste"
const description = "Gere perfis de teste realistas com o Gerador de Pessoa Completa. Crie nomes, CPFs, RGs, endereços e e-mails fictícios para acelerar o desenvolvimento de software."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/personal/person`,
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
                            "name": "Gerador de Pessoa Completa - Dados Aleatórios para Teste",
                            "operatingSystem": "Web",
                            "applicationCategory": "PessoalApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere perfis de teste realistas com o Gerador de Pessoa Completa. Crie nomes, CPFs, RGs, endereços e e-mails fictícios para acelerar o desenvolvimento de software."
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
                                    "name": "Pessoa Completa",
                                    "item": "https://www.devthru.com/tools/personal/person"
                                }
                            ]
                        }
                    ]
                }}
            />
            <PersonGeneratorPage />
        </>
    )
}
