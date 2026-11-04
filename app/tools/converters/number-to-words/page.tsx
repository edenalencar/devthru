import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-config"

import { NumberToWordsPage } from "./client"

const title = "Número por Extenso Online – Valores e Reais"
const description = "Escreva qualquer número por extenso em português: inteiros até trilhões e valores em reais com centavos, para cheques, contratos e recibos. Grátis e na hora."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/converters/number-to-words",
    keywords: ["número por extenso", "numero por extenso", "valor por extenso", "escrever número por extenso", "valor por extenso em reais", "extenso de cheque"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Número por Extenso Online",
                    description,
                    categoryLabel: "Conversores",
                    path: "/tools/converters/number-to-words",
                    toolSlug: "number-to-words"
                })}
            />
            <NumberToWordsPage />
        </>
    )
}
