import { Metadata } from "next"
import { RegisterPage } from "./client"

export const metadata: Metadata = {
    title: "Criar Conta",
    description: "Crie sua conta gratuita no DevHub Tools e acesse ferramentas essenciais para desenvolvedores. Agilize seu fluxo de trabalho e testes com nossa plataforma unificada.",
}

export default function Page() {
    return <RegisterPage />
}
