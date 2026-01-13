import { Metadata } from "next"
import { EmailSignaturePage } from "./client"

const title = "Gerador de Assinatura de Email Grátis Profissional Online"
const description = "Crie assinaturas de email profissionais e personalizadas com nosso gerador gratuito. Compatível com Gmail, Outlook e outros. Adicione logo e links sociais."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <EmailSignaturePage />
}
