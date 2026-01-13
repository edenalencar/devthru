import { Metadata } from "next"
import { LicensePlatePage } from "./client"

const title = "Gerador de Placas - Mercosul e Antiga"
const description = "Gere placas de veículos nos padrões Mercosul e Antigo (Cinza) ou converta entre os modelos."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <LicensePlatePage />
}
