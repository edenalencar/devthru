import { Metadata } from "next"
import { PlaceholderGeneratorPage } from "./client"

const title = "Gerador de Imagem Placeholder - Tamanho Personalizado"
const description = "Crie imagens placeholder (dummy image) com tamanho, cores e texto personalizados para protótipos e layouts."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <PlaceholderGeneratorPage />
}
