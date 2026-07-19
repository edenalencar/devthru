import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { BoletoGeneratorPage } from "./client"

const title = "Gerador de Boleto Bancário"
const description = "Gere boletos bancários fictícios em PDF com linha digitável e código de barras para testes de integração de sistemas e homologação financeira de forma segura."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/boleto-generator",
    keywords: ["gerador de boleto", "gerador de boleto falso", "boleto ficticio para teste", "simular boleto bancario", "gerar boleto pdf teste"]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Boleto Bancário",
                    description: "Gere boletos bancários fictícios em PDF com linha digitável e código de barras para testes de integração de sistemas e homologação financeira de forma segura.",
                    categoryLabel: "Finanças",
                    path: "/tools/finance/boleto-generator",
                    toolSlug: "boleto-generator"
                })}
            />
            <BoletoGeneratorPage />
        </>
    )
}
