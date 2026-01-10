import { Metadata } from "next"
import { LGPDDataPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Dados Fictícios e Anonimizador para LGPD",
    description: "Ferramentas para gerar dados pessoais fictícios e anonimizar textos com dados sensíveis para conformidade LGPD.",
}

export default function Page() {
    return <LGPDDataPage />
}
