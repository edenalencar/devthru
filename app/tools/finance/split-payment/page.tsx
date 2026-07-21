import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { SplitPaymentCalculatorPage } from "./client"

const title = "Simulador e Calculadora de Split Payment (Reforma Tributária IBS/CBS)"
const description = "Simulador de Split Payment online gratuito da Reforma Tributária. Calcule a retenção automática de IBS e CBS no ato do pagamento (Pix, Cartão, Boleto) e o repasse líquido no caixa do seu ERP ou e-commerce."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/split-payment",
    keywords: [
        "split payment",
        "calculadora split payment",
        "reforma tributaria",
        "simulador ibs cbs",
        "split payment pix",
        "split payment erp",
        "retenção automatica imposto",
        "nfe split payment",
        "dev tools"
    ]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Simulador de Split Payment (Reforma Tributária IBS/CBS)",
                    description,
                    categoryLabel: "Finanças",
                    path: "/tools/finance/split-payment",
                    toolSlug: "split-payment"
                })}
            />
            <SplitPaymentCalculatorPage />
        </>
    )
}
