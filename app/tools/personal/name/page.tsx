import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { NameGeneratorPage } from "./client"

const title = "Gerador de Nomes Brasileiros"
const description = "Gere nomes e sobrenomes brasileiros realistas de forma aleatória e em lote para simulações, preenchimento de cadastros e testes de bancos de dados."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/personal/name",
    keywords: ["gerador de nomes", "nomes aleatorios", "nomes brasileiros", "gerador de pessoas brasileiras", "gerador nomes masculinos femininos"]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Nomes Brasileiros",
                    description: "Gere nomes e sobrenomes brasileiros realistas de forma aleatória e em lote para simulações, preenchimento de cadastros e testes de bancos de dados.",
                    categoryLabel: "Pessoal",
                    path: "/tools/personal/name",
                    toolSlug: "name"
                })}
            />
            <NameGeneratorPage />
        </>
    )
}
