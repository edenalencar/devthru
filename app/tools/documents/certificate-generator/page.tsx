import { Metadata } from "next"
import { CertificateGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Certificados Online - Cursos e Eventos",
    description: "Crie certificados profissionais para cursos, workshops e eventos. Personalize e baixe em PDF gratuitamente.",
}

export default function Page() {
    return <CertificateGeneratorPage />
}
