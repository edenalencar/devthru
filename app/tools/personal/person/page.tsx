import { Metadata } from "next"
import { PersonGeneratorPage } from "./client"

const title = "Gerador de Pessoa Completa - Dados Aleatórios para Teste"
const description = "Gere perfis de teste realistas com o Gerador de Pessoa Completa. Crie nomes, CPFs, RGs, endereços e e-mails fictícios para acelerar o desenvolvimento de software."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <PersonGeneratorPage />
}
