import { Metadata } from "next"
import { PricingPage } from "./client"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Planos e Preços",
    description: "Conheça os planos da DevHub Tools e desbloqueie ferramentas ilimitadas. Escolha a opção ideal para aumentar sua produtividade e escalar seus projetos de desenvolvimento.",
    alternates: {
        canonical: `${siteConfig.url}/pricing`,
    },
}

export default function Page() {
    return <PricingPage />
}
