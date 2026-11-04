import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { CharacterCounterPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Contador de Caracteres Online e de Palavras"
const description = "Contador de caracteres online: conte letras, caracteres com e sem espaço, palavras, linhas e parágrafos em tempo real. Ideal para Instagram, X, SEO e redações."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/text/character-counter",
    keywords: ["contador de caracteres", "contador de caracteres online", "contar caracteres", "contador de letras", "contador de palavras", "caracteres com espaço", "limite de caracteres instagram"]
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Contador de Caracteres Online",
                    description,
                    categoryLabel: "Texto",
                    path: "/tools/text/character-counter",
                    toolSlug: "character-counter"
                })}
            />
            <CharacterCounterPage />
        </>
    )
}
