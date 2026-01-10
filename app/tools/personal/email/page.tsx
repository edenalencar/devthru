import { Metadata } from "next"
import { EmailGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Email Temporário e Fictício para Testes",
    description: "Crie emails fictícios com domínios personalizados ou comuns para testes de software. Ferramenta rápida e fácil.",
}

export default function Page() {
    return <EmailGeneratorPage />
}
