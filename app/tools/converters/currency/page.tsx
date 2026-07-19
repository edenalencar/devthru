import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CurrencyConverterPage } from "./client"

const title = "Conversor de Moedas Online"
const description = "Converta moedas como Dólar, Euro, Libra e Real com cotação atualizada diariamente. Conversor de câmbio online, gratuito, rápido e sem necessidade de cadastro."

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de Moedas Online",
    description: "Converta moedas como Dólar, Euro, Libra e Real com cotação atualizada diariamente. Conversor de câmbio online, gratuito, rápido e sem necessidade de cadastro.",
    path: "/tools/converters/currency",
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Conversor de Moedas Online",
                    description: "Converta moedas como Dólar, Euro, Libra e Real com cotação atualizada diariamente. Conversor de câmbio online, gratuito, rápido e sem necessidade de cadastro.",
                    categoryLabel: "Conversores",
                    path: "/tools/converters/currency",
                    toolSlug: "currency"
                })}
            />
            <CurrencyConverterPage />
        </>
    )
}
