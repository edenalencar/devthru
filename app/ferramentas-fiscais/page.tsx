import { Metadata } from "next"
import { FiscalToolsHubPage } from "./client"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
    title: "Suíte de Ferramentas Fiscais e Empresariais para Desenvolvedores",
    description: "Gere dados de teste para sistemas de faturamento e ERPs. NF-e, CT-e, MDF-e, NFC-e, CNPJ, CNAE e mais. Grátis, sem cadastro, focado em homologação.",
    alternates: {
        canonical: `${siteConfig.url}/ferramentas-fiscais`,
    },
}

export default function Page() {
    return <FiscalToolsHubPage />
}
