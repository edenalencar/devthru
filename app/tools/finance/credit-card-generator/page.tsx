import { Metadata } from "next"
import { CreditCardGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Cartão de Crédito Válido para Testes",
    description: "Gere números de cartão de crédito válidos (algoritmo de Luhn) para testes de sistemas de pagamento. Visa, Mastercard, Amex e mais.",
}

export default function Page() {
    return <CreditCardGeneratorPage />
}
