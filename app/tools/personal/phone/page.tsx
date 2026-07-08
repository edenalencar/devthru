import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { PhoneGeneratorPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Gerador de Telefone Online"
const description = "Gere números de telefone celular e fixo válidos do Brasil (com DDD) e dos Estados Unidos (EUA) para testes de software. Obtenha números limpos ou formatados."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/personal/phone",
    keywords: [
        "gerador de telefone celular",
        "gerador de telefone fixo",
        "gerador de telefone com sms",
        "gerador de celular com sms",
        "gerador de numero de celular brasil",
        "gerador de telefone estados unidos",
        "gerador de telefone eua",
        "gerador de celular temporario",
        "gerador de telefone valido",
        "gerador de celular aleatorio",
        "gerar celular fake",
        "numeros de telefone para teste"
    ]
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
