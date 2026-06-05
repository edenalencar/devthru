import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { LicensePlatePage } from "./client"

const title = "Gerador de Placa de Carro Online - Mercosul e Antiga [Grátis]"
const description = "Gere placas de carro e veículos nos padrões Mercosul e Antigo (Cinza) para testes de sistemas. Ferramenta online gratuita de geração e conversão de placas."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Placa de Carro Online - Mercosul e Antiga [Grátis]",
    description: "Gere placas de carro e veículos nos padrões Mercosul e Antigo (Cinza) para testes de sistemas. Ferramenta online gratuita de geração e conversão de placas.",
    path: "/tools/automotive/license-plate",
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
