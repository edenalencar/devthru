import { Metadata } from "next"
import { XMLValidatorPage } from "./client"

const title = "Validador de XML Online - Verificar Sintaxe e Formatação"
const description = "Valide a sintaxe de seus arquivos XML instantaneamente com nosso Validador de XML online. Identifique erros de formatação e tags inválidas gratuitamente."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <XMLValidatorPage />
}
