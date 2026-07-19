import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { OCRPage } from "./client"

export const metadata: Metadata = generateToolMetadata({
    title: "OCR Online Gratuito",
    description: "Extraia texto de imagens (JPG, PNG) e documentos instantaneamente com OCR gratuito. Converta fotos em texto editável sem instalar programas.",
    path: "/tools/image/ocr",
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "OCR Online Gratuito",
                    description: "Extraia texto de imagens (JPG, PNG) e documentos instantaneamente com OCR gratuito. Converta fotos em texto editável sem instalar programas.",
                    categoryLabel: "Imagem",
                    path: "/tools/image/ocr",
                    toolSlug: "ocr"
                })}
            />
            <OCRPage />
        </>
    )
}
