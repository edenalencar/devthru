import { Metadata } from "next"
import { CaseConverterPage } from "./client"

const title = "Conversor de Case - Maiúsculas e Minúsculas"
const description = "Transforme textos para UPPERCASE, lowercase, camelCase, Title Case e mais instantaneamente."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <CaseConverterPage />
}
