import { Metadata } from "next"
import { QRCodePage } from "./client"

const title = "Gerador de QR Code Online - Grátis e Personalizável"
const description = "Crie QR Codes gratuitos para links, textos, wifi e contatos. Baixe em alta resolução."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <QRCodePage />
}
