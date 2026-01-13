import { Metadata } from "next"
import { RenavamChassisPage } from "./client"

const title = "Gerador de Chassi e RENAVAM Online - Válido para Testes"
const description = "Gerador de Chassi (VIN) e RENAVAM online e gratuito. Gere códigos válidos para testes de software de forma rápida e segura."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <RenavamChassisPage />
}
