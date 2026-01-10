import { Metadata } from "next"
import { LoginPage } from "./client"

export const metadata: Metadata = {
    title: "Login",
    description: "Faça login no DevHub Tools para acessar seu painel e utilizar todas as nossas ferramentas de desenvolvimento. Gerencie seus projetos com eficiência e rapidez.",
}

export default function Page() {
    return <LoginPage />
}
