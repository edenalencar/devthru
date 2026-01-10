import { Metadata } from "next"
import { ImageConverterPage } from "./client"

export const metadata: Metadata = {
    title: "Conversor de Imagem Online - PNG, JPG, WEBP",
    description: "Converta imagens entre formatos PNG, JPG e WEBP rapidamente e sem perda de qualidade. Processamento seguro no navegador, sem upload para servidor. 100% gratuito.",
}

export default function Page() {
    return <ImageConverterPage />
}
