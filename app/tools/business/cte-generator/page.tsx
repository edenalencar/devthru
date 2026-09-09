import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"
import { JsonLd } from "@/components/seo/json-ld"
import { CteGeneratorPage } from "./client"

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Chave CT-e",
    description: "Gere chaves de acesso de Conhecimento de Transporte Eletrônico (CT-e) válidas para testes de integração.",
    path: "/tools/business/cte-generator",
    keywords: ["gerador ct-e", "chave de acesso ct-e", "cte teste", "dev tools", "documentos fiscais"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Chave CT-e",
                    description: "Gere chaves de acesso de Conhecimento de Transporte Eletrônico (CT-e) válidas para testes de integração.",
                    categoryLabel: "Negócios",
                    path: "/tools/business/cte-generator",
                    toolSlug: "cte-generator"
                })}
            />
            <CteGeneratorPage />
        </>
    )
}
