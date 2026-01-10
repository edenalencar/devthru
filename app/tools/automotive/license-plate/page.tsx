import { Metadata } from "next"
import { LicensePlatePage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Placas - Mercosul e Antiga",
    description: "Gere placas de veículos nos padrões Mercosul e Antigo (Cinza) ou converta entre os modelos.",
}

export default function Page() {
    return <LicensePlatePage />
}
