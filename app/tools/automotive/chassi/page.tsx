import { Metadata } from "next"
import { ChassiGeneratorPage } from "./client"

const title = "Gerador de Chassi Online Grátis - VIN Válido para Testes"
const description = "Gerador de chassi online grátis! Crie códigos VIN (Vehicle Identification Number) válidos em 1 clique para testes de software. Rápido, seguro e sem cadastro."

export const metadata: Metadata = {
    title,
    description,
    keywords: [
        "gerador de chassi",
        "gerar chassi",
        "gerador de chassi online",
        "chassi válido",
        "VIN generator",
        "número de chassi",
        "chassi veicular",
    ],
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return <ChassiGeneratorPage />
}
