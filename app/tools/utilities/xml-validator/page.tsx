import { Metadata } from "next"
import { XMLValidatorPage } from "./client"

export const metadata: Metadata = {
    title: "Validador de XML Online - Verificar Sintaxe",
    description: "Valide a sintaxe de seus arquivos XML instantaneamente com nosso Validador de XML online. Identifique erros de formatação e tags inválidas gratuitamente.",
}

export default function Page() {
    return <XMLValidatorPage />
}
