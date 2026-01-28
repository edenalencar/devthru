import { Metadata } from "next"
import { RenavamGeneratorPage } from "./client"

const title = "Gerador de RENAVAM Online Grátis - Código Válido para Testes"
const description = "Gerador de RENAVAM online e gratuito! Gere números de RENAVAM válidos (11 dígitos) para testes de sistemas automotivos. Rápido, seguro e sem cadastro."

export const metadata: Metadata = {
    title,
    description,
    keywords: [
        "gerador de renavam",
        "gerar renavam",
        "renavam válido",
        "número renavam",
        "renavam online",
        "gerador renavam grátis",
    ],
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <RenavamGeneratorPage />
}
