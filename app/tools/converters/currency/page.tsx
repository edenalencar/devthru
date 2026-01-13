import { Metadata } from "next"
import { CurrencyConverterPage } from "./client"

const title = "Conversor de Moedas Online - Cotação Atualizada"
const description = "Converta moedas (Dólar, Euro, Real, etc) com cotação atualizada diariamente. Rápido e fácil."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <CurrencyConverterPage />
}
