import { Metadata } from "next"
import { PasswordGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Senhas Fortes e Seguras - Segurança Online",
    description: "Crie senhas fortes, aleatórias e seguras com letras, números e símbolos. Proteja suas contas.",
}

export default function Page() {
    return <PasswordGeneratorPage />
}
