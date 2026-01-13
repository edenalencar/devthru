import { Metadata } from "next"
import { EmailValidatorPage } from "./client"

const title = "Validador de Email - Verificador de Email Completo"
const description = "Verifique se um endereço de email é válido, se o formato está correto e se é um email temporário."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <EmailValidatorPage />
}
