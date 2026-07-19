import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { ImageConverterPage } from "./client"

const title = "Conversor de Imagem Online"
const description = "Converta imagens entre formatos PNG, JPG e WEBP rapidamente e sem perda de qualidade. Processamento seguro no navegador, sem upload para servidor. 100% gratuito."

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de Imagem Online",
    description: "Converta imagens entre PNG, JPG e WEBP rapidamente e sem perda de qualidade. Processamento 100% seguro no navegador, sem uploads para a nuvem.",
    path: "/tools/image/converter",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Conversor de Imagem Online",
                    description: "Converta imagens entre formatos PNG, JPG e WEBP rapidamente e sem perda de qualidade. Processamento seguro no navegador, sem upload para servidor. 100% gratuito.",
                    categoryLabel: "Imagem",
                    path: "/tools/image/converter",
                    toolSlug: "converter"
                })}
            />
            <ImageConverterPage />
        </>
    )
}
