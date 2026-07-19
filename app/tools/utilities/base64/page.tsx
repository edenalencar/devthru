import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { Base64Page } from "./client"

const title = "Codificador e Decodificador Base64"
const description = "Codifique e decodifique textos e strings em Base64 instantaneamente. Ferramenta essencial para desenvolvedores que precisam transmitir dados binários em texto."

export const metadata: Metadata = generateToolMetadata({
    title: "Codificador e Decodificador Base64 Online Gratuito",
    description: "Codifique e decodifique textos e strings em Base64 instantaneamente. Ferramenta essencial para desenvolvedores que precisam transmitir dados binários em texto.",
    path: "/tools/utilities/base64",
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Codificador e Decodificador Base64",
                    description: "Codifique e decodifique textos e strings em Base64 instantaneamente. Ferramenta essencial para desenvolvedores que precisam transmitir dados binários em texto.",
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/base64",
                    toolSlug: "base64"
                })}
            />
            <Base64Page />
        </>
    )
}
