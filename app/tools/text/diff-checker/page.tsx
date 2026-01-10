import { Metadata } from "next"
import { DiffCheckerPage } from "./client"

export const metadata: Metadata = {
    title: "Comparador de Texto (Diff Checker) - Diferença entre Textos",
    description: "Compare dois textos e visualize as diferenças (adições e remoções) por caractere, palavra ou linha.",
}

export default function Page() {
    return <DiffCheckerPage />
}
