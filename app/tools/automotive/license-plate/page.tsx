import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { LicensePlatePage } from "./client"

const title = "Gerador de Placa Mercosul"
const description = "Gere placas de veículos nos padrões Mercosul e Antigo em lote. Ferramenta gratuita para testes de software, simulação de dados e homologação de APIs."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/automotive/license-plate",
    keywords: ["gerador de placa", "gerador de placa de carro", "gerador de placa mercosul", "gerar placa de carro", "gerador de placa de moto", "placa mercosul teste", "massa de dados veiculos", "dev tools"]
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Placa Mercosul",
                    description: "Gere placas de veículos nos padrões Mercosul e Antigo em lote. Ferramenta gratuita para testes de software, simulação de dados e homologação de APIs.",
                    categoryLabel: "Automotivo",
                    path: "/tools/automotive/license-plate",
                    toolSlug: "license-plate"
                })}
            />
            <LicensePlatePage />
        </>
    )
}
