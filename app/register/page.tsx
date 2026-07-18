import { Metadata } from "next"
import { RegisterPage } from "./client"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Criar Conta Gratuita",
    description: "Crie sua conta gratuita no DevHub Tools e acesse ferramentas essenciais para desenvolvedores. Agilize seu fluxo de trabalho e testes com nossa plataforma unificada.",
    alternates: {
        canonical: `${siteConfig.url}/register`,
    },
}

export default function Page() {
    return <RegisterPage />
}
