import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { PasswordGeneratorPage } from "./client"

const title = "Gerador de Senha Forte e Aleatória Online"
const description = "Gerador de senha forte e aleatória: escolha tamanho, números, símbolos e letras maiúsculas/minúsculas. Gerada com criptografia no seu navegador, nada é enviado."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/utilities/password",
    keywords: ["gerador de senha", "gerador de senha forte", "gerador de senha aleatória", "gerar senha", "senha forte", "criar senha segura"]
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
