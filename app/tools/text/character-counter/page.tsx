import { Metadata } from "next"
import { CharacterCounterPage } from "./client"

const title = "Contador de Caracteres, Palavras e Linhas Online Grátis"
const description = "Conte caracteres, palavras, linhas e parágrafos do seu texto em tempo real. Ferramenta online gratuita ideal para redatores, estudantes e profissionais de SEO."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <CharacterCounterPage />
}
