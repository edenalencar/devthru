import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { TaxCalculatorPage } from "./client"

const title = "Calculadora Simples Nacional"
const description = "Calcule facilmente o DAS e a alíquota efetiva do Simples Nacional. Simulador atualizado para 2024/2025, ideal para planejamento tributário e financeiro preciso."

export const metadata: Metadata = generateToolMetadata({
    title: "Calculadora Simples Nacional",
    description: "Calcule facilmente o DAS e a alíquota efetiva do Simples Nacional. Simulador atualizado para 2024/2025, ideal para planejamento tributário e financeiro preciso.",
    path: "/tools/finance/tax-calculator",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Calculadora Simples Nacional",
                    description: "Calcule facilmente o DAS e a alíquota efetiva do Simples Nacional. Simulador atualizado para 2024/2025, ideal para planejamento tributário e financeiro preciso.",
                    categoryLabel: "Finanças",
                    path: "/tools/finance/tax-calculator",
                    toolSlug: "tax-calculator"
                })}
            />
            <TaxCalculatorPage />
        </>
    )
}
