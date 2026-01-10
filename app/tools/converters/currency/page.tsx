import { Metadata } from "next"
import { CurrencyConverterPage } from "./client"

export const metadata: Metadata = {
    title: "Conversor de Moedas Online - Cotação Atualizada",
    description: "Converta moedas (Dólar, Euro, Real, etc) com cotação atualizada diariamente. Rápido e fácil.",
}

export default function Page() {
    return <CurrencyConverterPage />
}
