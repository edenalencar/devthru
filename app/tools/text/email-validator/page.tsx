import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { EmailValidatorPage } from "./client"

const title = "Validador de Email - Verificador de Email Completo"
const description = "Verifique se um endereço de email é válido, se o formato está correto e se é um email temporário ou descartável. Validação gratuita com verificação de sintaxe e domínio."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/text/email-validator`,
    },
    openGraph: {
        title,
        description,
    },
}

export default function Page() {
    return (
        <>

            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "SoftwareApplication",
                            "name": "Validador de Email - Verificador de Email Completo",
                            "operatingSystem": "Web",
                            "applicationCategory": "TextoApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Verifique se um endereço de email é válido, se o formato está correto e se é um email temporário."
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
                                    "name": "Validador de Email",
                                    "item": "https://www.devthru.com/tools/text/email-validator"
                                }
                            ]
                        }
                    ]
                }}
            />
            <EmailValidatorPage />
        </>
    )
}
