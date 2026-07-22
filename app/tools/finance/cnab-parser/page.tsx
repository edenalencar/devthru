import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CnabParserPage } from "./client"

const title = "Leitor e Decodificador de CNAB Online (CNAB 240 / 400)"
const description = "Decodifique, inspecione e valide arquivos de remessa e retorno CNAB 240 e CNAB 400 da FEBRABAN online. Analise posições, registros, ocorrências e erros de leiaute gratuitamente."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/cnab-parser",
    keywords: [
        "leitor cnab online",
        "decodificador cnab",
        "cnab 240",
        "cnab 400",
        "validar arquivo remessa cnab",
        "validar arquivo retorno cnab",
        "parser cnab febraban",
        "visualizador cnab"
    ]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Leitor e Decodificador de CNAB (CNAB 240 / 400)",
                    description: "Decodifique, inspecione e valide arquivos de remessa e retorno CNAB 240 e CNAB 400 da FEBRABAN online. Analise posições, registros, ocorrências e erros de leiaute gratuitamente.",
                    categoryLabel: "Finanças",
                    path: "/tools/finance/cnab-parser",
                    toolSlug: "cnab-parser"
                })}
            />
            <CnabParserPage />
        </>
    )
}
