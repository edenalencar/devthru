import { Metadata } from "next"
import { NfeGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Chave NF-e - Nota Fiscal Eletrônica",
    description: "Gere chaves de acesso de Nota Fiscal Eletrônica (NF-e) e NFC-e válidas para testes de integração.",
}

export default function Page() {
    return <NfeGeneratorPage />
}
