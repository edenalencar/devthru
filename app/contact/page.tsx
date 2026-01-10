import { Metadata } from "next"
import { ContactPage } from "./client"

export const metadata: Metadata = {
    title: "Entre em Contato",
    description: "Fale com a equipe do DevThru. Envie dúvidas, sugestões ou reporte bugs.",
}

export default function Page() {
    return <ContactPage />
}
