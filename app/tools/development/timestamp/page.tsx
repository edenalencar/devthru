import { Metadata } from "next"
import { TimestampConverterPage } from "./client"

const title = "Conversor de Timestamp Online - Unix para Data e Vice-Versa"
const description = "Converta timestamps Unix (segundos/milissegundos) para datas legíveis e vice-versa. Ferramenta essencial para desenvolvedores."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <TimestampConverterPage />
}
