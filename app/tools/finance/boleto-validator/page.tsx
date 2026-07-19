import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { BoletoValidatorPage } from "./client"

const title = "Validador de Boleto Bancário"
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
                data={getToolSchemaGraph({
                    name: "Validador de Boleto Bancário",
                    description: "Valide e decodifique linhas digitáveis ou códigos de barras de boletos de cobrança e concessionárias online. Descubra o banco emissor, valor, data de vencimento e se o boleto é matematicamente autêntico.",
                    categoryLabel: "Finanças",
                    path: "/tools/finance/boleto-validator",
                    toolSlug: "boleto-validator"
                })}
            />
            <BoletoValidatorPage />
        </>
    )
}
