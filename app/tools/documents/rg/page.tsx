import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { RGGeneratorPage } from "./client"

const title = "Gerador e Validador de RG Online [Grátis]"
const description = "Gere e valide números de RG (Registro Geral) válidos com dígito verificador em 1 clique. Ferramenta online gratuita para testes e homologação de sistemas."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/rg",
    keywords: ["gerador de rg", "validador de rg", "registro geral", "gerador rg", "rg valido", "dev tools", "testes de software"]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador e Validador de RG Online [Grátis]",
                    description: "Gere e valide números de RG (Registro Geral) válidos com dígito verificador em 1 clique. Ferramenta online gratuita para testes e homologação de sistemas.",
                    categoryLabel: "Documentos",
                    path: "/tools/documents/rg",
                    toolSlug: "rg"
                })}
            />
            <RGGeneratorPage />
        </>
    )
}
