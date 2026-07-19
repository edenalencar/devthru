import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { UnitConverterPage } from "./client"

const title = "Conversor de Medidas e Unidades Online [Grátis]"
const description = "Conversor de medidas e unidades online gratuito. Converta unidades de comprimento, peso, volume, temperatura e área instantaneamente."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/converters/unit",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Conversor de Medidas e Unidades Online [Grátis]",
                    description: "Conversor de medidas e unidades online gratuito. Converta unidades de comprimento, peso, volume, temperatura e área instantaneamente.",
                    categoryLabel: "Conversores",
                    path: "/tools/converters/unit",
                    toolSlug: "unit"
                })}
            />
            <UnitConverterPage />
        </>
    )
}
