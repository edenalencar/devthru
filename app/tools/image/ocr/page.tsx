import { Metadata } from "next"
import { OCRPage } from "./client"

export const metadata: Metadata = {
    title: "OCR Online - Extrair Texto de Imagem (Grátis)",
    description: "Converta imagens em texto editável (OCR) online e grátis. Use nossa ferramenta para copiar texto de fotos e capturas de tela.",
}

export default function Page() {
    return <OCRPage />
}
