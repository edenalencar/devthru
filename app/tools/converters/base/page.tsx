import { Metadata } from "next"
import { BaseConverterPage } from "./client"

export const metadata: Metadata = {
    title: "Conversor de Bases Numéricas - Binário, Decimal, Hexadecimal",
    description: "Converta números entre bases Decimal, Binária, Hexadecimal e Octal instantaneamente. Ferramenta essencial para estudantes e programadores que trabalham com bits.",
}

export default function Page() {
    return <BaseConverterPage />
}
