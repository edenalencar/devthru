import { Metadata } from "next"
import { LoremIpsumPage } from "./client"

export const metadata: Metadata = {
    title: "Gerador de Lorem Ipsum - Texto de Preenchimento",
    description: "Gere parágrafos, frases e palavras de Lorem Ipsum para seus layouts, designs e protótipos.",
}

export default function Page() {
    return <LoremIpsumPage />
}
