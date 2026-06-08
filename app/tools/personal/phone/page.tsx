import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { PhoneGeneratorPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Gerador de Telefone e Celular Online - Números Válidos com DDD"
const description = "Gere números de telefone celular e fixo brasileiros válidos com DDD de todos os estados para testes de softwares. Obtenha números limpos ou formatados em lote."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/personal/phone",
    keywords: ["gerador de telefone", "gerador de celular", "gerador telefone com ddd", "gerar celular fake", "numeros de telefone para teste"]
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
                                    "name": "Telefone/Celular",
                                    "item": "https://www.devthru.com/tools/personal/phone"
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
