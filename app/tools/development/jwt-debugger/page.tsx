import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/config/site"
import { Metadata } from 'next'
import { generateToolMetadata } from "@/lib/seo-config"

import { JwtDebuggerPage } from "./client"

const title = "JWT Debugger Online"
const description = "Debugue e decodifique seus tokens JWT instantaneamente no navegador. Inspecione o Header, Payload e Signature de forma privada e livre de servidores."

export const metadata: Metadata = generateToolMetadata({
    title,
    description,
    path: "/tools/development/jwt-debugger",
    keywords: ["jwt debugger", "jwt decoder", "decodificar jwt", "json web token", "jwt.io alternative", "ferramentas de segurança", "jwt online"]
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
                                    "item": "https://www.devthru.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Ferramentas",
                                    "item": "https://www.devthru.com/tools"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "JWT Debugger",
                                    "item": "https://www.devthru.com/tools/development/jwt-debugger"
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
