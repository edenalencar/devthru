import { Metadata } from "next"
import { LGPDDataPage } from "./client"

const title = "Gerador de Dados Fictícios e Anonimizador para LGPD"
const description = "Ferramentas para gerar dados pessoais fictícios e anonimizar textos com dados sensíveis para conformidade LGPD."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <LGPDDataPage />
}
