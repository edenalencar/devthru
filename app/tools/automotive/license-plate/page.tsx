import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { LicensePlatePage } from "./client"

const title = "Gerador de Placas - Mercosul e Antiga"
const description = "Gere placas de veículos nos padrões Mercosul e Antigo (Cinza) ou converta entre os modelos."

export const metadata: Metadata = {
    title,
    description,
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
                                    "name": "Automotivo",
                                    "item": "https://devhubtools.com/tools/automotive"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Placa",
                                    "item": "https://devhubtools.com/tools/automotive/license-plate"
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
