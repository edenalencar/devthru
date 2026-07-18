import { Metadata } from "next"
import { FAQPage } from "./client"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Perguntas Frequentes (FAQ)",
    description: "Tire suas dúvidas sobre o DevThru, planos, preços, API e privacidade.",
    alternates: {
        canonical: `${siteConfig.url}/faq`,
    },
}

export default function Page() {
    return <FAQPage />
}
