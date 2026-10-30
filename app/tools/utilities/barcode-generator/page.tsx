import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"
import { BarcodeGeneratorPage } from "./client"

const title = "Gerador de Código de Barras: EAN-13"
const description = "Gere códigos de barras EAN-13 e Code 128 online. Calcule o dígito verificador automático e baixe em SVG ou PNG para produtos e etiquetas."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/utilities/barcode-generator",
    keywords: [
        "gerador de codigo de barras",
        "codigo de barras ean 13",
        "gerador ean13",
        "barcode generator",
        "gerador code 128",
        "digito verificador ean 13",
        "etiqueta codigo de barras",
        "gs1 brasil codigo de barras"
    ]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Código de Barras Online: EAN-13 e Code 128",
                    description,
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/barcode-generator",
                    toolSlug: "barcode-generator"
                })}
            />
            <BarcodeGeneratorPage />
        </>
    )
}

