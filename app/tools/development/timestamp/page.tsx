import { Metadata } from "next"
import { TimestampConverterPage } from "./client"

export const metadata: Metadata = {
    title: "Conversor de Timestamp Online - Unix para Data e Vice-Versa",
    description: "Converta timestamps Unix (segundos/milissegundos) para datas legíveis e vice-versa. Ferramenta essencial para desenvolvedores.",
}

export default function Page() {
    return <TimestampConverterPage />
}
