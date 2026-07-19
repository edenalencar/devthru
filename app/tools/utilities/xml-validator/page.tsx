import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { XMLValidatorPage } from "./client"

const title = "Validador de XML Online"
const description = "Verifique a sintaxe e formate qualquer arquivo XML em segundos. Ferramenta poderosa que não envia seus dados ou notas fiscais para o servidor. 100% Client-Side Seguro."

export const metadata: Metadata = generateToolMetadata({
    title: "Validador de XML Online - Verifique Sintaxe e Erros [Grátis]",
    description: "Valide a sintaxe de seus arquivos XML em segundos de forma segura. Encontre tags abertas e erros de estrutura offline sem enviar dados para o servidor.",
    path: "/tools/utilities/xml-validator",
    keywords: ["validador xml", "formatador xml", "verificar sintaxe xml", "nfe xml", "validar nota fiscal xml", "xml parser", "desenvolvedores"]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Validador de XML Online",
                    description: "Verifique a sintaxe e formate qualquer arquivo XML em segundos. Ferramenta poderosa que não envia seus dados ou notas fiscais para o servidor. 100% Client-Side Seguro.",
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/xml-validator",
                    toolSlug: "xml-validator"
                })}
            />
            <XMLValidatorPage />
        </>
    )
}
