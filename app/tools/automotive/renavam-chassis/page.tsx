import { Metadata } from "next"
import { RenavamChassisPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Chassi e RENAVAM Online - Válido para Testes",
    description: "Gerador de Chassi (VIN) e RENAVAM online e gratuito. Gere códigos válidos para testes de software de forma rápida e segura.",
}

export default function Page() {
    return <RenavamChassisPage />
}
