import { Metadata } from "next"
import { AddressGeneratorPage } from "./client"

const title = "Gerador de Endereços Brasileiros Válidos - CEP e Rua"
const description = "Gere endereços brasileiros completos com CEP, rua, bairro e cidade para testes de sistemas e formulários."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <AddressGeneratorPage />
}
