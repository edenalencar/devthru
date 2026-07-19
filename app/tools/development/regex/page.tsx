import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { RegexGeneratorPage } from "./client"

const title = "Gerador de Regex Online"
const description = "Crie, teste e valide expressões regulares (Regex) em tempo real com nossa ferramenta online. Suporte completo a flags e exemplos práticos para desenvolvedores."

export const metadata: Metadata = generateToolMetadata({
    title: "Testador e Gerador de Regex Online - Exemplos Práticos",
    description: "Construa, teste e valide expressões regulares em tempo real. Consulte a cheatsheet de sintaxe, flags comuns e tire dúvidas clássicas sobre Regex.",
    path: "/tools/development/regex",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Regex Online",
                    description: "Crie, teste e valide expressões regulares (Regex) em tempo real com nossa ferramenta online. Suporte completo a flags e exemplos práticos para desenvolvedores.",
                    categoryLabel: "Desenvolvimento",
                    path: "/tools/development/regex",
                    toolSlug: "regex"
                })}
            />
            <RegexGeneratorPage />
        </>
    )
}
