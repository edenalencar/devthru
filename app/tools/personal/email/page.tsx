import { Metadata } from "next"
import { EmailGeneratorPage } from "./client"

const title = "Gerador de Email Temporário e Fictício | DevThru"
const description = "Crie emails fictícios com domínios personalizados ou comuns para testes de software. Ferramenta rápida para QA e desenvolvimento."

export const metadata: Metadata = {
    title,
    description,
    keywords: ["gerador de email", "email temporario", "email ficticio", "testes de software", "massa de dados"],
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <EmailGeneratorPage />
}
