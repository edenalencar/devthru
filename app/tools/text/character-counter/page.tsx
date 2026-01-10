import { Metadata } from "next"
import { CharacterCounterPage } from "./client"

export const metadata: Metadata = {
    title: "Contador de Caracteres e Palavras Online",
    description: "Conte caracteres, palavras, linhas e parágrafos do seu texto em tempo real. Ferramenta online gratuita ideal para redatores, estudantes e profissionais de SEO.",
}

export default function Page() {
    return <CharacterCounterPage />
}
