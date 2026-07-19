import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { MinifierPage } from "./client"

const title = "Minificador de Código - CSS, JSON, SQL, HTML e JS"
const description = "Minifique e formate (beautify) códigos CSS, JSON, SQL, HTML e JavaScript online. Reduza o tamanho dos arquivos e melhore a performance do seu site gratuitamente."

export const metadata: Metadata = generateToolMetadata({
    title: "Minificador de Código - CSS, JSON, SQL, HTML e JS",
    description: "Minifique e formate códigos CSS, JSON, SQL, HTML e JS online. Reduza o tamanho de arquivos e melhore a performance do seu site gratuitamente.",
    path: "/tools/development/minifier",
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Minificador de Código - CSS, JSON, SQL, HTML e JS",
                    description: "Minifique e formate (beautify) códigos CSS, JSON, SQL, HTML e JavaScript online. Reduza o tamanho dos arquivos e melhore a performance do seu site gratuitamente.",
                    categoryLabel: "Desenvolvimento",
                    path: "/tools/development/minifier",
                    toolSlug: "minifier"
                })}
            />
            <MinifierPage />
        </>
    )
}
