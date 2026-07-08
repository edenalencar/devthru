import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { EmailSignaturePage } from "./client"

const title = "Gerador de Assinatura de Email"
const description = "Crie assinaturas de email profissionais e personalizadas com nosso gerador gratuito. Compatível com Gmail, Outlook e outros. Adicione logo e links sociais."

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Assinatura de Email",
    description: "Crie assinaturas de email profissionais e personalizadas com nosso gerador gratuito. Compatível com Gmail, Outlook e outros. Adicione logo e links sociais.",
    path: "/tools/text/email-signature",
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
                            "name": "Gerador de Assinatura de Email Grátis Profissional Online",
                            "operatingSystem": "Web",
                            "applicationCategory": "TextoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Crie assinaturas de email profissionais e personalizadas com nosso gerador gratuito. Compatível com Gmail, Outlook e outros. Adicione logo e links sociais."
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
                                    "name": "Texto",
                                    "item": "https://www.devthru.com/tools/text"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Assinatura de Email",
                                    "item": "https://www.devthru.com/tools/text/email-signature"
                                }
                            ]
                        }
                    ]
                }}
            />
            <EmailSignaturePage />
        </>
    )
}
