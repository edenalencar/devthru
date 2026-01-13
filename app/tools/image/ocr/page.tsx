import { Metadata } from "next"
import { OCRPage } from "./client"

export const metadata: Metadata = {
    title: "OCR Online Gratuito - Extrair Texto de Imagem e PDF",
    description: "OCR Online Gratuito: Extraia texto de imagens (JPG, PNG) e documentos instantaneamente. Converta fotos em texto editável para copiar e colar sem instalar programas.",
}

export default function Page() {
    return <OCRPage />
}
