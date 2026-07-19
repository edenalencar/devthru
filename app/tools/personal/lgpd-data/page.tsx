import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { LGPDDataPage } from "./client"

const title = "Gerador de Dados Fictícios (LGPD)"
const description = "Gere perfis de dados simulados ou anonimize textos reais ocultando informações sensíveis (como CPF, e-mail e telefone) para conformidade com a LGPD."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/personal/lgpd-data",
    keywords: ["ferramentas lgpd", "anonimizador de dados", "mascarar dados sensiveis", "gerar dados fake", "gerador lgpd"]
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Dados Fictícios (LGPD)",
                    description: "Gere perfis de dados simulados ou anonimize textos reais ocultando informações sensíveis (como CPF, e-mail e telefone) para conformidade com a LGPD.",
                    categoryLabel: "Pessoal",
                    path: "/tools/personal/lgpd-data",
                    toolSlug: "lgpd-data"
                })}
            />
            <LGPDDataPage />
        </>
    )
}
