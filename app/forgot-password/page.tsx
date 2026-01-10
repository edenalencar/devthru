import { Metadata } from "next"
import { ForgotPasswordPage } from "./client"

export const metadata: Metadata = {
    title: "Recuperar Senha",
    description: "Recupere o acesso à sua conta DevThru.",
}

export default function Page() {
    return <ForgotPasswordPage />
}
