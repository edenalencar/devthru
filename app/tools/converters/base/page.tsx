import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { BaseConverterPage } from "./client"

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de Bases Numéricas",
    description: "Converta números inteiros instantaneamente entre Decimal (Base 10), Binário (Base 2), Hexadecimal (Base 16) e Octal (Base 8). Ideal para desenvolvedores e estudantes.",
    path: "/tools/converters/base",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Conversor de Bases Numéricas",
                    description: "Converta números inteiros instantaneamente entre Decimal (Base 10), Binário (Base 2), Hexadecimal (Base 16) e Octal (Base 8). Ideal para desenvolvedores e estudantes.",
                    categoryLabel: "Conversores",
                    path: "/tools/converters/base",
                    toolSlug: "base"
                })}
            />
            <BaseConverterPage />
        </>
    )
}
