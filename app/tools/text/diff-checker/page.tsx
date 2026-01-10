import { Metadata } from "next"
import { DiffCheckerPage } from "./client"

export const metadata: Metadata = {
    title: "Comparador de Texto Online - Diff Checker de Código e Texto",
    description: "Compare dois textos e visualize as diferenças instantaneamente com nosso Diff Checker online. Identifique adições e remoções por caractere, palavra ou linha.",
}

export default function Page() {
    return <DiffCheckerPage />
}
