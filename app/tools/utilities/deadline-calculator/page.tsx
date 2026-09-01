import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { DeadlineCalculatorPage } from "./client"

const title = "Calculadora de Prazos em Dias Úteis e Corridos - Grátis"
const description = "Calcule prazos contratuais e processuais em dias úteis ou corridos considerando feriados nacionais brasileiros e finais de semana."

export const metadata: Metadata = generateToolMetadata({
    title: "Calculadora de Prazos Online",
    description: "Calcule prazos com precisão considerando feriados nacionais e fins de semana. Ferramenta essencial para advogados, gerenciamento de projetos e planejamento.",
    path: "/tools/utilities/deadline-calculator",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Calculadora de Prazos Online",
                    description: "Calcule prazos com precisão considerando feriados nacionais e fins de semana. Ferramenta essencial para advogados, gerenciamento de projetos e planejamento.",
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/deadline-calculator",
                    toolSlug: "deadline-calculator"
                })}
            />
            <DeadlineCalculatorPage />
        </>
    )
}
