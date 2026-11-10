import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-config"

import { DayCounterPage } from "./client"

const title = "Contador de Dias: Calcular Dias entre Datas"
const description = "Conte quantos dias há entre duas datas: dias corridos, dias úteis sem fins de semana e feriados nacionais, semanas, meses e anos. Grátis e na hora."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/utilities/day-counter",
    keywords: ["contador de dias", "contagem de dias", "calcular dias entre datas", "quantos dias faltam", "dias úteis entre datas", "calculadora de dias"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Contador de Dias",
                    description,
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/day-counter",
                    toolSlug: "day-counter"
                })}
            />
            <DayCounterPage />
        </>
    )
}
