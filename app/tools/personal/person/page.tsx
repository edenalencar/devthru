import { Metadata } from "next"
import { PersonGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Pessoa", // "Gerador de Pessoa Completa" is in H1, title tag can be shorter or same
    description: "Gerador de dados pessoais completos para testes: nome, CPF, RG, endereço, email, e mais.",
}

export default function Page() {
    return <PersonGeneratorPage />
}
