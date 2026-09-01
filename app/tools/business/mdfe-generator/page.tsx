import { JsonLd } from "@/components/seo/json-ld"
import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { MdfeGeneratorPage } from "./client"

const title = "Gerador de Chave MDF-e Válida (Modelo 58) - Grátis"
const description = "Gere chaves de acesso de Manifesto Eletrônico de Documentos Fiscais (MDF-e) com 44 dígitos válidos para testes e homologação fiscal."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/business/mdfe-generator",
    keywords: ["gerador mdf-e", "chave mdf-e", "mdfe teste", "manifesto eletronico", "dev tools"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: title,
                    description: description,
                    categoryLabel: "Negócios",
                    path: "/tools/business/mdfe-generator",
                    toolSlug: "mdfe-generator"
                })}
            />
            <MdfeGeneratorPage />
        </>
    )
}
