import { Metadata } from "next"
import { EmailGeneratorPage } from "./client"

const title = "Gerador de Email Temporário e Fictício para Testes"
const description = "Crie emails fictícios com domínios personalizados ou comuns para testes de software. Ferramenta rápida e fácil."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <EmailGeneratorPage />
}
