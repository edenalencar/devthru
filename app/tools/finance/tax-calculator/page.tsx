import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { TaxCalculatorPage } from "./client"

const title = "Calculadora Simples Nacional 2025 - DAS e Alíquota Efetiva"
const description = "Calcule facilmente o DAS e a alíquota efetiva do Simples Nacional. Simulador atualizado para 2024/2025, ideal para planejamento tributário e financeiro preciso."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/finance/tax-calculator`,
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
                            "name": "Calculadora Simples Nacional 2025 - DAS e Alíquota Efetiva",
                            "operatingSystem": "Web",
                            "applicationCategory": "FinançasApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Calcule facilmente o DAS e a alíquota efetiva do Simples Nacional. Simulador atualizado para 2024/2025, ideal para planejamento tributário e financeiro preciso."
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
                                    "name": "Calculadora de Impostos",
                                    "item": "https://www.devthru.com/tools/finance/tax-calculator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <TaxCalculatorPage />
        </>
    )
}
