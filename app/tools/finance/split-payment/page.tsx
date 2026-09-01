import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { SplitPaymentCalculatorPage } from "./client"

const title = "Simulador de Split Payment (IBS e CBS) - Reforma Tributária"
const description = "Simule o impacto do Split Payment da Reforma Tributária com retenção automática de IBS e CBS na liquidação financeira de pagamentos."

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
                    name: "Simulador e Calculadora de Split Payment",
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
