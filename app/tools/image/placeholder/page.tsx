import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { PlaceholderGeneratorPage } from "./client"

const title = "Gerador de Imagem Placeholder"
const description = "Crie imagens placeholder (dummy image) com tamanho, cores e texto personalizados para protótipos e layouts."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Imagem Placeholder",
    description: "Crie imagens placeholder (dummy image) com tamanho, cores e texto personalizados para protótipos e layouts.",
    path: "/tools/image/placeholder",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Imagem Placeholder",
                    description: "Crie imagens placeholder (dummy image) com tamanho, cores e texto personalizados para protótipos e layouts.",
                    categoryLabel: "Imagem",
                    path: "/tools/image/placeholder",
                    toolSlug: "placeholder"
                })}
            />
            <PlaceholderGeneratorPage />
        </>
    )
}
