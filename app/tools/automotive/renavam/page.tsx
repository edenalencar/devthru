import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { RenavamGeneratorPage } from "./client"

const title = "Gerador de Renavam Válido com Dígito Verificador - Grátis"
const description = "Gere números de RENAVAM válidos com cálculo exato de Módulo 11 para testes de sistemas de frotas, despachantes, concessionárias e seguradoras."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/automotive/renavam",
    keywords: [
        "gerador de renavam",
        "gerador de renavam online",
        "gerador de renavam e placa",
        "gerador de renavam e chassi",
        "gerador de renavam para teste",
        "gerar renavam",
        "renavam válido",
        "número renavam",
        "gerador renavam grátis"
    ]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Renavam Válido Online",
                    description: "Gere números de Renavam válidos de 11 dígitos em lote ou único para testes de software automotivos. Ferramenta online gratuita para desenvolvedores e QAs.",
                    categoryLabel: "Automotivo",
                    path: "/tools/automotive/renavam",
                    toolSlug: "renavam"
                })}
            />
            <RenavamGeneratorPage />
        </>
    )
}
