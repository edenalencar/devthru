import { Metadata } from "next"
import { LoremIpsumPage } from "./client"

const title = "Gerador de Lorem Ipsum - Texto de Preenchimento"
const description = "Gere texto Lorem Ipsum personalizado para seus projetos. Crie parágrafos, frases e listas aleatórias para preencher layouts e protótipos de design com facilidade."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <LoremIpsumPage />
}
