import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { ChassiGeneratorPage } from "./client"

const title = "Gerador de Chassi (VIN) Válido"
const description = "Gere números de Chassi (VIN) válidos de forma aleatória em lote ou individualmente para testes de software, QA e homologação de APIs. Rápido e sem cadastro."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/automotive/chassi",
    keywords: ["gerador de chassi",
        "gerar chassi",
        "gerador de chassi online",
        "chassi ficticio",
        "gerador de chassi de veiculos",
        "chassi válido",
        "VIN generator",
        "número de chassi",
        "chassi veicular",
        "gerador de placa e chassi",
        "gerador de chassi moto",
        "gerar chassi online",
    ]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Chassi (VIN) Válido",
                    description: "Gere números de Chassi (VIN) válidos de forma aleatória em lote ou individualmente para testes de software, QA e homologação de APIs. Rápido e sem cadastro.",
                    categoryLabel: "Automotivo",
                    path: "/tools/automotive/chassi",
                    toolSlug: "chassi"
                })}
            />
            <ChassiGeneratorPage />
        </>
    )
}
