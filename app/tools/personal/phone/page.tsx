import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { PhoneGeneratorPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Gerador de Telefone Online"
const description = "Gere números de telefone celular e fixo válidos do Brasil (com DDD) e dos Estados Unidos (EUA) para testes de software. Obtenha números limpos ou formatados."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/personal/phone",
    keywords: [
        "gerador de telefone celular",
        "gerador de telefone fixo",
        "gerador de telefone com sms",
        "gerador de celular com sms",
        "gerador de numero de celular brasil",
        "gerador de telefone estados unidos",
        "gerador de telefone eua",
        "gerador de celular temporario",
        "gerador de telefone valido",
        "gerador de celular aleatorio",
        "gerar celular fake",
        "numeros de telefone para teste"
    ]
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Telefone Online",
                    description: "Gere números de telefone celular e fixo válidos do Brasil (com DDD) e dos Estados Unidos (EUA) para testes de software. Obtenha números limpos ou formatados.",
                    categoryLabel: "Pessoal",
                    path: "/tools/personal/phone",
                    toolSlug: "phone"
                })}
            />
            <PhoneGeneratorPage />
        </>
    )
}
