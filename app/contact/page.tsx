import { Metadata } from "next"
import { ContactPage } from "./client"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Entre em Contato",
    description: "Fale com a equipe do DevThru. Envie dúvidas, sugestões ou reporte bugs.",
    alternates: {
        canonical: `${siteConfig.url}/contact`,
    },
}

export default function Page() {
    return <ContactPage />
}
