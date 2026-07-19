import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CnaeSearchPage } from "./client"

export const metadata: Metadata = generateToolMetadata({
    title: "Busca de CNAE Completa",
    description: "Pesquise códigos e descrições da Classificação Nacional de Atividades Econômicas (CNAE/IBGE). Consulta gratuita com filtros por seção, divisão e classe.",
    path: "/tools/business/cnae-search",
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Busca de CNAE Completa",
                    description: "Pesquise códigos e descrições da Classificação Nacional de Atividades Econômicas (CNAE/IBGE). Consulta gratuita com filtros por seção, divisão e classe.",
                    categoryLabel: "Negócios",
                    path: "/tools/business/cnae-search",
                    toolSlug: "cnae-search"
                })}
            />
            <CnaeSearchPage />
        </>
    )
}
