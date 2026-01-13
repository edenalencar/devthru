import { Metadata } from "next"
import { RegexGeneratorPage } from "./client"

const title = "Gerador e Testador de Regex - Validar Expressões Regulares"
const description = "Crie, teste e valide expressões regulares (Regex) em tempo real com nossa ferramenta online. Suporte completo a flags e exemplos práticos para desenvolvedores."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <RegexGeneratorPage />
}
