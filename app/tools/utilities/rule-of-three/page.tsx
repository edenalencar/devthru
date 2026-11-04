import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-config"

import { RuleOfThreePage } from "./client"

const title = "Calculadora de Regra de 3 Simples Online"
const description = "Calcule regra de 3 simples direta e inversa online, com o passo a passo da conta. Ideal para proporções, receitas, preços e porcentagens. Grátis e na hora."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/utilities/rule-of-three",
    keywords: ["regra de 3", "regra de três", "regra de 3 simples", "calculadora regra de 3", "regra de 3 inversa", "regra de 3 online"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Calculadora de Regra de 3",
                    description,
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/rule-of-three",
                    toolSlug: "rule-of-three"
                })}
            />
            <RuleOfThreePage />
        </>
    )
}
