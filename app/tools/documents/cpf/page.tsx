import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CPFGeneratorPage } from "./client"

const title = "Gerador e Validador de CPF Válido Online [Grátis]"
const description = "Gerador de CPF online gratuito. Gere e valide CPFs válidos em 1 clique para testes de software, QA e desenvolvimento com algoritmo oficial."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/cpf",
    keywords: ["gerador de cpf", "validador de cpf", "gerar cpf valido", "testar cpf", "gerador cpf", "cpf generator", "massa de dados", "dev tools"]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador e Validador de CPF Válido Online [Grátis]",
                    description: "Gerador de CPF online gratuito. Gere e valide CPFs válidos em 1 clique para testes de software, QA e desenvolvimento com algoritmo oficial.",
                    categoryLabel: "Documentos",
                    path: "/tools/documents/cpf",
                    toolSlug: "cpf"
                })}
            />
            <CPFGeneratorPage />
        </>
    )
}
