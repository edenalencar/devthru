import { Metadata } from "next"
import { PhoneGeneratorPage } from "./client"

const title = "Gerador de Telefone e Celular - Números Válidos com DDD"
const description = "Gere números de telefone fixo e celular brasileiros válidos com DDD para testes de software. Ferramenta flexível com opções de formatação para desenvolvedores."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <PhoneGeneratorPage />
}
