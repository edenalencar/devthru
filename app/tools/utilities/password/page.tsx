import { Metadata } from "next"
import { PasswordGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Senhas Fortes e Seguras - Segurança Online",
    description: "Crie senhas fortes e invioláveis com nosso Gerador de Senhas gratuito. Personalize comprimento, símbolos e números para garantir a segurança máxima de suas contas.",
}

export default function Page() {
    return <PasswordGeneratorPage />
}
