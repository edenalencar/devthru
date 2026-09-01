import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { PixelToRemPage } from "./client"

const title = "Conversor de Pixel (px) para REM e EM Online - Grátis"
const description = "Converta valores de Pixels (px) para REM e EM com base de fonte configurável (16px) e gere regras CSS prontas para design responsivo."

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de Pixel para REM",
    description: "Converta pixels (px) para rem e rem para pixels (px) facilmente. Calculadora essencial para desenvolvedores front-end e web designers.",
    path: "/tools/converters/pixel-to-rem",
    keywords: ["px to rem", "rem to px", "converter pixel rem", "calculadora css", "unidades css", "web design"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Conversor de Pixel para REM",
                    description: "Converta pixels (px) para rem e rem para pixels (px) facilmente. Calculadora essencial para desenvolvedores front-end e web designers.",
                    categoryLabel: "Conversores",
                    path: "/tools/converters/pixel-to-rem",
                    toolSlug: "pixel-to-rem"
                })}
            />
            <PixelToRemPage />
        </>
    )
}
