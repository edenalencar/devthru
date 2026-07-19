import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { PersonGeneratorPage } from "./client"

const title = "Gerador de Pessoa Completa"
const description = "Gerador de pessoas online gratuito. Gere dados pessoais fictícios completos com nome, CPF, RG, endereço e contato para testes rápidos de software."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/personal/person",
    keywords: ["gerador de pessoa", "gerador de pessoas", "gerador de pessoa completa", "dados de teste", "gerador cpf rg endereco"]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Pessoa Completa",
                    description: "Gerador de pessoas online gratuito. Gere dados pessoais fictícios completos com nome, CPF, RG, endereço e contato para testes rápidos de software.",
                    categoryLabel: "Pessoal",
                    path: "/tools/personal/person",
                    toolSlug: "person"
                })}
            />
            <PersonGeneratorPage />
        </>
    )
}
