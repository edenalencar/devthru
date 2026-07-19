import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"
import { TOOL_META_DESCRIPTIONS } from "@/lib/seo/meta-descriptions"

import { FipePage } from "./client"

const title = "Tabela FIPE: Preço de Veículos"
const description = TOOL_META_DESCRIPTIONS.fipe

export const metadata: Metadata = generateToolMetadata({
    title: "Tabela FIPE Atualizada - Consulte o Preço de Veículos",
    description,
    path: "/tools/automotive/fipe",
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Tabela FIPE: Preço de Veículos",
                    description: "Ferramenta online gratuita para Tabela FIPE: Preço de Veículos.",
                    categoryLabel: "Automotivo",
                    path: "/tools/automotive/fipe",
                    toolSlug: "fipe"
                })}
            />
            <FipePage />
        </>
    )
}
