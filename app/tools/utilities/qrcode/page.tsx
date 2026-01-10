import { Metadata } from "next"
import { QRCodePage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de QR Code Online - Grátis e Personalizável",
    description: "Crie QR Codes gratuitos para links, textos, wifi e contatos. Baixe em alta resolução.",
}

export default function Page() {
    return <QRCodePage />
}
