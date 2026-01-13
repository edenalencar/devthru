import { Metadata } from "next"
import { PasswordGeneratorPage } from "./client"

const title = "Gerador de Senhas Fortes e Seguras - Segurança Online"
const description = "Crie senhas fortes e invioláveis com nosso Gerador de Senhas gratuito. Personalize comprimento, símbolos e números para garantir a segurança máxima de suas contas."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <PasswordGeneratorPage />
}
