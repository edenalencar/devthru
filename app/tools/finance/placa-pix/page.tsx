import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from 'next'
import { PixPlatePage } from './client'
import { generateToolMetadata } from "@/lib/seo-config"

const title = 'Gerador de Placa Pix de Balcão para Imprimir Grátis'
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
                data={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "SoftwareApplication",
                            "name": "Gerador de Placa Pix Online Grátis - DevThru",
                            "operatingSystem": "Web",
                            "applicationCategory": "FinancialApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Gere placas personalizadas do Pix prontas para impressão física ou download em alta qualidade (PDF e PNG) para o seu comércio."
                        },
                        {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://www.devthru.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Ferramentas",
                                    "item": "https://www.devthru.com/ferramentas"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Financeiro",
                                    "item": "https://www.devthru.com/tools/finance"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Placa Pix",
                                    "item": "https://www.devthru.com/tools/finance/placa-pix"
                                }
                            ]
                        }
                    ]
                }}
            />
            <PixPlatePage />
        </>
    )
}
