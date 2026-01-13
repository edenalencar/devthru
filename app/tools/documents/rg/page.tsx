import { Metadata } from "next"
import { RGGeneratorPage } from "./client"

const title = "Gerador de RG - Registro Geral Válido para Testes"
const description = "Crie números de RG (Registro Geral) aleatórios e válidos para testes de validação de formulários e sistemas."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <RGGeneratorPage />
}
