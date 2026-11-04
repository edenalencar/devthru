import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-config"

import { RandomNumberPage } from "./client"

const title = "Gerador de Número Aleatório – Sorteio Online"
const description = "Gere números aleatórios entre um mínimo e um máximo, com ou sem repetição, para sorteios, rifas e testes. Usa criptografia do navegador. Grátis e na hora."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/utilities/random-number",
    keywords: ["número aleatório", "gerador de números aleatórios", "sortear número", "sorteio de números", "número aleatório entre 1 e 100", "random number"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Número Aleatório",
                    description,
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/random-number",
                    toolSlug: "random-number"
                })}
            />
            <RandomNumberPage />
        </>
    )
}
