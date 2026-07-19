import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { PixPlatePage } from './client'
import { generateToolMetadata } from "@/lib/seo-config"

const title = 'Gerador de Placa Pix de Balcão'
const description = 'Crie e imprima sua Placa Pix de balcão grátis. Personalize com QR Code, logotipo, nome, redes sociais e baixe em PDF de alta qualidade ou PNG.'

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/finance/placa-pix",
    keywords: ["gerador de placa pix", "placa pix para imprimir", "gerar placa pix gratis", "placa pix de balcao", "placa pix pdf", "qr code pix", "design placa pix", "receber por pix", "dev tools"]
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Placa Pix",
                    description: "Ferramenta online gratuita para Placa Pix.",
                    categoryLabel: "Finanças",
                    path: "/tools/finance/placa-pix",
                    toolSlug: "placa-pix"
                })}
            />
            <PixPlatePage />
        </>
    )
}
