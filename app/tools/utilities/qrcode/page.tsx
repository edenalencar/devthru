import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
﻿import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { QRCodePage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Gerador de QR Code Online"
const description = "Crie QR Codes personalizados gratuitamente para links, textos, redes wifi e contatos. Baixe em alta resolução nos formatos PNG e SVG. Sem cadastro necessário."

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
