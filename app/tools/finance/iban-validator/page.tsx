import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { IBANValidatorPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Validador e Gerador de IBAN Online - Verifique Contas Globais"
const description = "Gere e valide códigos IBAN (International Bank Account Number) com cálculo matemático do dígito verificador (Mod 97) para o Brasil e outros países."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/iban-validator",
    keywords: ["validador de iban", "gerador de iban", "validar iban brasil", "iban validator", "digito verificador iban"]
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
