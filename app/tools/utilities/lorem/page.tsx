import { Metadata } from "next"
import { LoremIpsumPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Lorem Ipsum - Texto de Preenchimento",
    description: "Gere texto Lorem Ipsum personalizado para seus projetos. Crie parágrafos, frases e listas aleatórias para preencher layouts e protótipos de design com facilidade.",
}

export default function Page() {
    return <LoremIpsumPage />
}
