import { Metadata } from "next"
import { AddressGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Endereços Brasileiros Válidos - CEP e Rua",
    description: "Gere endereços brasileiros completos com CEP, rua, bairro e cidade para testes de sistemas e formulários.",
}

export default function Page() {
    return <AddressGeneratorPage />
}
