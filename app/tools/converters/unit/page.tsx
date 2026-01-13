import { Metadata } from "next"
import { UnitConverterPage } from "./client"

const title = "Conversor de Unidades Grátis - Medidas, Pesos e Temperatura"
const description = "Converta unidades de medida instantaneamente com nosso Conversor online. Suporte para comprimento, peso, temperatura e muito mais. Prático, rápido e gratuito."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <UnitConverterPage />
}
