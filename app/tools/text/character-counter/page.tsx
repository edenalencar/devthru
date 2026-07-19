import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { CharacterCounterPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Contador de Caracteres Online"
const description = "Conte caracteres, palavras, linhas e parágrafos do seu texto em tempo real. Ferramenta online gratuita ideal para redatores, estudantes e profissionais de SEO."

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
