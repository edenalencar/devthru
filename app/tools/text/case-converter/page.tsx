import { Metadata } from "next"
import { CaseConverterPage } from "./client"

export const metadata: Metadata = {
    title: "Conversor de Case - Maiúsculas e Minúsculas",
    description: "Transforme textos para UPPERCASE, lowercase, camelCase, Title Case e mais instantaneamente.",
}

export default function Page() {
    return <CaseConverterPage />
}
