import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { NfceGeneratorPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Chave NFC-e",
    description: "Gere chaves de acesso válidas de Nota Fiscal de Consumidor Eletrônica (NFC-e) para testes de integração e homologação. Ferramenta gratuita para devs.",
    path: "/tools/business/nfce-generator",
    keywords: ["gerador nfc-e", "chave nfc-e", "nfce teste", "consumidor eletronica", "dev tools"]
})

export default function Page() {

    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Chave NFC-e",
                    description: "Gere chaves de acesso válidas de Nota Fiscal de Consumidor Eletrônica (NFC-e) para testes de integração e homologação. Ferramenta gratuita para devs.",
                    categoryLabel: "Negócios",
                    path: "/tools/business/nfce-generator",
                    toolSlug: "nfce-generator"
                })}
            />
            <NfceGeneratorPage />
        </>
    )
}
