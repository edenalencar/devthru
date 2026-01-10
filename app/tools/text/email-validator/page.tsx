import { Metadata } from "next"
import { EmailValidatorPage } from "./client"

export const metadata: Metadata = {
    title: "Validador de Email - Verificador de Email Completo",
    description: "Verifique se um endereço de email é válido, se o formato está correto e se é um email temporário.",
}

export default function Page() {
    return <EmailValidatorPage />
}
