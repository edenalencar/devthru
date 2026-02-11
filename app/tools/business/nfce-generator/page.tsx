import { Metadata } from "next"
import { JsonLd } from "@/components/seo/json-ld"
import { Graph } from "schema-dts"
import { NfceGeneratorPage } from "./client"
import { generateToolMetadata } from "@/lib/seo-config"

export const metadata: Metadata = generateToolMetadata({
    title: "Gerador de Chave NFC-e - Nota Fiscal de Consumidor",
    description: "Gere chaves de acesso de Nota Fiscal de Consumidor Eletrônica (NFC-e) válidas para testes.",
    path: "/tools/business/nfce-generator",
    keywords: ["gerador nfc-e", "chave nfc-e", "nfce teste", "consumidor eletronica", "dev tools"]
})

export default function Page() {
    const jsonLd: Graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "Gerador de Chave NFC-e",
                "description": "Gere chaves de acesso de Nota Fiscal de Consumidor Eletrônica (NFC-e) válidas para testes.",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web",
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
                        "item": "https://devhubtools.com/ferramentas"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Negócios",
                        "item": "https://devhubtools.com/ferramentas-fiscais"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "Gerador de NFC-e",
                        "item": "https://devhubtools.com/tools/business/nfce-generator"
                    }
                ]
            }
        ]
    }

    return (
        <>
            <JsonLd data={jsonLd} />
            <NfceGeneratorPage />
        </>
    )
}
