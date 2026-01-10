import { Metadata } from "next"
import { PersonGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Pessoa", // "Gerador de Pessoa Completa" is in H1, title tag can be shorter or same
    description: "Gere perfis de teste realistas com o Gerador de Pessoa Completa. Crie nomes, CPFs, RGs, endereços e e-mails fictícios para acelerar o desenvolvimento de software.",
}

export default function Page() {
    return <PersonGeneratorPage />
}
