import { Metadata } from "next"
import { PhoneGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Telefone e Celular - Números Válidos com DDD",
    description: "Gere números de telefone fixo e celular brasileiros válidos com DDD para testes de software. Ferramenta flexível com opções de formatação para desenvolvedores.",
}

export default function Page() {
    return <PhoneGeneratorPage />
}
