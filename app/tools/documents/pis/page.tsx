import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { PISPage } from './client'
import { generateToolMetadata } from "@/lib/seo-config"

const title = 'Gerador de PIS Válido Online'
const description = "Gerador de PIS online gratuito. Gere números de PIS/PASEP e NIS válidos em lote ou individualmente para testes de software com nosso algoritmo oficial."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/pis",
    keywords: [
        "gerador de pis", 
        "gerador de pis online", 
        "gerador de pis válido", 
        "gerador de pis pasep", 
        "gerador de numero pis", 
        "gerador de pis ficticio", 
        "gerador de pis para teste", 
        "gerador de nis", 
        "gerador de nit", 
        "gerar pis aleatorio", 
        "numero pis online", 
        "gerar pis falso", 
        "pis para testes", 
        "validar pis", 
        "dev tools"
    ]
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Pis",
                    description: "Gerador de PIS online gratuito. Gere números de PIS/PASEP e NIS válidos em lote ou individualmente para testes de software com nosso algoritmo oficial.",
                    categoryLabel: "Documentos",
                    path: "/tools/documents/pis",
                    toolSlug: "pis"
                })}
            />
            <PISPage />
        </>
    )
}
