import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"
import { NfeDecoderPage } from "./client"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = generateToolMetadata({
    title: "Decodificador de Chave de Acesso SEFAZ (NF-e, NFC-e, CT-e, MDF-e)",
    description: "Decodifique, valide e inspecione chaves de acesso de 44 dígitos da SEFAZ online. Extraia UF, CNPJ do emitente, modelo, série, número da nota e valide o dígito verificador.",
    path: "/tools/business/nfe-decoder",
    keywords: ["decodificador chave nfe", "validar chave de acesso sefaz", "desmembrar chave nfe", "consultar chave cte", "chave nfce 44 digitos", "calculo digito verificador nfe modulo 11"],
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Decodificador de Chave de Acesso SEFAZ (NF-e, NFC-e, CT-e, MDF-e)",
                    description: "Decodifique, valide e inspecione chaves de acesso de 44 dígitos da SEFAZ online. Extraia UF, CNPJ do emitente, modelo, série, número da nota e valide o dígito verificador.",
                    categoryLabel: "Negócios",
                    path: "/tools/business/nfe-decoder",
                    toolSlug: "nfe-decoder"
                })}
            />
            <NfeDecoderPage />
        </>
    )
}
