import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { EmailValidatorPage } from "./client"

const title = "Validador de E-mail Online (Sintaxe e RFCs) - Grátis"
const description = "Valide endereços de e-mail de acordo com os padrões RFC 5322, verificando formato, domínio, caracteres permitidos e estrutura de usuário."

export const metadata: Metadata = generateToolMetadata({
    title: "Validador de Email",
    description: "Verifique se um email é válido, se o formato está correto e se é temporário ou descartável. Validação gratuita com verificação de sintaxe e de domínio.",
    path: "/tools/text/email-validator",
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Validador de Email",
                    description: "Verifique se um endereço de email é válido, se o formato está correto e se é um email temporário ou descartável. Validação gratuita com verificação de sintaxe e domínio.",
                    categoryLabel: "Texto",
                    path: "/tools/text/email-validator",
                    toolSlug: "email-validator"
                })}
            />
            <EmailValidatorPage />
        </>
    )
}
