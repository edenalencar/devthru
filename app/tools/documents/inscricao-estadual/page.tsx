import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { InscricaoEstadualPage } from './client'
import { generateToolMetadata } from "@/lib/seo-config"

const title = 'Gerador de Inscrição Estadual'
const description = 'Gere e valide Inscrição Estadual (IE) de todos os 27 estados do Brasil em 1 clique. Ferramenta online grátis para testes de software e emissão de notas fiscais.'

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/documents/inscricao-estadual",
    keywords: ["inscricao estadual", "validador ie", "gerador ie", "consultar ie", "sintegra", "cadastro contribuinte", "testes de software", "validate_docbr", "desenvolvedores"]
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Inscricao Estadual",
                    description: "Ferramenta online gratuita para Inscricao Estadual.",
                    categoryLabel: "Documentos",
                    path: "/tools/documents/inscricao-estadual",
                    toolSlug: "inscricao-estadual"
                })}
            />
            <InscricaoEstadualPage />
        </>
    )
}
