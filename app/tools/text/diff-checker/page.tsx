import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { DiffCheckerPage } from "./client"

const title = "Comparador de Textos e Códigos Online (Diff Checker) - Grátis"
const description = "Compare dois blocos de texto ou código lado a lado com destaque visual de alterações, adições e remoções de linhas em tempo real."

export const metadata: Metadata = generateToolMetadata({
    title: "Comparador de Texto (Diff Checker)",
    description: "Compare dois textos e visualize as diferenças instantaneamente com nosso Diff Checker online. Identifique adições e remoções por caractere, palavra ou linha.",
    path: "/tools/text/diff-checker",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Comparador de Texto (Diff Checker)",
                    description: "Compare dois textos e visualize as diferenças instantaneamente com nosso Diff Checker online. Identifique adições e remoções por caractere, palavra ou linha.",
                    categoryLabel: "Texto",
                    path: "/tools/text/diff-checker",
                    toolSlug: "diff-checker"
                })}
            />
            <DiffCheckerPage />
        </>
    )
}
