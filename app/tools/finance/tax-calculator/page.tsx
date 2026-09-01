import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { TaxCalculatorPage } from "./client"

const title = "Calculadora do Simples Nacional (DAS e Alíquotas) - Grátis"
const description = "Calcule a alíquota efetiva e o imposto DAS do Simples Nacional nos Anexos I a V da Lei Complementar 123/2006 com base no RBT12."

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
