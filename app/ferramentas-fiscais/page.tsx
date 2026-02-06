import { Metadata } from "next"
import { FiscalToolsHubPage } from "./client"

export const metadata: Metadata = {
    title: "Suíte de Ferramentas Fiscais e Empresariais para Desenvolvedores",
    description: "Gere dados de teste para sistemas de faturamento e ERPs. NF-e, CT-e, MDF-e, NFC-e, CNPJ, CNAE e mais. Grátis, sem cadastro, focado em homologação.",
}

export default function Page() {
    return <FiscalToolsHubPage />
}
