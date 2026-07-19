import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { CreditCardGeneratorPage } from "./client"

const title = "Gerador de Cartão de Crédito"
const description = "Gerador de cartão de crédito online gratuito. Gere números de cartão de crédito válidos com nome, validade, CVV e endereço para testes de sistemas de pagamento."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/credit-card-generator",
    keywords: ["gerador de cartao de credito", "gerar cartao de credito", "cartao de credito valido", "algoritmo de luhn", "gerador cartao de credito", "dev tools", "testes de pagamento"]
})

export default function Page() {
    return (
        <>
            
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Cartão de Crédito",
                    description: "Gerador de cartão de crédito online gratuito. Gere números de cartão de crédito válidos com nome, validade, CVV e endereço para testes de sistemas de pagamento.",
                    categoryLabel: "Finanças",
                    path: "/tools/finance/credit-card-generator",
                    toolSlug: "credit-card-generator"
                })}
            />
            <CreditCardGeneratorPage />
        </>
    )
}
