import { Metadata } from "next"
import { TituloEleitorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Título de Eleitor Válido - Completo",
    description: "Gere e valide números de Título de Eleitor válidos por estado. Ferramenta para desenvolvedores e testes de software.",
}

export default function Page() {
    return <TituloEleitorPage />
}
