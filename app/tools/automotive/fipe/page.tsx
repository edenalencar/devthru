import { Metadata } from "next"
import { FipePage } from "./client"

const title = "Tabela FIPE - Consulta Grátis"
const description = "Consulte a Tabela FIPE atualizada. Veja preços médios de carros, motos e caminhões no mercado brasileiro."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <FipePage />
}
