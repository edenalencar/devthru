import { Metadata } from "next"
import { MinifierPage } from "./client"

const title = "Minificador de Código - CSS, JSON, SQL, HTML e JS"
const description = "Minifique e formate (beautify) seus códigos CSS, JSON, SQL e HTML online para melhorar a performance."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <MinifierPage />
}
