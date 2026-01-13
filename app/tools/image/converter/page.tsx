import { Metadata } from "next"
import { ImageConverterPage } from "./client"

const title = "Conversor de Imagem Online Grátis - PNG, JPG e WEBP"
const description = "Converta imagens entre formatos PNG, JPG e WEBP rapidamente e sem perda de qualidade. Processamento seguro no navegador, sem upload para servidor. 100% gratuito."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <ImageConverterPage />
}
