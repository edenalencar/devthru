import { Metadata } from "next"
import { CreditCardGeneratorPage } from "./client"

const title = "Gerador de Cartão de Crédito Válido para Testes"
const description = "Gere números de cartão de crédito válidos (algoritmo de Luhn) para testes de sistemas de pagamento. Visa, Mastercard, Amex e mais."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <CreditCardGeneratorPage />
}
