import { Metadata } from "next"
import { FaviconGeneratorPage } from "./client"

const title = "Gerador de Favicon Online - Ícones para Sites"
const description = "Crie favicons personalizados para seu site a partir de imagens. Gere todos os tamanhos e formatos necessários."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <FaviconGeneratorPage />
}
