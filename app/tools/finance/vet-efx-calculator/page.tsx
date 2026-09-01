import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { VetEfxCalculatorPage } from "./client"

const title = "Simulador de VET e eFX Cambial do Banco Central - Grátis"
const description = "Calcule o Valor Efetivo Total (VET), IOF e taxas de câmbio em remessas internacionais e pagamentos eFX conforme as regras do Banco Central."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/vet-efx-calculator",
    keywords: [
        "vet cambio",
        "calculadora vet",
        "efx banco central",
        "valor efetivo total",
        "iof cambio",
        "spread cambio",
        "pagamentos internacionais",
        "checkout cross border",
        "dev tools"
    ]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Simulador e Calculadora de VET e eFX Cambial",
                    description,
                    categoryLabel: "Finanças",
                    path: "/tools/finance/vet-efx-calculator",
                    toolSlug: "vet-efx-calculator"
                })}
            />
            <VetEfxCalculatorPage />
        </>
    )
}
