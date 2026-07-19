import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { EmailSignaturePage } from "./client"

const title = "Gerador de Assinatura de Email"
const description = "Crie assinaturas de email profissionais e personalizadas com nosso gerador gratuito. Compatível com Gmail, Outlook e outros. Adicione logo e links sociais."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Assinatura de Email",
    description: "Crie assinaturas de email profissionais e personalizadas com nosso gerador gratuito. Compatível com Gmail, Outlook e outros. Adicione logo e links sociais.",
    path: "/tools/text/email-signature",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Assinatura de Email",
                    description: "Crie assinaturas de email profissionais e personalizadas com nosso gerador gratuito. Compatível com Gmail, Outlook e outros. Adicione logo e links sociais.",
                    categoryLabel: "Texto",
                    path: "/tools/text/email-signature",
                    toolSlug: "email-signature"
                })}
            />
            <EmailSignaturePage />
        </>
    )
}
