import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { NameGeneratorPage } from "./client"

const title = "Gerador de Nomes e Pessoas Brasileiras Aleatórios | DevThru"
const description = "Crie nomes e sobrenomes brasileiros aleatórios para testes e personagens. Ideal para gerar massa de dados para testes de software. Filtragem por gênero disponível."

export const metadata: Metadata = {
    title,
    description,
    keywords: ["gerador de nomes", "gerador de nome", "gerador de pessoas", "nomes aleatorios", "massa de dados"],
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
                                    "name": "Gerador de Nomes",
                                    "item": "https://devhubtools.com/tools/personal/name"
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
