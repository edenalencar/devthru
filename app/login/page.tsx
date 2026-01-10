import { Metadata } from "next"
import { LoginPage } from "./client"

export const metadata: Metadata = {
    title: "Login",
    description: "Acesse sua conta no DevThru para usar todas as ferramentas de desenvolvimento.",
}

export default function Page() {
    return <LoginPage />
}
