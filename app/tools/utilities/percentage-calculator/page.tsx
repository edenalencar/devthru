import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-config"

import { PercentageCalculatorPage } from "./client"

const title = "Calculadora de Porcentagem Online"
const description = "Calcule porcentagem online: quanto é X% de um valor, aumento, desconto, variação percentual e quantos % um número representa. Com fórmula, grátis e na hora."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/utilities/percentage-calculator",
    keywords: ["calculadora de porcentagem", "calcular porcentagem", "cálculo de porcentagem", "porcentagem de desconto", "variação percentual", "aumento percentual"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Calculadora de Porcentagem",
                    description,
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/percentage-calculator",
                    toolSlug: "percentage-calculator"
                })}
            />
            <PercentageCalculatorPage />
        </>
    )
}
