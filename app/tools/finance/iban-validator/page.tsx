import { Metadata } from "next"
import { IBANValidatorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador e Validador de IBAN - Brasil e Europa",
    description: "Gere e valide códigos IBAN para transações internacionais com precisão. Suporte a diversos países, essencial para testar integrações bancárias globais.",
}

export default function Page() {
    return <IBANValidatorPage />
}
