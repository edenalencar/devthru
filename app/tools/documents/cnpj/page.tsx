import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CNPJGeneratorPage } from "./client"

const title = "Gerador de CNPJ Válido Online - Tradicional e Alfanumérico"
const description = "Gere e valide CNPJs tradicionais e alfanuméricos válidos em lote ou individualmente para testes. Veja também exemplos de código em Java, Python, C# e JS."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/cnpj",
    keywords: [
        "gerador de cnpj",
        "validador de cnpj",
        "gerador cnpj",
        "cnpj alfanumerico",
        "gerador de cnpj online",
        "cnpj valido",
        "dev tools",
        "testes de software",
        "gerador de cnpj para testes",
        "gerador de cnpj para teste",
        "gerador de cnpj válido para teste",
        "gerador de cnpj e cpf",
        "gerador de cpf cnpj",
        "gerador de cnpj aleatório",
        "gerador de cnpj ativo",
        "gerador de cnpj completo",
        "gerador de cnpj filial",
        "gerador de cnpj invalido",
        "gerador de cnpj e inscrição estadual",
        "gerador de cnpj mei",
        "gerador de cnpj matriz e filial"
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
                            "name": "Gerador e Validador de CNPJ Válido Online - DevThru",
                            "operatingSystem": "Web",
                            "applicationCategory": "DeveloperApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere e valide CNPJs numéricos e alfanuméricos válidos em 1 clique para testes de software com algoritmo oficial."
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
                                    "name": "Documentos",
                                    "item": "https://www.devthru.com/tools/documents"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "CNPJ",
                                    "item": "https://www.devthru.com/tools/documents/cnpj"
                                }
                            ]
                        }
                    ]
                }}
            />
            <CNPJGeneratorPage />
        </>
    )
}
