import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { QRCodePage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Gerador de QR Code Personalizado Online - Grátis"
const description = "Crie códigos QR para links, textos, Wi-Fi e contatos com personalização de cores e download em alta resolução PNG e SVG grátis."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/utilities/qrcode",
    keywords: ["qr code generator", "criar qr code", "qr code online", "gerador codigo qr"]
})

export default function Page() {
    return (
        <>

            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de QR Code Online",
                    description: "Crie QR Codes personalizados gratuitamente para links, textos, redes wifi e contatos. Baixe em alta resolução nos formatos PNG e SVG. Sem cadastro necessário.",
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/qrcode",
                    toolSlug: "qrcode"
                })}
            />
            <QRCodePage />
        </>
    )
}
