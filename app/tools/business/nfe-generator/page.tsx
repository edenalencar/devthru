import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { NfeGeneratorPage } from "./client"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Chave NF-e e NFC-e - Notas Fiscais",
    description: "Gere chaves de acesso de Nota Fiscal Eletrônica (NF-e) e NFC-e válidas para testes de integração de ERP e homologação. Ferramenta corporativa gratuita.",
    path: "/tools/business/nfe-generator",
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Chave NF-e e NFC-e - Notas Fiscais",
                    description: "Gere chaves de acesso de Nota Fiscal Eletrônica (NF-e) e NFC-e válidas para testes de integração de ERP e homologação. Ferramenta corporativa gratuita.",
                    categoryLabel: "Negócios",
                    path: "/tools/business/nfe-generator",
                    toolSlug: "nfe-generator"
                })}
            />
            <NfeGeneratorPage />
        </>
    )
}
