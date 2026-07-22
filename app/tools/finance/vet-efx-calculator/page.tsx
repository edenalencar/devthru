import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { VetEfxCalculatorPage } from "./client"

const title = "Simulador e Calculadora de VET & eFX Cambial (Banco Central)"
const description = "Simulador de VET (Valor Efetivo Total) e eFX Cambial online gratuito. Calcule a cotação com IOF e Spread para pagamentos internacionais e checkouts cross-border segundo regras do Banco Central."

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
                    name: "Simulador e Calculadora de VET & eFX Cambial (Banco Central)",
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
