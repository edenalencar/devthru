import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { BoletoValidatorPage } from "./client"

const title = "Validador de Boleto Bancário Online - Linha Digitável e Emissor"
const description = "Valide e decodifique linhas digitáveis ou códigos de barras de boletos de cobrança e concessionárias online. Descubra o banco emissor, valor, data de vencimento e se o boleto é matematicamente autêntico."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/boleto-validator",
    keywords: [
        "validador de boleto",
        "validar linha digitavel",
        "decodificador de boleto",
        "consultar emissor boleto",
        "calcular vencimento boleto",
        "detectar boleto falso",
        "validar boleto online"
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
                            "name": "Validador e Decodificador de Boleto Bancário Online - DevThru",
                            "operatingSystem": "Web",
                            "applicationCategory": "FinanceApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Validador e decodificador matemático de boleto bancário. Analise linhas digitáveis e códigos de barras para extrair banco emissor, data de vencimento, valor e status de autenticidade."
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
                                    "name": "Validador de Boleto",
                                    "item": "https://www.devthru.com/tools/finance/boleto-validator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <BoletoValidatorPage />
        </>
    )
}
