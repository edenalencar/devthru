import { Metadata } from "next"
import { LoginPage } from "./client"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Login DevHub Tools",
    description: "Faça login no DevHub Tools para acessar seu painel e utilizar todas as nossas ferramentas de desenvolvimento. Gerencie seus projetos com eficiência e rapidez.",
    alternates: {
        canonical: `${siteConfig.url}/login`,
    },
}

export default function Page() {
    return <LoginPage />
}
