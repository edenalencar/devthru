import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { SlugGeneratorPage } from "./client"

const title = "Gerador de Slug Url Amigável Online"
const description = "Transforme títulos e textos em URLs amigáveis (slugs) otimizadas para SEO. Remova acentos e caracteres especiais para links limpos."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Slug Url Amigável Online",
    description: "Transforme títulos e textos em URLs amigáveis (slugs) otimizadas para SEO. Remova acentos e caracteres especiais para links limpos.",
    path: "/tools/text/slug-generator",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Slug Url Amigável Online",
                    description: "Transforme títulos e textos em URLs amigáveis (slugs) otimizadas para SEO. Remova acentos e caracteres especiais para links limpos.",
                    categoryLabel: "Texto",
                    path: "/tools/text/slug-generator",
                    toolSlug: "slug-generator"
                })}
            />
            <SlugGeneratorPage />
        </>
    )
}
