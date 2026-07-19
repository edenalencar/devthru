import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { EmailGeneratorPage } from "./client"

const title = "Gerador de E-mail Temporário"
const description = "Crie e copie endereços de e-mail fictícios e temporários instantaneamente de forma individual ou em massa. Suporte a domínios comuns ou personalizados para testes."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/personal/email",
    keywords: ["gerador de email", "email temporario", "email fake", "gerar email de teste", "criar email temporario"]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de E-mail Temporário",
                    description: "Crie e copie endereços de e-mail fictícios e temporários instantaneamente de forma individual ou em massa. Suporte a domínios comuns ou personalizados para testes.",
                    categoryLabel: "Pessoal",
                    path: "/tools/personal/email",
                    toolSlug: "email"
                })}
            />
            <EmailGeneratorPage />
        </>
    )
}
