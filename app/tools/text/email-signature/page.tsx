import { Metadata } from "next"
import { EmailSignaturePage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Assinatura de Email Grátis",
    description: "Crie assinaturas de email profissionais para Gmail, Outlook e outros. Adicione logo, links e cores.",
}

export default function Page() {
    return <EmailSignaturePage />
}
