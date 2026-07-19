import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { IBANValidatorPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Validador e Gerador de IBAN"
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
                data={getToolSchemaGraph({
                    name: "Validador e Gerador de IBAN",
                    description: "Gere e valide códigos IBAN (International Bank Account Number) com cálculo matemático do dígito verificador (Mod 97) para o Brasil e outros países.",
                    categoryLabel: "Finanças",
                    path: "/tools/finance/iban-validator",
                    toolSlug: "iban-validator"
                })}
            />
            <IBANValidatorPage />
        </>
    )
}
