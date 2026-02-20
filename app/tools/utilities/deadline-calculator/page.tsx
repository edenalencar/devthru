import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { DeadlineCalculatorPage } from "./client"

const title = "Calculadora de Prazos Online - Dias Úteis e Corridos"
const description = "Calcule prazos com precisão considerando feriados nacionais e fins de semana. Ferramenta essencial para advogados, gerenciamento de projetos e planejamento."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/utilities/deadline-calculator`,
    },
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
                            "name": "Calculadora de Prazos Online - Dias Úteis e Corridos",
                            "operatingSystem": "Web",
                            "applicationCategory": "UtilidadesApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Calcule prazos com precisão considerando feriados nacionais e fins de semana. Ferramenta essencial para advogados, gerenciamento de projetos e planejamento."
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
                                    "name": "Utilidades",
                                    "item": "https://www.devthru.com/tools/utilities"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Calculadora de Prazo",
                                    "item": "https://www.devthru.com/tools/utilities/deadline-calculator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <DeadlineCalculatorPage />
        </>
    )
}
