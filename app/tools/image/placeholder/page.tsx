import { Metadata } from "next"
import { PlaceholderGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Imagem Placeholder - Tamanho Personalizado",
    description: "Crie imagens placeholder (dummy image) com tamanho, cores e texto personalizados para protótipos e layouts.",
}

export default function Page() {
    return <PlaceholderGeneratorPage />
}
