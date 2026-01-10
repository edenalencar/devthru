import { Metadata } from "next"
import { PersonGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Pessoa Completa - Dados Aleatórios para Teste",
    description: "Gere perfis de teste realistas com o Gerador de Pessoa Completa. Crie nomes, CPFs, RGs, endereços e e-mails fictícios para acelerar o desenvolvimento de software.",
}

export default function Page() {
    return <PersonGeneratorPage />
}
