import { Metadata } from "next"
import { CharacterCounterPage } from "./client"

export const metadata: Metadata = {
    title: "Contador de Caracteres e Palavras Online",
    description: "Conte caracteres, palavras, linhas e parágrafos do seu texto em tempo real de forma gratuita.",
}

export default function Page() {
    return <CharacterCounterPage />
}
