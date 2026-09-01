import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { PixPlatePage } from './client'
import { generateToolMetadata } from "@/lib/seo-config"

const title = "Gerador de Placa Pix de Balcão Personalizada - Grátis"
const description = "Crie placas de Pix para balcão de lojas e estabelecimentos com QR Code, sua chave, logotipo e redes sociais para impressão em PDF e imagem."

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
