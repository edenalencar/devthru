import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"
import { JSONDiffPage } from "./client"

const title = "JSON Diff Online: Comparar JSON"
const description = "Compare dois arquivos JSON semanticamente. Identifique chaves adicionadas, removidas e valores modificados ignorando a ordenação das chaves."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/development/json-diff",
    keywords: [
        "json diff",
        "comparar json",
        "comparador json online",
        "json compare",
        "semantic json diff",
        "json diff online",
        "diferença json",
        "ferramentas json"
    ]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "JSON Diff Online: Comparador de JSON",
                    description,
                    categoryLabel: "Desenvolvimento",
                    path: "/tools/development/json-diff",
                    toolSlug: "json-diff"
                })}
            />
            <JSONDiffPage />
        </>
    )
}

