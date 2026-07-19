import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { ContractGeneratorPage } from "./client"

const title = "Gerador de Contratos Online"
const description = "Crie contratos personalizados em minutos com nossos modelos editáveis. Ideal para prestação de serviços e locação. Gere documentos profissionais em PDF ou texto."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Contratos Online",
    description: "Crie contratos personalizados com modelos editáveis. Ideal para prestação de serviços e locação. Gere documentos em PDF ou texto grátis.",
    path: "/tools/documents/contract-generator",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Contratos Online",
                    description: "Crie contratos personalizados em minutos com nossos modelos editáveis. Ideal para prestação de serviços e locação. Gere documentos profissionais em PDF ou texto.",
                    categoryLabel: "Documentos",
                    path: "/tools/documents/contract-generator",
                    toolSlug: "contract-generator"
                })}
            />
            <ContractGeneratorPage />
        </>
    )
}
