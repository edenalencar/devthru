import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { TimestampConverterPage } from "./client"

const title = "Conversor de Unix Timestamp (Epoch) Online - Grátis"
const description = "Converta timestamps Unix em datas legíveis e datas em segundos/milissegundos Epoch em tempo real com suporte a múltiplos fusos horários."

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
