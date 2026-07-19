import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { HashGeneratorPage } from "./client"

const title = "Gerador de Hash Online - SHA-256, SHA-512 e SHA-1"
const description = "Gere hashes seguros (SHA-256, MD5, SHA-512) para proteger senhas e verificar integridade de arquivos. Ferramenta de criptografia online rápida e privada."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Hash Online - SHA-256, SHA-512 e SHA-1",
    description: "Gere hashes seguros (SHA-256, MD5, SHA-512) para proteger senhas e verificar integridade de arquivos. Ferramenta de criptografia online rápida e privada.",
    path: "/tools/utilities/hash",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Hash Online - SHA-256, SHA-512 e SHA-1",
                    description: "Gere hashes seguros (SHA-256, MD5, SHA-512) para proteger senhas e verificar integridade de arquivos. Ferramenta de criptografia online rápida e privada.",
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/hash",
                    toolSlug: "hash"
                })}
            />
            <HashGeneratorPage />
        </>
    )
}
