import { Metadata } from "next"
import { UnitConverterPage } from "./client"

export const metadata: Metadata = {
    title: "Conversor de Unidades Grátis - Medidas, Pesos e Temperatura",
    description: "Converta unidades de medida instantaneamente com nosso Conversor online. Suporte para comprimento, peso, temperatura e muito mais. Prático, rápido e gratuito.",
}

export default function Page() {
    return <UnitConverterPage />
}
