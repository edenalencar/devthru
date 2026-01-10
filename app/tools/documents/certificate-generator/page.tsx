import { Metadata } from "next"
import { CertificateGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Certificados Online Grátis - Cursos e Eventos",
    description: "Crie certificados personalizados para cursos e eventos em minutos. Gere arquivos PDF prontos para impressão com nosso gerador online gratuito e profissional.",
}

export default function Page() {
    return <CertificateGeneratorPage />
}
