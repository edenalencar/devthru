import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { CharacterCounterPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Contador de Caracteres, Palavras e Linhas Online - Grátis"
const description = "Conte caracteres, palavras, espaços, linhas, parágrafos e tempo estimado de leitura de textos online em tempo real com precisão."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/text/character-counter",
    keywords: ["contador caracteres", "contador palavras", "analise texto", "seo tools"]
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Contador de Caracteres Online",
                    description: "Conte caracteres, palavras, linhas e parágrafos do seu texto em tempo real. Ferramenta online gratuita ideal para redatores, estudantes e profissionais de SEO.",
                    categoryLabel: "Texto",
                    path: "/tools/text/character-counter",
                    toolSlug: "character-counter"
                })}
            />
            <CharacterCounterPage />
        </>
    )
}
