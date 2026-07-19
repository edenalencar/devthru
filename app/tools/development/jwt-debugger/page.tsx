import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { JwtDebuggerPage } from "./client"

const title = "JWT Debugger Online"
const description = "Debugue e decodifique seus tokens JWT instantaneamente no navegador. Inspecione o Header, Payload e Signature de forma privada e livre de servidores."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/development/jwt-debugger",
    keywords: ["jwt debugger", "jwt decoder", "decodificar jwt", "json web token", "jwt.io alternative", "ferramentas de segurança", "jwt online"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "JWT Debugger Online",
                    description: "Debugue e decodifique seus tokens JWT instantaneamente no navegador. Inspecione o Header, Payload e Signature de forma privada e livre de servidores.",
                    categoryLabel: "Desenvolvimento",
                    path: "/tools/development/jwt-debugger",
                    toolSlug: "jwt-debugger"
                })}
            />
            <JwtDebuggerPage />
        </>
    )
}
