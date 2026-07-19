import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { AddressGeneratorPage } from "./client"

const title = "Gerador de Endereço Aleatório"
const description = "Gere endereços brasileiros completos com CEP, rua, bairro e cidade para testes de sistemas e formulários."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Endereço Aleatório - CEP e Rua Válidos [Grátis]",
    description: "Gere endereços brasileiros fictícios e válidos com CEP, rua, número, bairro, cidade e estado em 1 clique. Geração individual ou em lote para testes.",
    path: "/tools/personal/address",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Endereço Aleatório",
                    description: "Gere endereços brasileiros completos com CEP, rua, bairro e cidade para testes de sistemas e formulários.",
                    categoryLabel: "Pessoal",
                    path: "/tools/personal/address",
                    toolSlug: "address"
                })}
            />
            <AddressGeneratorPage />
        </>
    )
}
