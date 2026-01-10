import { Metadata } from "next"
import { Base64Page } from "./client"

export const metadata: Metadata = {
    title: "Codificador e Decodificador Base64 Online",
    description: "Codifique e decodifique textos e strings em Base64 instantaneamente. Ferramenta essencial para desenvolvedores que precisam transmitir dados binários em texto.",
}

export default function Page() {
    return <Base64Page />
}
