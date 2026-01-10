import { Metadata } from "next"
import { RegisterPage } from "./client"

export const metadata: Metadata = {
    title: "Criar Conta",
    description: "Crie sua conta no DevThru para acessar ferramentas de desenvolvimento e produtividade.",
}

export default function Page() {
    return <RegisterPage />
}
