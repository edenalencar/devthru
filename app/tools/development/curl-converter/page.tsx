import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"
import { CurlConverterPage } from "./client"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de cURL para Código (Fetch, Axios, Python, Go, PHP)",
    description: "Converta comandos cURL em código limpo para JavaScript (Fetch e Axios), Python Requests, Node.js, Go e PHP. Suporta headers, autenticação e JSON body.",
    path: "/tools/development/curl-converter",
    keywords: ["converter curl para fetch", "curl to axios", "curl to python requests", "converter curl para javascript", "curl to go", "conversor curl online"],
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Conversor de cURL para Código (Fetch, Axios, Python, Go, PHP)",
                    description: "Converta comandos cURL em código limpo para JavaScript (Fetch e Axios), Python Requests, Node.js, Go e PHP. Suporta headers, autenticação e JSON body.",
                    categoryLabel: "Dev Tools",
                    path: "/tools/development/curl-converter",
                    toolSlug: "curl-converter"
                })}
            />
            <CurlConverterPage />
        </>
    )
}
