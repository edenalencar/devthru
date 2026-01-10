import { Metadata } from "next"
import { CnaeSearchPage } from "./client"

export const metadata: Metadata = {
    title: "Busca de CNAE - Classificação Nacional de Atividades",
    description: "Pesquise códigos e descrições da Classificação Nacional de Atividades Econômicas (CNAE) atualizados via IBGE.",
}

export default function Page() {
    return <CnaeSearchPage />
}
