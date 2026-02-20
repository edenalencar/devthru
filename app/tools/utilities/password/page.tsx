import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { PasswordGeneratorPage } from "./client"

const title = "Gerador de Senhas Fortes e Seguras - Segurança Online"
const description = "Crie senhas fortes e invioláveis com nosso Gerador de Senhas gratuito. Personalize comprimento, símbolos e números para garantir a segurança máxima de suas contas."

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: `${siteConfig.url}/tools/utilities/password`,
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
                            "name": "Gerador de Senhas Fortes e Seguras - Segurança Online",
                            "operatingSystem": "Web",
                            "applicationCategory": "UtilidadesApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Crie senhas fortes e invioláveis com nosso Gerador de Senhas gratuito. Personalize comprimento, símbolos e números para garantir a segurança máxima de suas contas."
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
                                    "name": "Utilidades",
                                    "item": "https://www.devthru.com/tools/utilities"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "Gerador de Senha",
                                    "item": "https://www.devthru.com/tools/utilities/password"
                                }
                            ]
                        }
                    ]
                }}
            />
            <PasswordGeneratorPage />
        </>
    )
}
