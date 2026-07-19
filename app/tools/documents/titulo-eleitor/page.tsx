import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { TituloEleitorPage } from "./client"

const title = "Gerador de Título de Eleitor"
const description = "Gere e valide números de Título de Eleitor válidos em 1 clique para testes unitários de sistemas. Calcula perfeitamente os 12 dígitos, UFs e Zonas Eleitorais. Algoritmo oficial."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/titulo-eleitor",
    keywords: ["gerador titulo de eleitor", "validador de titulo de eleitor", "titulo eleitor valido", "gerar titulo eleitor", "testes de software", "titulo eleitor teste", "dev tools"]
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Título de Eleitor",
                    description: "Gere e valide números de Título de Eleitor válidos em 1 clique para testes unitários de sistemas. Calcula perfeitamente os 12 dígitos, UFs e Zonas Eleitorais. Algoritmo oficial.",
                    categoryLabel: "Documentos",
                    path: "/tools/documents/titulo-eleitor",
                    toolSlug: "titulo-eleitor"
                })}
            />
            <TituloEleitorPage />
        </>
    )
}
