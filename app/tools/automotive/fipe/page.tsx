import { Metadata } from "next"
import { FipePage } from "./client"

export const metadata: Metadata = {
    title: "Tabela FIPE - Consulta Grátis",
    description: "Consulte a Tabela FIPE atualizada. Veja preços médios de carros, motos e caminhões no mercado brasileiro.",
}

export default function Page() {
    return <FipePage />
}
