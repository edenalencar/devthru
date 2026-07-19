import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { MockDataGeneratorPage } from "./client"

const title = "Gerador de Dados Mock (Fictícios)"
const description = "Gere dados fictícios (Mock Data) em JSON para testes e protótipos de software. Crie usuários, produtos, endereços e mais com esquemas personalizáveis gratuitamente."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Dados Mock (Fictícios) - Exportação JSON",
    description: "Gere dados fictícios (Mock Data) em JSON para testes e protótipos de software. Crie usuários, produtos e endereços com esquemas personalizáveis.",
    path: "/tools/development/mock-data",
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Dados Mock (Fictícios)",
                    description: "Gere dados fictícios (Mock Data) em JSON para testes e protótipos de software. Crie usuários, produtos, endereços e mais com esquemas personalizáveis gratuitamente.",
                    categoryLabel: "Desenvolvimento",
                    path: "/tools/development/mock-data",
                    toolSlug: "mock-data"
                })}
            />
            <MockDataGeneratorPage />
        </>
    )
}
