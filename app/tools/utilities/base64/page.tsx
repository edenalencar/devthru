import { Metadata } from "next"
import { Base64Page } from "./client"

const title = "Codificador e Decodificador Base64 Online"
const description = "Codifique e decodifique textos e strings em Base64 instantaneamente. Ferramenta essencial para desenvolvedores que precisam transmitir dados binários em texto."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <Base64Page />
}
