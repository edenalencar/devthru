import { Metadata } from "next"
import { HashGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Hash Online - SHA-256, SHA-512 e SHA-1",
    description: "Crie hashes criptográficos seguros (SHA-256, SHA-512) para textos e senhas. Ferramenta online rápida.",
}

export default function Page() {
    return <HashGeneratorPage />
}
