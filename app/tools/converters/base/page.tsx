import { Metadata } from "next"
import { BaseConverterPage } from "./client"

export const metadata: Metadata = {
    title: "Conversor de Bases - Binário, Decimal, Hexadecimal",
    description: "Converta números entre Decimal, Binário, Hexadecimal e Octal instantaneamente.",
}

export default function Page() {
    return <BaseConverterPage />
}
