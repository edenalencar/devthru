import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { PasswordGeneratorPage } from "./client"

const title = "Gerador de Senhas Seguras"
const description = "Crie senhas fortes e invioláveis com nosso Gerador de Senhas gratuito. Personalize comprimento, símbolos e números para garantir a segurança máxima de suas contas."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Senhas Seguras",
    description: "Crie senhas fortes e invioláveis com o Gerador de Senhas gratuito. Personalize o comprimento, símbolos e números para a segurança de suas contas.",
    path: "/tools/utilities/password",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Senhas Seguras",
                    description: "Crie senhas fortes e invioláveis com nosso Gerador de Senhas gratuito. Personalize comprimento, símbolos e números para garantir a segurança máxima de suas contas.",
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/password",
                    toolSlug: "password"
                })}
            />
            <PasswordGeneratorPage />
        </>
    )
}
