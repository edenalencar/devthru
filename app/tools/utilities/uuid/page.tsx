import { Metadata } from "next"
import { UUIDGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de UUID v4 Online - Identificador Único",
    description: "Gere UUIDs (v4) únicos e seguros aleatoriamente para seus projetos e bancos de dados. Identificadores universais prontos para uso em desenvolvimento de software.",
}

export default function Page() {
    return <UUIDGeneratorPage />
}
