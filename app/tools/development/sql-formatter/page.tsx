import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { SqlFormatterPage } from "./client"

const title = "SQL Formatter Online"
const description = "Formate, indente e organize suas queries SQL online. Suporte para PostgreSQL, MySQL, SQL Server e mais. Deixe seu código SQL legível instantaneamente."

export const metadata: Metadata = generateToolMetadata({
    title: "SQL Formatter Online",
    description: "Formate, indente e organize suas queries SQL online. Suporte para PostgreSQL, MySQL, SQL Server e mais. Deixe seu código SQL legível instantaneamente.",
    path: "/tools/development/sql-formatter",
    keywords: ["sql formatter", "formatar sql", "beautify sql", "indenar sql", "postgresql formatter", "mysql formatter", "ferramentas dev"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "SQL Formatter Online",
                    description: "Formate, indente e organize suas queries SQL online. Suporte para PostgreSQL, MySQL, SQL Server e mais. Deixe seu código SQL legível instantaneamente.",
                    categoryLabel: "Desenvolvimento",
                    path: "/tools/development/sql-formatter",
                    toolSlug: "sql-formatter"
                })}
            />
            <SqlFormatterPage />
        </>
    )
}
