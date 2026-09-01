import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { PixParserPage } from "./client"

const title = "Decodificador Pix Copia e Cola (EMV) e QR Code - Grátis"
const description = "Decodifique payloads Pix EMV, altere valores em tempo real, recalcule o checksum CRC16 e visualize o QR Code para testes de pagamento."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/pix-parser",
    keywords: [
        "decodificar pix copia e cola",
        "gerar qr code a partir de pix copia e cola",
        "alterar valor do pix copia e cola",
        "parser emv pix",
        "ler chave pix copia e cola",
        "recalcular crc16 pix",
        "pix copia e cola no pc"
    ]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Decodificador e Gerador de Pix",
                    description: "Cole uma string de Pix Copia e Cola para decodificar todos os dados do recebedor (nome, chave, valor), gerar o QR Code correspondente na tela ou alterar o valor de um Pix estático com recalculo de CRC16.",
                    categoryLabel: "Finanças",
                    path: "/tools/finance/pix-parser",
                    toolSlug: "pix-parser"
                })}
            />
            <PixParserPage />
        </>
    )
}
