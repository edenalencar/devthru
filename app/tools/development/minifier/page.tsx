import { Metadata } from "next"
import { MinifierPage } from "./client"

export const metadata: Metadata = {
    title: "Minificador de Código - CSS, JSON, SQL, HTML e JS",
    description: "Minifique e formate (beautify) seus códigos CSS, JSON, SQL e HTML online para melhorar a performance.",
}

export default function Page() {
    return <MinifierPage />
}
