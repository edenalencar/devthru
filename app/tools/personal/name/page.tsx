import { Metadata } from "next"
import { NameGeneratorPage } from "./client"

const title = "Gerador de Nomes Brasileiros Aleatórios - Nome e Sobrenome"
const description = "Crie nomes e sobrenomes brasileiros aleatórios para testes e personagens. Filtragem por gênero disponível."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <NameGeneratorPage />
}
