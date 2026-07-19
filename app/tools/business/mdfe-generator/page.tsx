import { JsonLd } from "@/components/seo/json-ld"
import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { MdfeGeneratorPage } from "./client"

const title = "Gerador de Chave MDF-e"
const description = "Gere chaves de acesso do Manifesto Eletrônico de Documentos Fiscais (MDF-e) válidas para testes de integração e homologação. Ferramenta gratuita e sem cadastro."

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
