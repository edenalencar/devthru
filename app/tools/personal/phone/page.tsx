import { Metadata } from "next"
import { PhoneGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Telefone e Celular Brasileiro - Online",
    description: "Gere números de telefone e celular brasileiros válidos com DDD para testes. Opção com ou sem formatação.",
}

export default function Page() {
    return <PhoneGeneratorPage />
}
