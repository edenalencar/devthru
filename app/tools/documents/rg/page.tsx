import { Metadata } from "next"
import { RGGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de RG - Registro Geral Válido para Testes",
    description: "Crie números de RG (Registro Geral) aleatórios e válidos para testes de validação de formulários e sistemas.",
}

export default function Page() {
    return <RGGeneratorPage />
}
