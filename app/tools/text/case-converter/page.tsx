import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"
import { TOOL_META_DESCRIPTIONS } from "@/lib/seo/meta-descriptions"

import { CaseConverterPage } from "./client"

const title = "Conversor de Case Online"
const description = TOOL_META_DESCRIPTIONS.caseConverter

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de Case: Maiúsculas, Minúsculas e camelCase",
    description,
    path: "/tools/text/case-converter",
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Conversor de Case Online",
                    description: "Ferramenta online gratuita para Conversor de Case Online.",
                    categoryLabel: "Texto",
                    path: "/tools/text/case-converter",
                    toolSlug: "case-converter"
                })}
            />
            <CaseConverterPage />
        </>
    )
}
