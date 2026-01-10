import { Metadata } from "next"
import { Base64Page } from "./client"

export const metadata: Metadata = {
    title: "Codificador e Decodificador Base64 Online",
    description: "Converta texto para Base64 e decodifique Base64 para texto. Ferramenta útil para desenvolvedores e transmissão de dados.",
}

export default function Page() {
    return <Base64Page />
}
