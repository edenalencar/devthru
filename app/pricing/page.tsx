import { Metadata } from "next"
import { PricingPage } from "./client"

export const metadata: Metadata = {
    title: "Planos e Preços",
    description: "Escolha o melhor plano para suas necessidades de desenvolvimento e produtividade.",
}

export default function Page() {
    return <PricingPage />
}
