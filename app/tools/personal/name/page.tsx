import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { NameGeneratorPage } from "./client"

const title = "Gerador de Nomes Brasileiros"
const description = "Gere nomes e sobrenomes brasileiros realistas de forma aleatória e em lote para simulações, preenchimento de cadastros e testes de bancos de dados."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/personal/name",
    keywords: ["gerador de nomes", "nomes aleatorios", "nomes brasileiros", "gerador de pessoas brasileiras", "gerador nomes masculinos femininos"]
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
                            "name": "Gerador de Nomes e Pessoas Brasileiras Aleatórios | DevThru",
                            "operatingSystem": "Web",
                            "applicationCategory": "PessoalApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Crie nomes e sobrenomes brasileiros aleatórios para testes e personagens. Ideal para gerar massa de dados para testes de software. Filtragem por gênero disponível."
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
                                    "name": "Gerador de Nomes",
                                    "item": "https://www.devthru.com/tools/personal/name"
                                }
                            ]
                        }
                    ]
                }}
            />
            <NameGeneratorPage />
        </>
    )
}
