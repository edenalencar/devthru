import { Metadata } from "next"
import { ImageConverterPage } from "./client"

export const metadata: Metadata = {
    title: "Conversor de Imagem Online - PNG, JPG, WEBP",
    description: "Converta imagens entre formatos PNG, JPG e WEBP gratuitamente online. Rápido, seguro e sem upload para servidor.",
}

export default function Page() {
    return <ImageConverterPage />
}
