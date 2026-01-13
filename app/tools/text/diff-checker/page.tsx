import { Metadata } from "next"
import { DiffCheckerPage } from "./client"

const title = "Comparador de Texto Online - Diff Checker de Código e Texto"
const description = "Compare dois textos e visualize as diferenças instantaneamente com nosso Diff Checker online. Identifique adições e remoções por caractere, palavra ou linha."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <DiffCheckerPage />
}
