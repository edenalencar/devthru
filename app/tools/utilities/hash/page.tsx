import { Metadata } from "next"
import { HashGeneratorPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Hash Online - SHA-256, SHA-512 e SHA-1",
    description: "Gere hashes seguros (SHA-256, MD5, SHA-512) para proteger senhas e verificar integridade de arquivos. Ferramenta de criptografia online rápida e privada.",
}

export default function Page() {
    return <HashGeneratorPage />
}
