import { Metadata } from "next"
import { MockDataGeneratorPage } from "./client"

const title = "Gerador de Dados Mock (Fictícios) - JSON"
const description = "Gere dados fictícios (Mock Data) em JSON para testes e protótipos. Crie usuários, produtos e mais."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <MockDataGeneratorPage />
}
