import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { JSONFormatterPage } from "./client"

const title = "JSON Formatter e Validator"
const description = "Formate, valide e minifique código JSON online com nossa ferramenta gratuita. Visualize a estrutura, corrija erros de sintaxe e otimize seus dados para APIs."

export const metadata: Metadata = generateToolMetadata({
    title: "JSON Formatter e Validator",
    description: "Formate, valide e minifique código JSON online com nossa ferramenta gratuita. Visualize a estrutura, corrija erros de sintaxe e otimize seus dados para APIs.",
    path: "/tools/utilities/json",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "JSON Formatter e Validator",
                    description: "Formate, valide e minifique código JSON online com nossa ferramenta gratuita. Visualize a estrutura, corrija erros de sintaxe e otimize seus dados para APIs.",
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/json",
                    toolSlug: "json"
                })}
            />
            <JSONFormatterPage />
        </>
    )
}
