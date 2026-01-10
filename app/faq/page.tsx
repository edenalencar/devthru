import { Metadata } from "next"
import { FAQPage } from "./client"

export const metadata: Metadata = {
    title: "Perguntas Frequentes (FAQ)",
    description: "Tire suas dúvidas sobre o DevThru, planos, preços, API e privacidade.",
}

export default function Page() {
    return <FAQPage />
}
