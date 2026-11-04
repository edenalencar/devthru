import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"
import { TOOL_META_DESCRIPTIONS } from "@/lib/seo/meta-descriptions"

import { CaseConverterPage } from "./client"

const title = "Converter Letra Maiúscula e Minúscula Online"
const description = TOOL_META_DESCRIPTIONS.caseConverter

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/text/case-converter",
    keywords: ["letra maiúscula", "converter maiúsculas e minúsculas", "texto em minúsculo", "deixar tudo maiúsculo", "camelCase", "snake_case"]
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Conversor de Maiúsculas e Minúsculas Online",
                    description,
                    categoryLabel: "Texto",
                    path: "/tools/text/case-converter",
                    toolSlug: "case-converter"
                })}
            />
            <CaseConverterPage />
        </>
    )
}
