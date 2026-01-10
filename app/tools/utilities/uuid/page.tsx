import { Metadata } from "next"
import { UUIDGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de UUID v4 Online - Identificador Único",
    description: "Gere UUIDs (Universally Unique Identifier) versão 4 aleatórios e seguros para seus projetos e bancos de dados.",
}

export default function Page() {
    return <UUIDGeneratorPage />
}
