import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { EmailGeneratorPage } from "./client"

const title = "Gerador de E-mail Temporário"
const description = "Crie e copie endereços de e-mail fictícios e temporários instantaneamente de forma individual ou em massa. Suporte a domínios comuns ou personalizados para testes."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/personal/email",
    keywords: ["gerador de email", "email temporario", "email fake", "gerar email de teste", "criar email temporario"]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "SoftwareApplication",
                            "name": "Gerador de Email Temporário e Fictício | DevThru",
                            "operatingSystem": "Web",
                            "applicationCategory": "PessoalApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Crie emails fictícios com domínios personalizados ou comuns para testes de software. Ferramenta rápida para QA e desenvolvimento."
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
                                    "name": "Gerador de Email",
                                    "item": "https://www.devthru.com/tools/personal/email"
                                }
                            ]
                        }
                    ]
                }}
            />
            <EmailGeneratorPage />
        </>
    )
}
