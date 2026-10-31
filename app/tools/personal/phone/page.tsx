import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { PhoneGeneratorPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Gerador de Número de Telefone e Celular (com DDD)"
const description = "Gere números de telefone e celular válidos com DDD (Brasil e EUA) para testes de software. Fixo ou celular, formatados ou limpos, em lote e grátis."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/personal/phone",
    keywords: [
        "gerador de telefone celular",
        "gerador de telefone fixo",
        "gerador de telefone valido",
        "gerador de numero de celular brasil",
        "gerador de celular com ddd",
        "gerador de ddd",
        "gerador de telefone eua",
        "gerador de celular aleatorio",
        "gerador de telefone em massa",
        "gerar celular fake para teste",
        "numeros de telefone para teste",
        "validar telefone celular regex"
    ]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Telefone e Celular Válido",
                    description,
                    categoryLabel: "Pessoal",
                    path: "/tools/personal/phone",
                    toolSlug: "phone"
                })}
            />
            <PhoneGeneratorPage />
        </>
    )
}
