import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { UrlEncoderPage } from "./client"

const title = "URL Encode e Decode Online | Ferramenta Grátis"
const description = "Codifique e decodifique URLs online. Converta caracteres especiais para o formato URL-safe e vice-versa. Ferramenta essencial para desenvolvedores web."

export const metadata: Metadata = generateToolMetadata({
    title: "URL Encode e Decode Online | Ferramenta Grátis",
    description: "Codifique e decodifique URLs online. Converta caracteres especiais para o formato URL-safe e vice-versa. Ferramenta essencial para desenvolvedores web.",
    path: "/tools/utilities/url-encoder",
    keywords: ["url encode", "url decode", "codificar url", "decodificar url", "percent encoding", "ferramentas dev"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "URL Encode e Decode Online | Ferramenta Grátis",
                    description: "Codifique e decodifique URLs online. Converta caracteres especiais para o formato URL-safe e vice-versa. Ferramenta essencial para desenvolvedores web.",
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/url-encoder",
                    toolSlug: "url-encoder"
                })}
            />
            <UrlEncoderPage />
        </>
    )
}
