import { JsonLd } from "@/components/seo/json-ld"
import { Metadata } from "next"
import { QRCodePage } from "./client"

const title = "Gerador de QR Code Online - Grátis e Personalizável"
const description = "Crie QR Codes gratuitos para links, textos, wifi e contatos. Baixe em alta resolução."

export const metadata: Metadata = {
    title,
    description,
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
                            "name": "Gerador de QR Code Online - Grátis e Personalizável",
                            "operatingSystem": "Web",
                            "applicationCategory": "UtilidadesApplication",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "BRL"
                            },
                            "description": "Crie QR Codes gratuitos para links, textos, wifi e contatos. Baixe em alta resolução."
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
                                    "item": "https://devhubtools.com/ferramentas"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": "Utilidades",
                                    "item": "https://devhubtools.com/tools/utilities"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": "QR Code",
                                    "item": "https://devhubtools.com/tools/utilities/qrcode"
                                }
                            ]
                        }
                    ]
                }}
            />
            <QRCodePage />
        </>
    )
}
