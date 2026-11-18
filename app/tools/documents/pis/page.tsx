import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { PISPage } from './client'
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Gerador de PIS/NIS Aleatório e Válido"
const description = "Gere PIS/NIS aleatório e válido (PIS, PASEP e NIT), com ou sem pontuação, um a um ou em lote. Grátis, para testes; não consulta o PIS de ninguém."

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
                    description,
                    categoryLabel: "Documentos",
                    path: "/tools/documents/pis",
                    toolSlug: "pis"
                })}
            />
            <PISPage />
        </>
    )
}
