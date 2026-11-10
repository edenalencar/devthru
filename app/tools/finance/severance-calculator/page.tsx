import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-config"

import { SeveranceCalculatorPage } from "./client"

const title = "Calculadora de Rescisão Trabalhista CLT"
const description = "Calcule a rescisão: saldo de salário, aviso prévio, 13º, férias com 1/3 e multa do FGTS, para demissão sem justa causa, pedido de demissão, acordo ou justa causa."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/severance-calculator",
    keywords: ["calculadora de rescisão", "cálculo de rescisão", "calcular rescisão", "rescisão trabalhista", "aviso prévio", "multa do fgts", "férias proporcionais"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Calculadora de Rescisão",
                    description,
                    categoryLabel: "Dados Financeiros",
                    path: "/tools/finance/severance-calculator",
                    toolSlug: "severance-calculator"
                })}
            />
            <SeveranceCalculatorPage />
        </>
    )
}
