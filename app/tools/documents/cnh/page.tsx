import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CNHGeneratorPage } from "./client"

const title = "Gerador de CNH Online"
const description = "Gere números de CNH (Carteira Nacional de Habilitação) válidos para testes de software. Ferramenta com suporte à geração em massa, ideal para desenvolvedores e QA."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de CNH Online para Testes de Software",
    description: "Gere números de CNH (Carteira Nacional de Habilitação) válidos para testes de software. Suporte à geração em massa, ideal para QA e devs.",
    path: "/tools/documents/cnh",
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de CNH Online",
                    description: "Gere números de CNH (Carteira Nacional de Habilitação) válidos para testes de software. Ferramenta com suporte à geração em massa, ideal para desenvolvedores e QA.",
                    categoryLabel: "Documentos",
                    path: "/tools/documents/cnh",
                    toolSlug: "cnh"
                })}
            />
            <CNHGeneratorPage />
        </>
    )
}
