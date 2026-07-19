import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { TimestampConverterPage } from "./client"

const title = "Conversor de Timestamp Unix"
const description = "Converta timestamps Unix (segundos/milissegundos) para datas legíveis e vice-versa. Ferramenta online essencial para desenvolvedores, com suporte a múltiplos formatos."

export const metadata: Metadata = generateToolMetadata({
    title: "Conversor de Timestamp Unix",
    description: "Converta timestamps Unix (segundos ou milissegundos) para datas legíveis e vice-versa. Ferramenta online gratuita para devs, com múltiplos formatos.",
    path: "/tools/development/timestamp",
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Conversor de Timestamp Unix",
                    description: "Converta timestamps Unix (segundos/milissegundos) para datas legíveis e vice-versa. Ferramenta online essencial para desenvolvedores, com suporte a múltiplos formatos.",
                    categoryLabel: "Desenvolvimento",
                    path: "/tools/development/timestamp",
                    toolSlug: "timestamp"
                })}
            />
            <TimestampConverterPage />
        </>
    )
}
