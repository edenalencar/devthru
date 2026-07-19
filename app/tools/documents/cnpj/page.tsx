import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CNPJGeneratorPage } from "./client"

const title = "Gerador de CNPJ Válido Online"
const description = "Gerador de CNPJ online gratuito. Gere e valide CNPJs tradicionais e alfanuméricos válidos em lote ou individualmente para testes de sistemas e APIs."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/cnpj",
    keywords: [
        "gerador de cnpj",
        "validador de cnpj",
        "gerador cnpj",
        "cnpj alfanumerico",
        "gerador de cnpj online",
        "cnpj valido",
        "dev tools",
        "testes de software",
        "gerador de cnpj para testes",
        "gerador de cnpj para teste",
        "gerador de cnpj válido para teste",
        "gerador de cnpj e cpf",
        "gerador de cpf cnpj",
        "gerador de cnpj aleatório",
        "gerador de cnpj ativo",
        "gerador de cnpj completo",
        "gerador de cnpj filial",
        "gerador de cnpj invalido",
        "gerador de cnpj e inscrição estadual",
        "gerador de cnpj mei",
        "gerador de cnpj matriz e filial"
    ]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de CNPJ Válido Online",
                    description: "Gerador de CNPJ online gratuito. Gere e valide CNPJs tradicionais e alfanuméricos válidos em lote ou individualmente para testes de sistemas e APIs.",
                    categoryLabel: "Documentos",
                    path: "/tools/documents/cnpj",
                    toolSlug: "cnpj"
                })}
            />
            <CNPJGeneratorPage />
        </>
    )
}
