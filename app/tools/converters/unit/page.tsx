import { Metadata } from "next"
import { UnitConverterPage } from "./client"

export const metadata: Metadata = {
    title: "Conversor de Unidades - Medidas, Pesos e Temperaturas",
    description: "Converta unidades de comprimento, peso, volume, temperatura e área. Ferramenta online e gratuita.",
}

export default function Page() {
    return <UnitConverterPage />
}
