import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { LoremIpsumPage } from "./client"

const title = "Gerador de Lorem Ipsum (Parágrafos e Palavras) - Grátis"
const description = "Gere textos de preenchimento Lorem Ipsum personalizados por parágrafos, frases ou palavras para mockups de design e diagramação."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Lorem Ipsum - Texto de Preenchimento",
    description: "Gere texto Lorem Ipsum personalizado para seus projetos. Crie parágrafos, frases e listas aleatórias e preencha layouts de design com total facilidade.",
    path: "/tools/utilities/lorem",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Lorem Ipsum - Texto de Preenchimento",
                    description: "Gere texto Lorem Ipsum personalizado para seus projetos. Crie parágrafos, frases e listas aleatórias para preencher layouts e protótipos de design com facilidade.",
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/lorem",
                    toolSlug: "lorem"
                })}
            />
            <LoremIpsumPage />
        </>
    )
}
