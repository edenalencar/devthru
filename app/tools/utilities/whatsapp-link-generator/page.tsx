import { getToolSchemaGraph } from "@/lib/seo/schema-helper"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"
import { WhatsappLinkGeneratorPage } from "./client"
import { JsonLd } from "@/components/seo/json-ld"

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Link do WhatsApp (wa.me) com Mensagem e QR Code",
    description: "Crie links diretos para o WhatsApp (wa.me) com mensagem personalizada e QR Code gratuito. Ideal para Instagram, vendas, sites e atendimento ao cliente.",
    path: "/tools/utilities/whatsapp-link-generator",
    keywords: ["gerador de link whatsapp", "criar link wa.me", "link whatsapp com mensagem", "gerar qr code whatsapp", "link direto whatsapp gratis", "converter telefone para link whatsapp"],
})

export default function Page() {
    return (
        <>
            <JsonLd
                data={getToolSchemaGraph({
                    name: "Gerador de Link do WhatsApp (wa.me) com Mensagem e QR Code",
                    description: "Crie links diretos para o WhatsApp (wa.me) com mensagem personalizada e QR Code gratuito. Ideal para Instagram, vendas, sites e atendimento ao cliente.",
                    categoryLabel: "Utilidades",
                    path: "/tools/utilities/whatsapp-link-generator",
                    toolSlug: "whatsapp-link-generator"
                })}
            />
            <WhatsappLinkGeneratorPage />
        </>
    )
}
