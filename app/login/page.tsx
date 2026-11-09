import { Metadata } from "next"
import { LoginPage } from "./client"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Entrar na Conta | DevThru",
    description: "Faça login no DevThru para acessar seu painel e usar todas as nossas ferramentas.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: `${siteConfig.url}/login`,
    },
}

export default function Page() {
    return <LoginPage />
}
