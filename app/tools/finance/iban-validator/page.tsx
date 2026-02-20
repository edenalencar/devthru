import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { IBANValidatorPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Gerador e Validador de IBAN Online - Brasil e Internacional"
const description = "Gere e valide códigos IBAN para transações internacionais com precisão. Suporte a diversos países, essencial para testar integrações bancárias globais."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/iban-validator",
    keywords: ["iban generator", "iban validator", "codigo iban", "transalia internacional", "swift code"]
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
                            "name": "Gerador e Validador de IBAN Online - Brasil e Internacional",
                            "operatingSystem": "Web",
                            "applicationCategory": "FinançasApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere e valide códigos IBAN para transações internacionais com precisão. Suporte a diversos países, essencial para testar integrações bancárias globais."
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
                                    "name": "Validador IBAN",
                                    "item": "https://www.devthru.com/tools/finance/iban-validator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <IBANValidatorPage />
        </>
    )
}
