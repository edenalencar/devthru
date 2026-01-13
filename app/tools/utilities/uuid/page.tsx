import { Metadata } from "next"
import { UUIDGeneratorPage } from "./client"

const title = "Gerador de UUID v4 Online - Identificador Único Universal"
const description = "Gere UUIDs (v4) únicos e seguros aleatoriamente para seus projetos e bancos de dados. Identificadores universais prontos para uso em desenvolvimento de software."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <UUIDGeneratorPage />
}
