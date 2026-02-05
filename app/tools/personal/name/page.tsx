import { Metadata } from "next"
import { NameGeneratorPage } from "./client"

const title = "Gerador de Nomes e Pessoas Brasileiras Aleatórios | DevThru"
const description = "Crie nomes e sobrenomes brasileiros aleatórios para testes e personagens. Ideal para gerar massa de dados para testes de software. Filtragem por gênero disponível."

export const metadata: Metadata = {
    title,
    description,
    keywords: ["gerador de nomes", "gerador de nome", "gerador de pessoas", "nomes aleatorios", "massa de dados"],
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <NameGeneratorPage />
}
