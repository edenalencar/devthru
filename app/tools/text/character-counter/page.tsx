import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { CharacterCounterPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Contador de Caracteres, Palavras e Linhas Online Grátis"
const description = "Conte caracteres, palavras, linhas e parágrafos do seu texto em tempo real. Ferramenta online gratuita ideal para redatores, estudantes e profissionais de SEO."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/text/character-counter",
    keywords: ["contador caracteres", "contador palavras", "analise texto", "seo tools"]
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
                            "name": "Contador de Caracteres, Palavras e Linhas Online Grátis",
                            "operatingSystem": "Web",
                            "applicationCategory": "TextoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Conte caracteres, palavras, linhas e parágrafos do seu texto em tempo real. Ferramenta online gratuita ideal para redatores, estudantes e profissionais de SEO."
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
                                    "name": "Texto",
                                    "item": "https://www.devthru.com/tools/text"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Contador de Caracteres",
                                    "item": "https://www.devthru.com/tools/text/character-counter"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CharacterCounterPage />
        </>
    )
}
