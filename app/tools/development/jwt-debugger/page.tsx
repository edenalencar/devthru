import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { JwtDebuggerPage } from "./client"

const title = "JWT Debugger Online | Decodificar Tokens Grátis"
const description = "Decodifique, verifique e debugue seus JSON Web Tokens (JWT) instantaneamente. Visualize o Header, Payload e Signature de forma segura no navegador."

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
    },
    keywords: ["jwt debugger", "jwt decoder", "decodificar jwt", "json web token", "jwt.io alternative", "ferramentas de segurança"],
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
                            "name": title,
                            "operatingSystem": "Web",
                            "applicationCategory": "DeveloperApplication",
                            "description": description,
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            }
                        },
                        {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://devhubtools.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Ferramentas",
                                    "item": "https://devhubtools.com/tools"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "JWT Debugger",
                                    "item": "https://devhubtools.com/tools/development/jwt-debugger"
                                }
                            ]
                        }
                    ]
                }}
            />
            <JwtDebuggerPage />
        </>
    )
}
