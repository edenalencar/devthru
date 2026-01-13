import { Metadata } from "next"
import { TituloEleitorPage } from "./client"

const title = "Gerador de Título de Eleitor Válido - Completo"
const description = "Gere e valide números de Título de Eleitor válidos por estado. Ferramenta para desenvolvedores e testes de software."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <TituloEleitorPage />
}
