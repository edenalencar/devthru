import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { BoletoGeneratorPage } from "./client"

const title = "Gerador de Boleto Bancário Online - Linha Digitável e PDF para Teste"
const description = "Gere boletos bancários fictícios em PDF com linha digitável e código de barras para testes de integração de sistemas e homologação financeira de forma segura."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/boleto-generator",
    keywords: ["gerador de boleto", "gerador de boleto falso", "boleto ficticio para teste", "simular boleto bancario", "gerar boleto pdf teste"]
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
                            "name": "Gerador de Boleto Bancário Mock - Visualização para Testes",
                            "operatingSystem": "Web",
                            "applicationCategory": "FinançasApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gerador de Boleto Bancário Mock para testes de software. Crie boletos fictícios com código de barras validável e PDF para homologar seu sistema de pagamentos de forma segura."
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
                                    "name": "Finanças",
                                    "item": "https://www.devthru.com/tools/finance"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Gerador de Boleto",
                                    "item": "https://www.devthru.com/tools/finance/boleto-generator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <BoletoGeneratorPage />
        </>
    )
}
