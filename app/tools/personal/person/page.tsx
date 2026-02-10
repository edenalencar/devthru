import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { PersonGeneratorPage } from "./client"

const title = "Gerador de Pessoa Completa - Dados Aleatórios para Teste"
const description = "Gere perfis de teste realistas com o Gerador de Pessoa Completa. Crie nomes, CPFs, RGs, endereços e e-mails fictícios para acelerar o desenvolvimento de software."

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
                                    "name": "Pessoa Completa",
                                    "item": "https://devhubtools.com/tools/personal/person"
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
