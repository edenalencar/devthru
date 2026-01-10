import { Metadata } from "next"
import { MockDataGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Dados Mock (Fictícios) - JSON",
    description: "Gere dados fictícios (Mock Data) em JSON para testes e protótipos. Crie usuários, produtos e mais.",
}

export default function Page() {
    return <MockDataGeneratorPage />
}
