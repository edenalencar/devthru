import { Metadata } from "next"
import { CertificateGeneratorPage } from "./client"

const title = "Gerador de Certificados Online Grátis - Cursos e Eventos"
const description = "Crie certificados personalizados para cursos e eventos em minutos. Gere arquivos PDF prontos para impressão com nosso gerador online gratuito e profissional."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <CertificateGeneratorPage />
}
