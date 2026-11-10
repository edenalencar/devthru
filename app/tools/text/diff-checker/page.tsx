import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { DiffCheckerPage } from "./client"

const title = "Comparar Textos Online: Comparador de Texto"
const description = "Compare dois textos ou códigos e veja as diferenças destacadas por linha, palavra ou caractere. Grátis, sem cadastro e sem enviar o conteúdo a servidores."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/text/diff-checker",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Comparador de Texto (Diff Checker)",
                    description: "Compare dois textos e visualize as diferenças instantaneamente com nosso Diff Checker online. Identifique adições e remoções por caractere, palavra ou linha.",
                    categoryLabel: "Texto",
                    path: "/tools/text/diff-checker",
                    toolSlug: "diff-checker"
                })}
            />
            <DiffCheckerPage />
        </>
    )
}
