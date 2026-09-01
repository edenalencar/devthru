import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { FaviconGeneratorPage } from "./client"

const title = "Gerador de Favicon Online (.ico e PNGs) para Sites - Grátis"
const description = "Crie pacotes completos de Favicon a partir de imagens nos formatos .ico, 16x16, 32x32, 192x192 e apple-touch-icon para navegadores web."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Favicon Online - Ícones para Sites",
    description: "Crie favicons personalizados para seu site a partir de imagens. Gere todos os tamanhos e formatos necessários.",
    path: "/tools/image/favicon",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Favicon Online - Ícones para Sites",
                    description: "Crie favicons personalizados para seu site a partir de imagens. Gere todos os tamanhos e formatos necessários.",
                    categoryLabel: "Imagem",
                    path: "/tools/image/favicon",
                    toolSlug: "favicon"
                })}
            />
            <FaviconGeneratorPage />
        </>
    )
}
