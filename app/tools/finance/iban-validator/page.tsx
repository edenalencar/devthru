import { Metadata } from "next"
import { IBANValidatorPage } from "./client"

const title = "Gerador e Validador de IBAN Online - Brasil e Internacional"
const description = "Gere e valide códigos IBAN para transações internacionais com precisão. Suporte a diversos países, essencial para testar integrações bancárias globais."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <IBANValidatorPage />
}
