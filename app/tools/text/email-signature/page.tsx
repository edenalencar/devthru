import { Metadata } from "next"
import { EmailSignaturePage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Assinatura de Email Grátis Profissional Online",
    description: "Crie assinaturas de email profissionais e personalizadas com nosso gerador gratuito. Compatível com Gmail, Outlook e outros. Adicione logo e links sociais.",
}

export default function Page() {
    return <EmailSignaturePage />
}
