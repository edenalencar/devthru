import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { LicensePlatePage } from "./client"

const title = "Gerador de Placa Mercosul"
const description = "Gere placas de veículos nos padrões Mercosul e Antigo em lote. Ferramenta gratuita para testes de software, simulação de dados e homologação de APIs."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/automotive/license-plate",
    keywords: ["gerador de placa", "gerador de placa de carro", "gerador de placa mercosul", "gerar placa de carro", "gerador de placa de moto", "placa mercosul teste", "massa de dados veiculos", "dev tools"]
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
                            "name": "Gerador de Placas - Mercosul e Antiga",
                            "operatingSystem": "Web",
                            "applicationCategory": "AutomotivoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.8",
                                "ratingCount": "120"
                            },
                            "description": "Gere placas de veículos nos padrões Mercosul e Antigo (Cinza) ou converta entre os modelos."
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
                                    "name": "Automotivo",
                                    "item": "https://www.devthru.com/tools/automotive"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Placa",
                                    "item": "https://www.devthru.com/tools/automotive/license-plate"
                                }
                            ]
                        }
                    ]
                }}
            />
            <LicensePlatePage />
        </>
    )
}
