import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { generateToolMetadata } from "@/lib/seo-config"

import { CepGeneratorPage } from "./client"

const title = "Gerador de CEP Válido por Estado"
const description = "Gere CEPs válidos por estado (UF), com ou sem hífen e em lote, e descubra a UF de qualquer CEP pela faixa dos Correios. Grátis, para testes de software."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/personal/cep",
    keywords: ["gerador de cep", "gerar cep", "cep aleatório", "cep válido", "cep para teste", "faixa de cep por estado", "cep de são paulo"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de CEP Válido",
                    description,
                    categoryLabel: "Pessoal",
                    path: "/tools/personal/cep",
                    toolSlug: "cep"
                })}
            />
            <CepGeneratorPage />
        </>
    )
}
