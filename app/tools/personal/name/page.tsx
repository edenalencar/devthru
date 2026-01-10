import { Metadata } from "next"
import { NameGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Nomes Brasileiros Aleatórios - Nome e Sobrenome",
    description: "Crie nomes e sobrenomes brasileiros aleatórios para testes e personagens. Filtragem por gênero disponível.",
}

export default function Page() {
    return <NameGeneratorPage />
}
