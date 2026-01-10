import { Metadata } from "next"
import { FaviconGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Favicon Online - Ícones para Sites",
    description: "Crie favicons personalizados para seu site a partir de imagens. Gere todos os tamanhos e formatos necessários.",
}

export default function Page() {
    return <FaviconGeneratorPage />
}
