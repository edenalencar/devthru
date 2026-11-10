import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CPFGeneratorPage } from "./client"

const title = "Gerador de CPF Válido: Gerar CPF Online Grátis"
const description = "Gere CPF válido e aleatório com ou sem pontuação, por estado e em lote, e valide CPFs em 1 clique. Grátis e sem cadastro, para testes de software e QA."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/cpf",
    keywords: ["gerador de cpf", "gerar cpf", "cpf válido", "gerador de cpf válido", "cpf aleatório", "validador de cpf", "gerar cpf valido", "gerador cpf", "cpf generator", "massa de dados"]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de CPF Válido Online",
                    description,
                    categoryLabel: "Documentos",
                    path: "/tools/documents/cpf",
                    toolSlug: "cpf"
                })}
            />
            <CPFGeneratorPage />
        </>
    )
}
