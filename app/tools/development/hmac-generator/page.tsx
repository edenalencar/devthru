import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"
import { HMACGeneratorPage } from "./client"

const title = "Gerador de HMAC Online: SHA-256 e Webhooks"
const description = "Gere e valide assinaturas HMAC (SHA-256, SHA-512) para webhooks e APIs com chave secreta. Teste payloads de Stripe, Mercado Pago e GitHub online."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/development/hmac-generator",
    keywords: [
        "gerador de hmac",
        "hmac sha256",
        "hmac sha512",
        "validar webhook",
        "assinatura webhook",
        "hmac generator online",
        "stripe webhook signature",
        "github webhook signature"
    ]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de HMAC Online: SHA-256 e Webhooks",
                    description,
                    categoryLabel: "Desenvolvimento",
                    path: "/tools/development/hmac-generator",
                    toolSlug: "hmac-generator"
                })}
            />
            <HMACGeneratorPage />
        </>
    )
}

