import { Metadata } from "next"
import { RegexGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador e Testador de Regex Online - Expressões Regulares",
    description: "Crie, teste e valide expressões regulares (Regex) em tempo real com nossa ferramenta online. Suporte completo a flags e exemplos práticos para desenvolvedores.",
}

export default function Page() {
    return <RegexGeneratorPage />
}
