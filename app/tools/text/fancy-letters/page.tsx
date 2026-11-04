import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-config"

import { FancyLettersPage } from "./client"

const title = "Letras Diferentes para Copiar e Colar"
const description = "Gere letras diferentes e bonitas para copiar e colar no Instagram, Free Fire, WhatsApp e nicks: negrito, cursiva, gótica, riscada e mais. Grátis e na hora."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/text/fancy-letters",
    keywords: ["letras diferentes", "letras bonitas", "letras para copiar e colar", "letras diferentes para nick", "fonte para instagram", "letra cursiva para copiar", "letras góticas"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Letras Diferentes",
                    description,
                    categoryLabel: "Texto",
                    path: "/tools/text/fancy-letters",
                    toolSlug: "fancy-letters"
                })}
            />
            <FancyLettersPage />
        </>
    )
}
